
import { 
  MessageSquare, 
  Mic, 
  Video, 
  Activity,
  BookOpen,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-interviewer-blue" />,
      title: "AI-Powered Feedback",
      description: "Get instant, personalized feedback on your interview responses with our advanced AI analysis.",
      color: "bg-interviewer-blue/10"
    },
    {
      icon: <Mic className="h-10 w-10 text-purple-600" />,
      title: "Voice Analysis",
      description: "Improve your speaking clarity, pace, and confidence with real-time voice feedback.",
      color: "bg-purple-100"
    },
    {
      icon: <Video className="h-10 w-10 text-green-600" />,
      title: "Video Practice",
      description: "Perfect your body language and presentation with video recording and analysis.",
      color: "bg-green-100"
    },
    {
      icon: <Activity className="h-10 w-10 text-blue-600" />,
      title: "Progress Tracking",
      description: "Monitor your improvement over time with detailed performance analytics.",
      color: "bg-blue-100"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-orange-600" />,
      title: "Interview Question Bank",
      description: "Access a vast library of industry-specific interview questions and sample answers.",
      color: "bg-orange-100"
    },
    {
      icon: <Shield className="h-10 w-10 text-red-600" />,
      title: "Expert Resources",
      description: "Learn from curated interview tips and strategies from industry professionals.",
      color: "bg-red-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Ace Your Interviews
          </h1>
          <p className="text-lg text-gray-600">
            Our comprehensive platform combines AI-powered analysis with proven interview techniques 
            to help you prepare effectively and succeed in your interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className={`rounded-full ${feature.color} p-3 inline-flex mb-5`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Interview Skills?</h2>
          <button className="bg-interviewer-blue hover:bg-interviewer-blue-light text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
