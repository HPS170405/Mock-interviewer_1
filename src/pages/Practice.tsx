
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InterviewForm } from "@/components/interview/InterviewForm";
import InterviewSession from "@/components/interview/InterviewSession";
import { generateInterviewQuestions } from "@/services/interviewService";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
  const handleFormSubmit = async (values: FormData) => {
    setFormData(values);
    setIsLoading(true);
    
    try {
      const generatedQuestions = await generateInterviewQuestions(values);
      setQuestions(generatedQuestions);
      setActiveTab("practice");
    } catch (error) {
      console.error("Error generating interview questions:", error);
      toast({
        title: "Error",
        description: "Failed to generate interview questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFinishInterview = () => {
    setActiveTab("results");
  };
  
  const handleRestartPractice = () => {
    setActiveTab("setup");
    setQuestions([]);
    setFormData(null);
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
                      {questions.length > 0 && (
                        <InterviewSession
                          questions={questions}
                          onFinish={handleFinishInterview}
                        />
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
                      <p className="text-sm text-gray-600">Position your camera at eye level for better visual analysis.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-none text-interviewer-green">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Speak clearly and at a moderate pace for optimal voice analysis.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-none text-interviewer-green">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Dress professionally to help you get in the right mindset.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-none text-interviewer-green">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Take time to review your feedback between practice sessions.</p>
                    </li>
                  </ul>
                  
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">How It Works</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>1. Fill out the interview setup form</p>
                      <p>2. Grant camera and microphone access</p>
                      <p>3. Answer interview questions</p>
                      <p>4. Review your performance</p>
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
