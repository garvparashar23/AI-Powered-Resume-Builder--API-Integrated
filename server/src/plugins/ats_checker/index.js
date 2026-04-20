// src/plugins/ats_checker/index.js
const { OpenAI } = require('openai');

/**
 * ats_checker Plugin
 * Evaluates resume against a job description.
 */
class AtsCheckerPlugin {
  constructor() {
    this.name = 'AtsChecker';
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({ 
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1' 
    }) : null;
  }

  async evaluate(resumeData, jobDescription) {
    if (!jobDescription) {
      return { score: 0, missingKeywords: [], message: 'No job description provided.' };
    }

    if (!this.openai) {
      // Mock Fallback
      return { score: 62, missingKeywords: ['Kubernetes', 'REST APIs', 'CloudFormation'], matchCount: 5, totalKeywordsExplored: 8 };
    }

    const systemPrompt = `You are an expert Applicant Tracking System (ATS). Analyze the provided resume against the job description. Output your response STRICTLY as a JSON object with the following structure: { "score": number (0-100), "missingKeywords": ["keyword1", "keyword2"], "matchCount": number, "totalKeywordsExplored": number }`;
    
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Job: ${jobDescription}\n\nResume: ${JSON.stringify(resumeData)}` }
        ],
        model: 'llama-3.1-8b-instant',
        response_format: { type: "json_object" }
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('OpenAI ATS Checker Error:', error);
      throw new Error(error.message || 'Failed to evaluate ATS Score.');
    }
  }
}

module.exports = new AtsCheckerPlugin();
