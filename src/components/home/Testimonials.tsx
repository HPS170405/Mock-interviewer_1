
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The detailed feedback on my voice tone and body language was eye-opening. I landed my dream job after just two weeks of using The Interviewer!",
      author: "Michael Chen",
      position: "Software Engineer",
      company: "Tech Innovators Inc."
    },
    {
      quote: "The progress tracking feature helped me identify patterns in my responses that needed improvement. The personalized question bank was exactly what I needed.",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "Creative Solutions"
    },
    {
      quote: "As someone with interview anxiety, this platform was a game-changer. The simulated pressure scenarios actually made real interviews feel easier!",
      author: "David Rodriguez",
      position: "Product Manager",
      company: "Future Products Co."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our platform has helped candidates land their dream jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm bg-white interviewer-card-hover">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="text-interviewer-purple mb-4">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15H7.5C6.12 15 5 16.12 5 17.5C5 18.88 6.12 20 7.5 20H10C11.1 20 12 20.9 12 22V25C12 26.1 11.1 27 10 27H5C3.9 27 3 26.1 3 25V17.5C3 13.91 5.91 11 9.5 11H12V15ZM27 15H22.5C21.12 15 20 16.12 20 17.5C20 18.88 21.12 20 22.5 20H25C26.1 20 27 20.9 27 22V25C27 26.1 26.1 27 25 27H20C18.9 27 18 26.1 18 25V17.5C18 13.91 20.91 11 24.5 11H27V15Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                </div>
                <div>
                  <p className="font-semibold text-interviewer-blue">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
