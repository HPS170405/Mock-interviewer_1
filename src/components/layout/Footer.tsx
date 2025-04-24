
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-interviewer-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-interviewer-blue">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <span className="font-heading text-xl font-bold">
                The Interviewer
              </span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              AI-powered interview preparation platform that helps you ace your next interview.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-300 hover:text-interviewer-green transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-interviewer-green transition-colors">Pricing</Link></li>
              <li><Link to="/testimonials" className="text-gray-300 hover:text-interviewer-green transition-colors">Testimonials</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-interviewer-green transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-300 hover:text-interviewer-green transition-colors">Blog</Link></li>
              <li><Link to="/guides" className="text-gray-300 hover:text-interviewer-green transition-colors">Interview Guides</Link></li>
              <li><Link to="/tips" className="text-gray-300 hover:text-interviewer-green transition-colors">Interview Tips</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-interviewer-green transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-interviewer-green transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-interviewer-green transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-interviewer-green transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-interviewer-green transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} The Interviewer. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M19.944 2H4.056A2.056 2.056 0 002 4.056v15.888A2.056 2.056 0 004.056 22h15.888A2.056 2.056 0 0022 19.944V4.056A2.056 2.056 0 0019.944 2zM8 19H5v-9h3v9zm-1.5-10.24c-.96 0-1.74-.81-1.74-1.82s.78-1.82 1.74-1.82c.96 0 1.74.81 1.74 1.82s-.78 1.82-1.74 1.82zM19 19h-3v-4.77c0-1.14-.02-2.61-1.58-2.61-1.58 0-1.83 1.24-1.83 2.53V19h-3v-9h2.87v1.32h.04c.41-.78 1.4-1.6 2.88-1.6 3.08 0 3.64 2.03 3.64 4.66V19z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
