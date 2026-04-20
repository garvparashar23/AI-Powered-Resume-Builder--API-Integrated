// src/controllers/intelligenceController.js
const Resume = require('../models/Resume');
const pluginSystem = require('../plugins/index');
const entityExtractor = require('../plugins/nlp/entityExtractor');
const biasChecker = require('../plugins/nlp/biasChecker');
const { OpenAI } = require('openai');

// Groq integration
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1'
}) : null;

// @desc    Run full intelligence suite on a resume
const analyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    const { jobDescription } = req.body;
    const stringifiedResume = JSON.stringify(resume);
    const nlpData = await entityExtractor.extract(stringifiedResume);
    const biasCheck = await biasChecker.evaluate(stringifiedResume);
    const atsCheck = await pluginSystem.runAtsCheck(resume, jobDescription || '');

    resume.intelligenceContext.semanticProfile = nlpData.semanticProfile;
    resume.intelligenceContext.biasCheckResults = { hasBias: biasCheck.hasBias, details: biasCheck.details };
    resume.intelligenceContext.skillGaps = atsCheck.missingKeywords;
    if (jobDescription) {
      resume.analytics.lastAtsCheckJobDescription = jobDescription;
      resume.analytics.atsScore = atsCheck.score;
    }
    await resume.save();

    res.json({ message: 'Analysis complete', nlpData, biasCheck, atsCheck, xaiLogs: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAtsScore = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;
    const atsResult = await pluginSystem.runAtsCheck(resume, jobDescription);
    const biasResult = await biasChecker.evaluate(JSON.stringify(resume));
    
    res.json({
      score: atsResult.score || 0,
      structuralScore: 85, // Mocked structural format out of 100
      atsPluginScore: atsResult.score || 0,
      missingKeywords: atsResult.missingKeywords || [],
      biasReport: {
        isBiased: biasResult.hasBias,
        mCount: biasResult.details?.length || 0,
        fCount: 0,
        suggestions: biasResult.details || []
      },
      weakSections: []
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVideoScript = async (req, res) => {
  try {
    const { resume, tone } = req.body;
    const systemPrompt = `Create a 60-second video elevator pitch for ${resume.name}. Target Tone: ${tone}. Focus on their main skills: ${resume.skills?.join(', ')}.`;
    
    if (!openai) {
       return res.json({ script: `[Mock Output - API Key Missing]\n\nHi my name is ${resume.name}. I am skilled in ${resume.skills?.join(', ')}...` });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: systemPrompt }],
      model: 'llama-3.1-8b-instant',
    });
    res.json({ script: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInterviewPrep = async (req, res) => {
  try {
    const { resume, targetRole } = req.body;
    const systemPrompt = `You are a strict technical recruiter. Look at this candidate's skills: ${resume.skills?.join(', ')}. They are applying for ${targetRole}. Provide exactly 3 rigorous interview questions and expert advice for each. Format STRICTLY as JSON: { "questions": [ { "type": "Behavioral" | "Technical", "question": "...", "advice": "..." } ] }`;

    if (!openai) {
      return res.json({ questions: [
         { type: 'Technical', question: 'How do you structure your projects?', advice: 'Mention the tools you listed' },
         { type: 'Behavioral', question: 'Describe a difficult bug.', advice: 'Use STAR method.' }
      ]});
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: systemPrompt }],
      model: 'llama-3.1-8b-instant',
      response_format: { type: "json_object" }
    });
    res.json(JSON.parse(completion.choices[0].message.content));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const enhanceProjectDescription = async (req, res) => {
  try {
    const { title, synopsis } = req.body;
    if (!synopsis) {
       return res.status(400).json({ message: "Please provide a rough description/synopsis first." });
    }
    const systemPrompt = `You are an expert resume writer. The user has a project named "${title || 'Software Project'}". They provided the following rough synopsis/details: "${synopsis}".
Rewrite this into the following professional structure (do not use markdown asterisks or bold text, just standard text):

Project Name: ${title || 'Software Project'}

Synopsis: 
[Write a short, concise, professional summary of the project based on the user's details]

Key Highlights:
• [Bullet point highlighting impact, technologies, and key achievements]
• [Bullet point highlighting impact, technologies, and key achievements]
• [Optional 3rd bullet point]

Start the response immediately with "Project Name:" without any introductory conversation.`;
    
    if (!openai) {
       return res.json({ enhanced: `Project Name: ${title || 'the project'}\n\nSynopsis:\nDeveloped the project using modern frameworks to solve a specific problem.\n\nKey Highlights:\n• Optimized rendering speed and architecture.\n• Improved user experience significantly.` });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: systemPrompt }],
      model: 'llama-3.1-8b-instant',
    });
    res.json({ enhanced: completion.choices[0].message.content.trim() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { analyzeResume, getAtsScore, getVideoScript, getInterviewPrep, enhanceProjectDescription };
