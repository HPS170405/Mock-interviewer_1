
// Import any required dependencies here
console.log("Loading interviewService.ts");

interface InterviewFormData {
  name: string;
  domain: string;
  experience: string;
  interviewTypes: string[];
}

interface Question {
  id: number;
  text: string;
  type: string;
}

/**
 * Generate interview questions based on form data
 */
export const generateInterviewQuestions = async (formData: InterviewFormData): Promise<Question[]> => {
  console.log("Generating interview questions for:", formData);
  
  // This is a mock implementation - in a real app, this would call an API
  // But for now we'll generate some sample questions
  
  const technicalQuestions: Question[] = [
    {
      id: 1,
      text: `Tell me about your experience with ${formData.domain} technologies.`,
      type: "Technical"
    },
    {
      id: 2,
      text: `What's your approach to debugging issues in ${formData.domain}?`,
      type: "Technical"
    },
    {
      id: 3,
      text: `Explain how you would architect a system for ${formData.domain}.`,
      type: "Technical"
    },
    {
      id: 4,
      text: `What are the latest trends in ${formData.domain} that you're excited about?`,
      type: "Technical"
    }
  ];
  
  const behavioralQuestions: Question[] = [
    {
      id: 5,
      text: "Tell me about a time you had to deal with a difficult teammate.",
      type: "Behavioral"
    },
    {
      id: 6,
      text: "Describe a situation where you had to meet a tight deadline.",
      type: "Behavioral"
    },
    {
      id: 7,
      text: "How do you prioritize tasks when you have multiple competing priorities?",
      type: "Behavioral"
    },
    {
      id: 8,
      text: "Tell me about a time you received difficult feedback and how you responded.",
      type: "Behavioral"
    }
  ];
  
  let questions: Question[] = [];
  
  // Select questions based on interview types
  if (formData.interviewTypes.includes("technical")) {
    questions = [...questions, ...technicalQuestions];
  }
  
  if (formData.interviewTypes.includes("behavioral")) {
    questions = [...questions, ...behavioralQuestions];
  }
  
  // If no specific types are selected, include all questions
  if (formData.interviewTypes.length === 0) {
    questions = [...technicalQuestions, ...behavioralQuestions];
  }
  
  console.log(`Generated ${questions.length} questions:`, questions);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return questions;
};

export default generateInterviewQuestions;
