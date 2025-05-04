
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InterviewForm } from "@/components/interview/InterviewForm";
import InterviewSession from "@/components/interview/InterviewSession";
import { generateInterviewQuestions } from "@/services/interviewService";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Question {
  id: number;
  text: string;
  type: string;
}

interface FormData {
  name: string;
  domain: string;
  experience: string;
  interviewTypes: string[];
}

const Practice = () => {
  const [activeTab, setActiveTab] = useState("setup");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("Current active tab:", activeTab);
    console.log("Questions state:", questions.length > 0 ? `${questions.length} questions loaded` : "No questions loaded");
    console.log("Session ID:", sessionId);
  }, [activeTab, questions, sessionId]);
  
  const handleFormSubmit = async (values: FormData) => {
    console.log("Form submitted with values:", values);
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to start an interview session.",
        variant: "destructive",
      });
      return;
    }
    
    setFormData(values);
    setIsLoading(true);
    console.log("Setting loading to true, starting interview setup");
    
    try {
      console.log("Creating interview session in database");
      // Create a new interview session in the database
      const { data: sessionData, error: sessionError } = await supabase
        .from('interview_sessions')
        .insert({
          user_id: user.id,
          domain: values.domain,
          experience_level: values.experience,
          interview_types: values.interviewTypes,
        })
        .select()
        .single();
        
      if (sessionError) {
        console.error("Session creation error:", sessionError);
        throw sessionError;
      }
      
      console.log("Session created:", sessionData);
      
      // Store the session ID for later use
      if (sessionData) {
        setSessionId(sessionData.id);
        console.log("Session ID set to:", sessionData.id);
      }
      
      // Generate interview questions
      console.log("Generating interview questions");
      const generatedQuestions = await generateInterviewQuestions(values);
      console.log("Questions generated:", generatedQuestions);
      setQuestions(generatedQuestions);
      
      console.log("Changing tab to practice");
      setActiveTab("practice");
    } catch (error) {
      console.error("Error setting up interview:", error);
      toast({
        title: "Error",
        description: "Failed to set up the interview session. Please try again.",
        variant: "destructive",
      });
    } finally {
      console.log("Setting loading to false");
      setIsLoading(false);
    }
  };
  
  const handleFinishInterview = () => {
    console.log("Interview finished, changing to results tab");
    setActiveTab("results");
  };
  
  const handleRestartPractice = () => {
    console.log("Restarting practice");
    setActiveTab("setup");
    setQuestions([]);
    setFormData(null);
    setSessionId(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Practice Interview</h1>
            <p className="text-gray-600">Select your interview type and preferences to get started.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2">
              <Card className="shadow-md border-gray-100">
                <CardContent className="pt-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-8">
                      <TabsTrigger value="setup" disabled={isLoading}>Setup</TabsTrigger>
                      <TabsTrigger value="practice" disabled={!questions.length || isLoading}>Practice</TabsTrigger>
                      <TabsTrigger value="results" disabled={activeTab !== "results"}>Results</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="setup" className="space-y-8">
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Interview Setup</h2>
                        <InterviewForm onSubmit={handleFormSubmit} />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="practice">
                      <p>Current questions count: {questions.length}</p>
                      {questions.length > 0 ? (
                        <InterviewSession
                          questions={questions}
                          onFinish={handleFinishInterview}
                          sessionId={sessionId || undefined}
                        />
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-600">No questions available. Please set up your interview first.</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="results">
                      <div className="space-y-6 text-center py-8">
                        <h2 className="text-2xl font-bold">Interview Complete!</h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                          Thank you for completing your {formData?.interviewTypes.join(" and ")} interview practice session.
                        </p>
                        
                        <div className="p-8 bg-green-50 rounded-lg max-w-md mx-auto">
                          <h3 className="text-lg font-semibold mb-2 text-green-800">Your Practice Summary</h3>
                          <ul className="text-left text-gray-700 space-y-2">
                            <li><strong>Name:</strong> {formData?.name}</li>
                            <li><strong>Domain:</strong> {formData?.domain}</li>
                            <li><strong>Experience Level:</strong> {formData?.experience}</li>
                            <li><strong>Interview Type:</strong> {formData?.interviewTypes.join(", ")}</li>
                            <li><strong>Questions Answered:</strong> {questions.length}</li>
                          </ul>
                        </div>
                        
                        <Button onClick={handleRestartPractice} className="mt-6">
                          Start Another Practice Interview
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="shadow-md border-gray-100 h-full">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Interview Tips</h2>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="flex-none text-interviewer-green">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Find a quiet, well-lit place for your interview practice.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-none text-interviewer-green">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">You have 30 seconds to start answering each question.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-none text-interviewer-green">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Take your time with responses - there's no time limit once recording starts.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-none text-interviewer-green">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Position your camera at eye level for better visual presence.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-none text-interviewer-green">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Your responses are saved automatically for later review.</p>
                    </li>
                  </ul>
                  
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">How It Works</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>1. Fill out the interview setup form</p>
                      <p>2. Grant camera and microphone access</p>
                      <p>3. Click "Start Recording" within 30 seconds of seeing each question</p>
                      <p>4. Answer the question naturally and click "Stop" when finished</p>
                      <p>5. Review your performance summary</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Practice;
