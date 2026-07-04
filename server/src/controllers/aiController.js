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
      let mockResponse = `Results-driven ${role || 'Professional'} with a proven track record of designing and delivering high-impact system architectures. Skilled in leveraging cutting-edge methodologies to enhance scalability, streamline performance, and maximize organizational efficiency.`;
      await new Promise(resolve => setTimeout(resolve, 1500));
      return res.json({ summary: mockResponse });
    }

    const backgroundDetails = { skills, experience, education };
    const basePrompt = `Generate a professional, results-oriented summary for a ${role} with the following background details: ${JSON.stringify(backgroundDetails)}. Keep it precise and small, strictly 2 to 3 sentences, written in a high-impact corporate tone. Return ONLY the raw copy-pasteable summary text itself. Do NOT include any conversational introduction, preambles (such as "Here's a professionally designed summary..."), explanation, quotes, or markdown wrappers.`;
    const finalPrompt = buildEnhancedPrompt(basePrompt, tone);

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a strict technical recruiter and professional resume writer. Your job is to output ONLY the raw summary text without any conversational preamble, introduction, quotes, or surrounding explanation. Output must be exactly 2-3 sentences, using active corporate verbs." }, 
        { role: "user", content: finalPrompt }
      ],
      model: "llama-3.1-8b-instant",
    });

    let summaryText = completion.choices[0].message.content.trim();
    // Strip leading/trailing quotation marks if the LLM output wrapped it in quotes
    summaryText = summaryText.replace(/^["']|["']$/g, '');
    // Strip common preambles if present
    summaryText = summaryText.replace(/^(Here's|Here is) a (professionally designed|professional|corporate) summary.*:\s*/i, '');

    res.json({ summary: summaryText.trim() });
  } catch (error) {
    logger.error('Error generating summary:', error);
    res.status(500).json({ message: 'Error generating summary' });
  }
};

const generateLocalGapAnalysis = (missingKeywords) => {
  if (!missingKeywords || missingKeywords.length === 0) {
    return "• No significant skill gaps or credential differences identified between the resume and job description.";
  }
  
  const bulletPoints = [];
  bulletPoints.push(`• Critical competency gap: The resume lacks direct references to target requirements like ${missingKeywords.slice(0, 3).map(kw => kw.toUpperCase()).join(', ')}.`);
  bulletPoints.push(`• Technical mismatch: Core tools and environments specified in the job description are not fully integrated or highlighted in your current experience bullet points.`);
  bulletPoints.push(`• Recommended adjustment: Explicitly document hands-on project work or roles involving these target technical competencies to improve automatic ATS routing alignment.`);
  
  return bulletPoints.join('\n');
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
    let atsResult = { matchedKeywords: [], missingKeywords: [], keywordDensity: 0, gapAnalysis: '' };

    if (jobDescription) {
       atsResult = calculateATSScore(corpusText, jobDescription);
       finalScore = Math.round((structuralScore * 0.5) + (atsResult.score * 0.5));
       
       if (openai) {
          try {
             const systemPrompt = "You are a professional recruiting evaluator. Compare the resume text with the job description. Identify specific differences (e.g. gaps in experience levels, credentials, tools) and missing things (e.g. specific skills, certifications, practices). Be concise, precise, and professional. Return your analysis in plain text as 3-4 bullet points (use standard bullet character •). Do not write any introduction.";
             const userPrompt = `Job Description:\n${jobDescription}\n\nResume Text:\n${corpusText}`;
             const completion = await openai.chat.completions.create({
                messages: [
                   { role: 'system', content: systemPrompt },
                   { role: 'user', content: userPrompt }
                ],
                model: 'llama-3.1-8b-instant'
             });
             atsResult.gapAnalysis = completion.choices[0].message.content.trim();
          } catch (err) {
             logger.error("Failed to generate AI gap analysis:", err);
             atsResult.gapAnalysis = generateLocalGapAnalysis(atsResult.missingKeywords);
          }
       } else {
          atsResult.gapAnalysis = generateLocalGapAnalysis(atsResult.missingKeywords);
       }
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
      recruiterHeatmap: recruiterMap.heatMap,
      gapAnalysis: atsResult.gapAnalysis || ""
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
