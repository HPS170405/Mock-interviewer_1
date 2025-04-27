
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { UserButton, useAuth } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

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
              <Button 
                variant="outline" 
                className="hidden sm:flex"
                onClick={() => navigate('/sign-in')}
              >
                Sign In
              </Button>
              <Button 
                className="bg-interviewer-blue hover:bg-interviewer-blue-light"
                onClick={() => navigate('/get-started')}
              >
                Get Started
              </Button>
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
