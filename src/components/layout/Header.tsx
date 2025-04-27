
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn } = useAuth();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-interviewer-blue text-white">
            <Users size={20} />
          </div>
          <span className="font-heading text-xl font-bold text-interviewer-blue">
            The Interviewer
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-interviewer-blue transition-colors">
            Home
          </Link>
          <Link to="/practice" className="text-gray-700 hover:text-interviewer-blue transition-colors">
            Practice
          </Link>
          <Link to="/question-bank" className="text-gray-700 hover:text-interviewer-blue transition-colors">
            Question Bank
          </Link>
          <Link to="/progress" className="text-gray-700 hover:text-interviewer-blue transition-colors">
            Progress
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {!isSignedIn ? (
            <>
              <SignInButton>
                <Button variant="outline" className="hidden sm:flex">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-interviewer-blue hover:bg-interviewer-blue-light">
                  Get Started
                </Button>
              </SignUpButton>
            </>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
