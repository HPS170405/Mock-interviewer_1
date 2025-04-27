
import { SignIn } from "@clerk/clerk-react";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-interviewer-blue">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue to The Interviewer
          </p>
        </div>
        
        <Card className="p-6 bg-white/80 backdrop-blur shadow-xl border-0">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-interviewer-blue hover:bg-interviewer-blue-light',
                card: 'shadow-none bg-transparent',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 'border-gray-300',
                socialButtonsBlockButtonText: 'text-gray-700',
                dividerLine: 'bg-gray-200',
                dividerText: 'text-gray-500',
                formFieldInput: 'border-gray-300 focus:border-interviewer-blue focus:ring-interviewer-blue',
                footer: 'hidden'
              }
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
