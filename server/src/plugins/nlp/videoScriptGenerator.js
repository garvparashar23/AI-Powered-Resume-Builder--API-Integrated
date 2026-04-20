/**
 * Video Script & Cover Letter Generator Plugin
 * Generates an engaging 60-second video pitch or a written cover letter based on resume data.
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

const generateVideoScript = async (resumeData, tone = 'confident') => {
  if (!openai) {
    logger.warn('Mocking Video Script (missing API key)');
    return "Hi, my name is [Name]. I am an experienced professional specializing in building high-quality platforms. With a background in modern frameworks and an ATS-optimized skill set, I believe I can bring immediate value to your engineering team. Thank you for viewing my profile!";
  }

  try {
    const dataString = JSON.stringify({
       summary: resumeData.summary,
       skills: resumeData.skills,
       experience: resumeData.experience,
    });

    const prompt = `You are an expert career coach helping a candidate write a 60-second video pitch script. 
    Use the following resume data to write a highly engaging, natural-sounding script the user can read off a teleprompter.
    The tone should be ${tone}. Keep it under 150 words. Do NOT include camera instructions, just the spoken text.
    Data: ${dataString}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are an expert career coach." }, { role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    logger.error('Video Script Gen Error:', error);
    throw new Error('Failed to generate video script');
  }
};

module.exports = { generateVideoScript };
