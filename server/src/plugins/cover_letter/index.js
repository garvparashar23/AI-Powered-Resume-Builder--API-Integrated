// src/plugins/cover_letter/index.js
const { OpenAI } = require('openai');

class CoverLetterGenerator {
  constructor() {
    this.name = 'CoverLetterGenerator';
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({ 
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1'
    }) : null;
  }

  async generate(resumeData, jobDescription, tone = 'professional') {
    const role = resumeData.jobTitle || 'Professional';
    const company = jobDescription ? 'your company' : 'this organization';

    if (!this.openai) {
      return `Dear Hiring Manager,\n\nBased on my experience as a ${role}, I am thrilled to apply for the position at ${company}. My background aligns perfectly with the requirements...\n\nSincerely,\n${resumeData.name}`;
    }

    const systemPrompt = `You are a professional cover letter writer. Write a concise, 3-paragraph compelling cover letter for a candidate named ${resumeData.name} applying for the role of ${role}. Address how their skills overlap with the job description. Keep the tone ${tone}.`;
    
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Job Description: ${jobDescription}\nCandidate Skills: ${resumeData.skills?.join(', ')}\nExperience Summary: ${resumeData.summary}` }
        ],
        model: 'llama-3.1-8b-instant',
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('OpenAI Cover Letter Error:', error);
      throw new Error('Failed to generate cover letter.');
    }
  }
}

module.exports = new CoverLetterGenerator();
