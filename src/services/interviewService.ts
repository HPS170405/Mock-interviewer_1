
interface InterviewFormData {
  name: string;
  domain: string;
  experience: string;
  interviewTypes: string[];
}

interface Question {
  id: number;
  text: string;
  type: string; // technical or behavioral
}

const API_KEY = "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";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function generateInterviewQuestions(formData: InterviewFormData): Promise<Question[]> {
  try {
    const interviewTypeText = formData.interviewTypes.join(" and ");
    const prompt = `Generate 5 realistic ${interviewTypeText} interview questions for a ${formData.experience} level ${formData.domain} position. Format as a JSON array with questions having 'id', 'text', and 'type' fields. Make the questions challenging but appropriate for the experience level.`;
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are an AI interviewer specialized in creating realistic interview questions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      try {
        const content = data.choices[0].message.content;
        // Extract JSON from the response - it might be wrapped in markdown code blocks
        const jsonMatch = content.match(/```json([\s\S]*?)```/) || content.match(/```([\s\S]*?)```/) || [null, content];
        const jsonString = jsonMatch[1] ? jsonMatch[1].trim() : content;
        const questions = JSON.parse(jsonString);
        
        return Array.isArray(questions) ? questions : [];
      } catch (parseError) {
        console.error("Failed to parse LLM response:", parseError);
        return [];
      }
    }
    
    return [];
  } catch (error) {
    console.error("Error generating interview questions:", error);
    throw error;
  }
}
