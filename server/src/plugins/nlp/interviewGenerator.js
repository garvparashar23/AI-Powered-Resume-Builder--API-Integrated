/**
 * Interview Prep Generator Plugin
 * Reads a user's resume data and a target job role, and generates tailored technical and behavioral interview questions based on their profile.
 */
const OpenAI = require('openai');
const logger = require('../../utils/logger');

let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1'
  });
}

const generateInterviewQuestions = async (resumeData, targetRole) => {
  if (!openai) {
    logger.warn('Mocking Interview Prep (missing API key)');
    return [
      { type: 'Behavioral', question: 'Can you tell me about a time you had to adapt to a major change in a project?', advice: 'Focus on highlighting your problem-solving skills and adaptability from your recent experience.' },
      { type: 'Technical', question: `How would you optimize performance for a standard ${targetRole || 'engineering'} application?`, advice: 'Mention caching, lazy loading, or load balancing depending on your stack mentioned in the resume.' },
      { type: 'Resume Specific', question: 'I see you mentioned scaling systems in your previous role. Can you elaborate on the metrics you improved?', advice: 'Use the STAR method (Situation, Task, Action, Result) to frame your response.' }
    ];
  }

  try {
    const dataString = JSON.stringify({
       skills: resumeData.skills,
       experience: resumeData.experience,
    });

    const prompt = `You are a Senior Technical Recruiter and Hiring Manager. The candidate is applying for the role of "${targetRole || 'Software Engineer'}".
    Here is a summary of their resume skills and past experience:
    ${dataString}
    
    Generate exactly 3 extremely tailored interview questions for them.
    Format your response STRICTLY as a JSON array of objects with the keys: 
    - "type" (String: e.g., 'Behavioral', 'Technical', 'Resume Specific')
    - "question" (String: The actual interview question)
    - "advice" (String: Expert advice on how the candidate should answer based on their resume data)
    
    Do NOT return markdown, only the pure JSON array.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are an expert interviewer." }, { role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.8,
    });

    try {
        const parsedData = JSON.parse(completion.choices[0].message.content.trim());
        return parsedData;
    } catch(err) {
        // Fallback parsing if GPT returns light markdown
        const cleanedText = completion.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);
    }
  } catch (error) {
    logger.error('Interview Prep Gen Error:', error);
    throw new Error('Failed to generate interview questions');
  }
};

module.exports = { generateInterviewQuestions };
