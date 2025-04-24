
import React from "react";
import { 
  MessageSquare, 
  Mic, 
  Video, 
  BarChart3, 
  BookOpen,
  Users
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-interviewer-blue" />,
      title: "Verbal Content Analysis",
      description: "Evaluate the relevance, structure, and clarity of your answers with AI-powered feedback.",
    },
    {
      icon: <Mic className="h-10 w-10 text-interviewer-blue" />,
      title: "Voice Analysis",
      description: "Assess your tone, emotion, clarity, and identify speech patterns that need improvement.",
    },
    {
      icon: <Video className="h-10 w-10 text-interviewer-blue" />,
      title: "Visual Cues Analysis",
      description: "Analyze facial expressions, eye contact, posture, and overall body language.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-interviewer-blue" />,
      title: "Progress Tracking",
      description: "Monitor your improvement over time and identify recurring issues to focus on.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-interviewer-blue" />,
      title: "Personalized Question Bank",
      description: "Access industry-specific questions that adapt to your performance level.",
    },
    {
      icon: <Users className="h-10 w-10 text-interviewer-blue" />,
      title: "Interview Simulations",
      description: "Practice with different interview formats and pressure scenarios to build confidence.",
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Interview Preparation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform analyzes multiple dimensions of your interview performance
            to provide actionable insights for improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="interviewer-card-hover border border-gray-100 shadow-sm">
              <CardContent className="pt-6">
                <div className="rounded-full bg-interviewer-blue/10 p-3 inline-flex mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
