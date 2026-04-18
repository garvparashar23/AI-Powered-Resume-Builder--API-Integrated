/**
 * Tone Optimizer Plugin
 * Intercepts AI generation prompts to inject specific tones or structures based on user preferences.
 */

const getTonePrompt = (tone) => {
  switch (tone) {
    case 'corporate':
      return 'The tone must be highly professional, formal, and results-oriented, suitable for a strict corporate environment. Use strong action verbs and focus on quantifiable achievements and leadership qualities.';
    case 'startup':
      return 'The tone must be dynamic, energetic, and adaptable, suitable for a fast-paced startup. Focus on wearing multiple hats, rapid learning, continuous delivery, and taking initiative.';
    case 'research':
      return 'The tone must be academic, analytical, and precise. Focus on methodology, deep domain expertise, publications, data analysis, and rigorous scientific approaches.';
    case 'modern':
    default:
      return 'The tone should be modern, clear, and professional. Balance technical skills with soft skills, focusing on impact and collaboration.';
  }
};

const buildEnhancedPrompt = (basePrompt, tone, extraInstructions) => {
  const toneConstraint = getTonePrompt(tone);
  return `${basePrompt}\n\nCRITICAL CONSTRAINTS:\n- Tone Requirement: ${toneConstraint}\n${extraInstructions ? '- Additional: ' + extraInstructions : ''}`;
};

module.exports = {
  getTonePrompt,
  buildEnhancedPrompt
};
