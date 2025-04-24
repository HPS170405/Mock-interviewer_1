
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const QuestionBank = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Question Bank</h1>
            <p className="text-gray-600">Browse and search through our comprehensive collection of interview questions.</p>
          </div>

          <div className="relative mb-8">
            <Input
              type="search"
              placeholder="Search questions..."
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>

          <div className="grid gap-6">
            {/* Behavioral Questions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Behavioral Questions</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Tell me about a time when you had to deal with a difficult team member.</h3>
                    <p className="text-gray-600 text-sm mb-3">Category: Team Collaboration</p>
                    <Button variant="outline" size="sm">View Sample Answers</Button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Describe a situation where you had to meet a tight deadline.</h3>
                    <p className="text-gray-600 text-sm mb-3">Category: Time Management</p>
                    <Button variant="outline" size="sm">View Sample Answers</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Questions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Technical Questions</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">What is the difference between let, const, and var in JavaScript?</h3>
                    <p className="text-gray-600 text-sm mb-3">Category: JavaScript Fundamentals</p>
                    <Button variant="outline" size="sm">View Sample Answers</Button>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Explain the concept of REST APIs.</h3>
                    <p className="text-gray-600 text-sm mb-3">Category: Web Development</p>
                    <Button variant="outline" size="sm">View Sample Answers</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuestionBank;
