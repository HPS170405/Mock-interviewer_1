
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Practice = () => {
  const [interviewType, setInterviewType] = useState("");
  const [industry, setIndustry] = useState("");
  
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
                  <Tabs defaultValue="setup">
                    <TabsList className="grid grid-cols-3 mb-8">
                      <TabsTrigger value="setup">Setup</TabsTrigger>
                      <TabsTrigger value="practice" disabled>Practice</TabsTrigger>
                      <TabsTrigger value="results" disabled>Results</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="setup" className="space-y-8">
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Select Interview Type</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Card className="border-2 border-interviewer-blue cursor-pointer hover:bg-gray-50 transition-colors">
                            <CardContent className="p-4 text-center">
                              <div className="mb-3 text-interviewer-blue">
                                <svg className="mx-auto" width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <h3 className="font-medium">Behavioral</h3>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-2 border-transparent hover:border-interviewer-blue cursor-pointer hover:bg-gray-50 transition-colors">
                            <CardContent className="p-4 text-center">
                              <div className="mb-3 text-gray-500">
                                <svg className="mx-auto" width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                              </div>
                              <h3 className="font-medium">Technical</h3>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-2 border-transparent hover:border-interviewer-blue cursor-pointer hover:bg-gray-50 transition-colors">
                            <CardContent className="p-4 text-center">
                              <div className="mb-3 text-gray-500">
                                <svg className="mx-auto" width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                              </div>
                              <h3 className="font-medium">Panel</h3>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Industry & Role Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Select Industry</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Industries</SelectLabel>
                                  <SelectItem value="tech">Technology</SelectItem>
                                  <SelectItem value="finance">Finance</SelectItem>
                                  <SelectItem value="healthcare">Healthcare</SelectItem>
                                  <SelectItem value="marketing">Marketing</SelectItem>
                                  <SelectItem value="education">Education</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Position Level</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Experience Level</SelectLabel>
                                  <SelectItem value="entry">Entry Level</SelectItem>
                                  <SelectItem value="mid">Mid-Level</SelectItem>
                                  <SelectItem value="senior">Senior Level</SelectItem>
                                  <SelectItem value="management">Management</SelectItem>
                                  <SelectItem value="executive">Executive</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium mb-2">Specific Role (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Software Engineer, Marketing Manager" 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-interviewer-blue focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Interview Settings</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Number of Questions</label>
                            <Select defaultValue="5">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">3 Questions</SelectItem>
                                <SelectItem value="5">5 Questions</SelectItem>
                                <SelectItem value="10">10 Questions</SelectItem>
                                <SelectItem value="15">15 Questions</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                            <Select defaultValue="medium">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                                <SelectItem value="mixed">Mixed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Analysis Focus</label>
                            <Select defaultValue="all">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Dimensions</SelectItem>
                                <SelectItem value="verbal">Verbal Content</SelectItem>
                                <SelectItem value="voice">Voice Analysis</SelectItem>
                                <SelectItem value="visual">Visual Cues</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button className="bg-interviewer-blue hover:bg-interviewer-blue-light">
                          Start Interview
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
                    <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Premium Feature</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Unlock expert review of your interview performance from industry professionals.
                    </p>
                    <Button variant="outline" className="w-full border-interviewer-purple text-interviewer-purple hover:bg-interviewer-purple hover:text-white">
                      Upgrade to Premium
                    </Button>
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
