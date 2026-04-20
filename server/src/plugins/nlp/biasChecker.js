// src/plugins/nlp/biasChecker.js

/**
 * Bias & Fairness Checker Plugin
 * Checks for gender-coded language and tone imbalance
 */
class BiasChecker {
  async evaluate(resumeText) {
    // Mock fairness evaluation
    const textLower = resumeText.toLowerCase();
    
    // Simplistic mock rule based on standard gendered-language lists
    const masculineCodedWords = ['aggressive', 'dominant', 'ninja', 'rockstar', 'competitive'];
    const feminineCodedWords = ['supportive', 'understanding', 'compassionate', 'nurture'];
    
    let hasBias = false;
    let details = [];

    const foundMasc = masculineCodedWords.filter(w => textLower.includes(w));
    const foundFem = feminineCodedWords.filter(w => textLower.includes(w));

    if (foundMasc.length > 0) {
      hasBias = true;
      details.push(`Consider replacing masculine-coded words: ${foundMasc.join(', ')} with neutral terms.`);
    }

    if (foundFem.length > 0) {
      hasBias = true;
      details.push(`Consider replacing feminine-coded words: ${foundFem.join(', ')} with neutral terms.`);
    }

    return {
      hasBias,
      details,
      neutralSuggestions: hasBias ? 'Ensure language purely reflects impact, KPIs, and deliverables.' : 'No obvious bias detected.',
      status: 'Ethical AI Resume Analyzer - Complete'
    };
  }
}

module.exports = new BiasChecker();
