/**
 * Bias & Fairness Checker Plugin
 * Scans resume text for heavily gender-coded language or extreme tone imbalances.
 */

const masculineCodedWords = ['ambitious', 'driven', 'lead', 'individual', 'competitive', 'dominant', 'force', 'expert', 'superior'];
const feminineCodedWords = ['collaborate', 'support', 'understand', 'empathy', 'together', 'share', 'help', 'nurture', 'dependable'];

const analyzeBias = (text) => {
  if (!text) return { isBiased: false, suggestions: [] };

  const normalText = text.toLowerCase();
  
  let mCount = 0;
  let fCount = 0;

  masculineCodedWords.forEach(w => {
    if (normalText.includes(w)) mCount++;
  });
  
  feminineCodedWords.forEach(w => {
    if (normalText.includes(w)) fCount++;
  });

  const suggestions = [];
  
  // Basic threshold logic for mock analysis
  if (mCount > fCount + 3) {
    suggestions.push("The resume uses highly authoritative/competitive language. Consider adding more collaborative keywords to balance the tone for modern inclusive workplaces.");
  } else if (fCount > mCount + 3) {
    suggestions.push("The resume uses highly collaborative language. Consider adding strong leadership or action-oriented keywords to highlight your direct impact and ownership.");
  }

  return {
    mCount,
    fCount,
    isBiased: suggestions.length > 0,
    suggestions
  };
};

module.exports = { analyzeBias };
