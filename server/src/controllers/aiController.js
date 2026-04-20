// Implementation of AI integration using OpenAI and Custom Plugins
const OpenAI = require('openai');
const { getTonePrompt, buildEnhancedPrompt } = require('../plugins/nlp/toneOptimizer');
const { calculateATSScore } = require('../plugins/ats/atsChecker');
const { analyzeBias } = require('../plugins/nlp/biasChecker');
const { simulateRecruiterAttention } = require('../plugins/nlp/recruiterSimulation');
const { analyzeGithubProfile } = require('../plugins/integrations/githubAnalyzer');
const { simulateMarketIntel } = require('../plugins/data/marketIntel');
const { generateVideoScript } = require('../plugins/nlp/videoScriptGenerator');
const { generateInterviewQuestions } = require('../plugins/nlp/interviewGenerator');
const logger = require('../utils/logger');

// Initialize OpenAI conditionally
let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1'
  });
}

const generateSummary = async (req, res) => {
  try {
    const { role, skills, experience, education, tone = 'modern' } = req.body;
    
    if (!openai) {
      logger.warn('OpenAI API Key missing, returning mock summary.');
      let mockResponse = `As a highly motivated and skilled ${role || 'professional'}, I possess a strong background in software development and project management. Experienced in building scalable applications and finding innovative solutions to complex problems. (Mocking Tone: ${tone})`;
      await new Promise(resolve => setTimeout(resolve, 1500));
      return res.json({ summary: mockResponse });
    }

    const backgroundDetails = { skills, experience, education };
    const basePrompt = `Generate a professional summary for a ${role} with the following background details: ${JSON.stringify(backgroundDetails)}. Keep it under 4 sentences.`;
    const finalPrompt = buildEnhancedPrompt(basePrompt, tone);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are an expert tech recruiter and resume writer." }, { role: "user", content: finalPrompt }],
      model: "llama-3.1-8b-instant",
    });

    res.json({ summary: completion.choices[0].message.content });
  } catch (error) {
    logger.error('Error generating summary:', error);
    res.status(500).json({ message: 'Error generating summary' });
  }
};

const checkAtsScore = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;
    if (!resume) {
      return res.status(400).json({ message: 'Resume data is required' });
    }

    const weakSections = [];
    let structuralScore = 0;

    // Analyze Personal Info (10 pts)
    if (resume.personalInfo) {
      let piScore = 0;
      if (resume.personalInfo.fullName) piScore += 3;
      if (resume.personalInfo.email) piScore += 3;
      if (resume.personalInfo.phone) piScore += 2;
      if (resume.personalInfo.linkedIn || resume.personalInfo.github) piScore += 2;
      structuralScore += piScore;
      if (piScore < 10) weakSections.push("Personal Information is incomplete (missing phone or links).");
    } else {
      weakSections.push("Personal Information is completely missing.");
    }

    // Analyze Summary (15 pts)
    if (resume.summary && resume.summary.length > 10) {
      if (resume.summary.length > 150) structuralScore += 15;
      else { structuralScore += 8; weakSections.push("Summary is a bit too short to be impactful."); }
    } else { weakSections.push("Professional Summary is missing."); }

    // Analyze Education (15 pts)
    if (resume.education && resume.education.length > 0) structuralScore += 15;
    else weakSections.push("Education details are missing.");

    let corpusText = resume.summary || '';

    // Analyze Experience (30 pts)
    if (resume.experience && resume.experience.length > 0) {
      if (resume.experience.length >= 2) structuralScore += 30;
      else structuralScore += 15;
      
      let totalExpDescLength = 0;
      resume.experience.forEach(exp => {
        if (exp.description) {
           totalExpDescLength += exp.description.length;
           corpusText += ' ' + exp.description;
        }
      });
      if (totalExpDescLength < 100) weakSections.push("Experience descriptions lack detail and depth.");
    } else { weakSections.push("No work experience added."); }

    // Analyze Projects (15 pts)
    if (resume.projects && resume.projects.length > 0) {
      if (resume.projects.length >= 2) structuralScore += 15;
      else structuralScore += 10;
      resume.projects.forEach(p => { if (p.description) corpusText += ' ' + p.description; });
    } else { weakSections.push("Adding projects can boost your profile."); }

    // Analyze Skills (15 pts)
    if (resume.skills && resume.skills.length > 0) {
      if (resume.skills.length > 5) structuralScore += 15;
      else { structuralScore += 7; weakSections.push("Consider adding more relevant skills."); }
      corpusText += ' ' + resume.skills.join(" ");
    } else { weakSections.push("Skills section is empty."); }

    // Phase 1: Natural Language ATS Check against Job Description
    let finalScore = structuralScore;
    let atsResult = { matchedKeywords: [], missingKeywords: [], keywordDensity: 0 };

    if (jobDescription) {
       atsResult = calculateATSScore(corpusText, jobDescription);
       finalScore = Math.round((structuralScore * 0.5) + (atsResult.score * 0.5));
    }

    // Phase 3: Recruiter Engines & Bias Checkers
    const biasReport = analyzeBias(corpusText);
    const recruiterMap = simulateRecruiterAttention(resume);
    
    if (recruiterMap.warnings.length > 0) {
       weakSections.push(...recruiterMap.warnings);
    }
    
    if (biasReport.isBiased) {
       weakSections.push(...biasReport.suggestions);
    }

    res.json({
      score: Math.min(finalScore, 100),
      structuralScore,
      atsPluginScore: atsResult.score || 0,
      weakSections: [...new Set(weakSections)],
      missingKeywords: atsResult.missingKeywords.slice(0, 5),
      matchedKeywords: atsResult.matchedKeywords,
      keywordDensity: atsResult.keywordDensity,
      biasReport,
      recruiterHeatmap: recruiterMap.heatMap
    });

  } catch (error) {
    logger.error('ATS Score Error:', error);
    res.status(500).json({ message: 'Error calculating ATS score' });
  }
};

const importGithubProjects = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: 'GitHub username required' });
    
    const projects = await analyzeGithubProfile(username);
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMarketIntel = async (req, res) => {
  try {
     const { role, skills } = req.body;
     const intel = simulateMarketIntel(role, skills);
     res.json(intel);
  } catch (error) {
     res.status(500).json({ message: 'Error fetching market intellect' });
  }
};

const getVideoScript = async (req, res) => {
  try {
     const { resume, tone } = req.body;
     if (!resume) return res.status(400).json({ message: 'Resume data required' });
     const script = await generateVideoScript(resume, tone);
     res.json({ script });
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
};

const getInterviewPrep = async (req, res) => {
  try {
     const { resume, targetRole } = req.body;
     if (!resume) return res.status(400).json({ message: 'Resume data required' });
     const questions = await generateInterviewQuestions(resume, targetRole);
     res.json({ questions });
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
};

module.exports = { generateSummary, checkAtsScore, importGithubProjects, getMarketIntel, getVideoScript, getInterviewPrep };
