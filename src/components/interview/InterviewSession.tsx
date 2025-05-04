
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WebcamView from './WebcamView';
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: number;
  text: string;
  type: string;
}

interface InterviewSessionProps {
  questions: Question[];
  onFinish: () => void;
}

const InterviewSession: React.FC<InterviewSessionProps> = ({ questions, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  useEffect(() => {
    // Announce the first question using speech synthesis if available
    if ('speechSynthesis' in window && questions.length > 0) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion?.text);
      speechSynthesis.speak(utterance);
    }
  }, []);

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleFinishInterview();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
      // Speak the next question
      if ('speechSynthesis' in window) {
        const nextQuestion = questions[currentQuestionIndex + 1];
        if (nextQuestion) {
          const utterance = new SpeechSynthesisUtterance(nextQuestion.text);
          speechSynthesis.speak(utterance);
        }
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // Speak the previous question
      if ('speechSynthesis' in window) {
        const prevQuestion = questions[currentQuestionIndex - 1];
        const utterance = new SpeechSynthesisUtterance(prevQuestion.text);
        speechSynthesis.speak(utterance);
      }
    }
  };

  const handleFinishInterview = () => {
    setIsLoading(true);
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

  const handleRecordingData = (data: Blob) => {
    // In a real application, you might want to upload this data to a server
    console.log("Recording data received:", data);
    
    // Create a URL for the recording
    const url = URL.createObjectURL(data);
    console.log("Recording URL:", url);
    
    // You could save this URL or trigger download
  };

  return (
    <div className="space-y-6">
      <WebcamView onRecordingData={handleRecordingData} />
      
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
          <p className="text-lg">{currentQuestion?.text}</p>
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button 
              onClick={handleNextQuestion}
              disabled={isLoading}
            >
              {isLastQuestion ? 'Finish Interview' : 'Next Question'}
              {!isLastQuestion && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewSession;
