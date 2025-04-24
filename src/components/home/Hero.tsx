
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="interviewer-gradient-bg py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Perfect Your Interview <br />
              <span className="text-interviewer-green">With AI-Powered Feedback</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 max-w-lg">
              Transform your interview skills with comprehensive analysis of your verbal content, 
              voice tone, and body language.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="bg-interviewer-green hover:bg-opacity-90 text-interviewer-blue font-medium">
                Start Practice Interview 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-interviewer-blue">
                View Demo
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-interviewer-purple rounded-full opacity-20"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-interviewer-green rounded-full opacity-20"></div>
              
              <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20 shadow-xl relative z-10">
                <div className="aspect-video rounded-lg bg-black/20 mb-4 overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-2 text-interviewer-green">
                        <svg className="mx-auto w-10 h-10 animate-pulse-subtle" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm">Start your mock interview</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Comprehensive Analysis</h3>
                    <p className="text-xs text-gray-300">Verbal, Voice & Visual Feedback</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-interviewer-green/20 text-interviewer-green">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-interviewer-purple/20 text-interviewer-purple">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
