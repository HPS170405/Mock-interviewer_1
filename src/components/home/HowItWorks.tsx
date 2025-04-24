
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Select Interview Type",
      description: "Choose from technical, behavioral, or industry-specific interviews.",
      color: "bg-interviewer-blue"
    },
    {
      number: "02",
      title: "Practice Interview",
      description: "Record your responses to AI-generated interview questions.",
      color: "bg-interviewer-purple"
    },
    {
      number: "03",
      title: "Receive Analysis",
      description: "Get detailed feedback on verbal content, voice tone, and body language.",
      color: "bg-interviewer-green"
    },
    {
      number: "04",
      title: "Track Improvements",
      description: "Monitor your progress over time and focus on areas that need work.",
      color: "bg-interviewer-blue"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How The Interviewer Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our simple four-step process helps you improve your interview skills systematically
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-md interviewer-card-hover">
              <CardContent className="pt-6">
                <div className={`${step.color} text-white text-xl font-bold rounded-full h-12 w-12 flex items-center justify-center mb-4`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="p-8 rounded-lg bg-white shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Ready to improve your interview skills?</h3>
            <p className="text-gray-600 mb-6">Start practicing now and see immediate improvements in your interview performance.</p>
            <button className="bg-interviewer-blue hover:bg-interviewer-blue-light text-white font-medium py-3 px-8 rounded-lg transition-colors">
              Start Free Practice
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
