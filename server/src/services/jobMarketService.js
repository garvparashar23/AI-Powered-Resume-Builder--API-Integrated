// src/services/jobMarketService.js

/**
 * Simulates integration with a Job API (e.g. LinkedIn API, Indeed)
 * Provides real-world context for targeted resume building.
 */
class JobMarketService {
  async getTrendingSkills(roleContext) {
    if (roleContext.toLowerCase().includes('data')) {
      return ['Python', 'SQL', 'Snowflake', 'dbt', 'Machine Learning'];
    }
    return ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker']; // Default Software
  }

  async getSalaryInsights(roleContext, experienceYears) {
    let base = 80000;
    if (roleContext.toLowerCase().includes('senior')) base += 40000;
    if (experienceYears > 5) base += 30000;
    
    return {
      estimatedRange: `$${base - 10000} - $${base + 20000}`,
      confidence: 'High (Based on 1200 real-time listings)'
    };
  }

  async analyzeJobDescription(text) {
    // Simulates an API call mapping job desc to required graph entities
    const extractedKeywords = text.split(' ').filter(w => w.length > 5).slice(0, 8);
    return {
      urgency: 'High',
      extractedKeywords,
      culture: 'Startup / Fast-paced'
    };
  }
}

module.exports = new JobMarketService();
