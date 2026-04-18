/**
 * ATS Checker Plugin
 * Simulates an Applicant Tracking System algorithm to match a resume against a job description.
 */

const extractKeywords = (text) => {
  if (!text) return [];
  // Basic lowercase and remove punctuation
  const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  // Filter out common stop words (simplified list)
  const stopWords = new Set(['and', 'the', 'to', 'of', 'in', 'for', 'with', 'on', 'at', 'from', 'by', 'about', 'as', 'into', 'like', 'through', 'after', 'over', 'between', 'out', 'against', 'during', 'without', 'before', 'under', 'around', 'among', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must']);
  
  return [...new Set(words.filter(word => word.length > 2 && !stopWords.has(word)))];
};

const calculateATSScore = (resumeText, jobDescription) => {
  if (!jobDescription || !resumeText) {
    return { score: 0, missingKeywords: [], matchedKeywords: [] };
  }

  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeText);

  const matchedKeywords = jobKeywords.filter(keyword => resumeKeywords.includes(keyword));
  const missingKeywords = jobKeywords.filter(keyword => !resumeKeywords.includes(keyword));

  // Weights: Exact keywords match is 80% of score, Length/density is 20%
  const keywordMatchRatio = jobKeywords.length ? (matchedKeywords.length / jobKeywords.length) : 0;
  
  let score = Math.round(keywordMatchRatio * 80);

  // Bonus points for formatting/length (simulation: check if resume is reasonably detailed)
  if (resumeKeywords.length > 50) score += 10;
  if (resumeKeywords.length > 100) score += 10;

  // Cap at 100
  score = Math.min(score, 100);

  return {
    score,
    matchedKeywords,
    missingKeywords,
    keywordDensity: parseFloat((matchedKeywords.length / (resumeKeywords.length || 1)).toFixed(2))
  };
};

module.exports = {
  calculateATSScore,
  extractKeywords
};
