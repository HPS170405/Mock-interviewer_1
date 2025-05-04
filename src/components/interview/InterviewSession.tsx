
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WebcamView from './WebcamView';
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Timer, Mic } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/hooks/useAuth';

interface Question {
  id: number;
  text: string;
  type: string;
}

interface InterviewSessionProps {
  questions: Question[];
  onFinish: () => void;
  sessionId?: string;
}

const InterviewSession: React.FC<InterviewSessionProps> = ({ questions, onFinish, sessionId }) => {
  console.log("InterviewSession component rendering with questions:", questions);
  console.log("Session ID:", sessionId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingStartTime, setRecordingStartTime] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  useEffect(() => {
    console.log("Current question:", currentQuestion);
    // Reset timer and state when question changes
    setTimer(30);
    setIsTimerActive(true);
    setIsRecording(false);
    setRecordingDuration(0);
    
    // Announce the current question using speech synthesis if available
    if ('speechSynthesis' in window && currentQuestion) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.text);
      speechSynthesis.speak(utterance);
    }
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    // Timer countdown logic
    let interval: ReturnType<typeof setInterval>;
    
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      console.log("Timer tick:", timer);
    } else if (timer === 0 && isTimerActive) {
      console.log("Timer reached zero");
      // Time's up - mark question as skipped if not recording
      if (!isRecording) {
        console.log("Not recording, skipping question");
        handleSkipQuestion();
      }
    }
    
    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  useEffect(() => {
    // Track recording duration
    let interval: ReturnType<typeof setInterval>;
    
    if (isRecording) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - recordingStartTime) / 1000);
        setRecordingDuration(elapsed);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRecording, recordingStartTime]);

  const handleNextQuestion = () => {
    console.log("Next question button clicked");
    if (isLastQuestion) {
      handleFinishInterview();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    console.log("Previous question button clicked");
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishInterview = () => {
    console.log("Finishing interview");
    setIsLoading(true);
    
    // Update the interview session as completed
    if (sessionId && user) {
      supabase
        .from('interview_sessions')
        .update({ completed: true, updated_at: new Date().toISOString() })
        .eq('id', sessionId)
        .then(({ error }) => {
          if (error) {
            console.error("Error updating interview session:", error);
          }
        });
    }
    
    toast({
      title: "Interview completed",
      description: "Thank you for completing your interview session.",
    });
    
    // Stop all speech
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    
    setTimeout(() => {
      setIsLoading(false);
      onFinish();
    }, 1000);
  };

  const handleStartRecording = () => {
    console.log("Start recording button clicked");
    setIsTimerActive(false);
    setIsRecording(true);
    setRecordingStartTime(Date.now());
  };

  const handleStopRecording = async (data: Blob) => {
    console.log("Stop recording called with data:", data ? "Blob received" : "No data");
    setIsRecording(false);
    
    if (!user || !sessionId) {
      toast({
        title: "Authentication required",
        description: "You need to be signed in to save recordings.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Calculate final duration
      const finalDuration = Math.floor((Date.now() - recordingStartTime) / 1000);
      
      // Create file name with timestamp to avoid conflicts
      const timestamp = new Date().getTime();
      const filePath = `${user.id}/${sessionId}/${currentQuestion.id}_${timestamp}.webm`;
      
      console.log("Uploading recording to path:", filePath);
      // Upload recording to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('interview_recordings')
        .upload(filePath, data, {
          contentType: 'video/webm',
        });
        
      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }
      
      console.log("Upload successful:", uploadData);
      
      // Store response metadata in database
      const { error: insertError } = await supabase
        .from('interview_responses')
        .insert({
          user_id: user.id,
          question_id: currentQuestion.id,
          question_text: currentQuestion.text,
          recording_path: filePath,
          duration_seconds: finalDuration,
          interview_session_id: sessionId,
          skipped: false
        });
        
      if (insertError) {
        console.error("Insert error:", insertError);
        throw insertError;
      }
      
      console.log("Response metadata saved successfully");
      
      toast({
        title: "Response recorded",
        description: "Your answer has been saved successfully."
      });
      
      // Move to next question after a short delay
      setTimeout(() => {
        if (isLastQuestion) {
          handleFinishInterview();
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
        }
      }, 1500);
      
    } catch (error) {
      console.error("Error saving recording:", error);
      toast({
        title: "Error saving recording",
        description: "There was an error saving your response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSkipQuestion = async () => {
    console.log("Skipping question");
    // Mark the question as skipped in the database
    if (user && sessionId) {
      try {
        const { error } = await supabase
          .from('interview_responses')
          .insert({
            user_id: user.id,
            question_id: currentQuestion.id,
            question_text: currentQuestion.text,
            interview_session_id: sessionId,
            skipped: true
          });
          
        if (error) {
          console.error("Error marking question as skipped:", error);
          throw error;
        }
        
        toast({
          title: "Question skipped",
          description: "Moving to the next question.",
        });
        
      } catch (error) {
        console.error("Error marking question as skipped:", error);
      }
    }
    
    // Move to the next question
    if (isLastQuestion) {
      handleFinishInterview();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6">
      <WebcamView 
        onRecordingData={handleStopRecording} 
        isRecording={isRecording} 
      />
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span className="text-sm font-normal px-2 py-1 bg-gray-100 rounded">
              {currentQuestion?.type}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">{currentQuestion?.text}</p>
          
          <div className="flex flex-col space-y-6">
            {isTimerActive && (
              <div className="flex items-center justify-center">
                <div className={`text-center p-4 rounded-full border-2 ${timer <= 10 ? 'border-red-500 text-red-500' : 'border-blue-500 text-blue-500'}`}>
                  <Timer className="mx-auto mb-1" />
                  <div className="text-xl font-semibold">{timer}</div>
                  <div className="text-xs">seconds left</div>
                </div>
              </div>
            )}
            
            {isRecording && (
              <div className="flex items-center justify-center">
                <div className="text-center p-4 rounded-full border-2 border-green-500 text-green-500">
                  <Mic className="mx-auto mb-1 animate-pulse" />
                  <div className="text-xl font-semibold">{formatTime(recordingDuration)}</div>
                  <div className="text-xs">recording</div>
                </div>
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              {!isRecording && (
                <Button 
                  onClick={handleStartRecording}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Start Recording
                </Button>
              )}
              
              {!isRecording && (
                <Button 
                  variant="outline" 
                  onClick={handleSkipQuestion}
                >
                  Skip Question
                </Button>
              )}
            </div>
            
            <div className="flex justify-between mt-6 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0 || isRecording}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button 
                onClick={handleNextQuestion}
                disabled={isRecording || isLoading}
              >
                {isLastQuestion ? 'Finish Interview' : 'Next Question'}
                {!isLastQuestion && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewSession;
