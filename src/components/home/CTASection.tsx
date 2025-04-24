
import React from "react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 interviewer-gradient-bg text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Interview Skills?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of job seekers who have improved their interview performance and landed their dream jobs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-interviewer-green hover:bg-opacity-90 text-interviewer-blue font-medium">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-interviewer-blue">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
