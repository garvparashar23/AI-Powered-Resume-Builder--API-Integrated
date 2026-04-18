/**
 * Job Market Intelligence Plugin
 * Simulates real-world market intelligence (Salary, Trajectory, Trending Skills).
 */

const roleData = {
  'frontend': { salary: '$90k - $140k', trend: 'Growing heavily with React/Vue ecosystems.', nextStep: 'Senior Frontend Engineer or UI Architect' },
  'backend': { salary: '$100k - $160k', trend: 'High demand for Microservices and Go/Node.', nextStep: 'Senior Backend Engineer or Systems Architect' },
  'fullstack': { salary: '$110k - $170k', trend: 'Consistent demand across startups.', nextStep: 'Lead Engineer' },
  'data': { salary: '$100k - $150k', trend: 'Massive surge driven by AI and LLM Ops.', nextStep: 'Machine Learning Engineer or Data Scientist' },
  'default': { salary: 'Market Dependent', trend: 'Stable', nextStep: 'Senior Level' }
};

const trendingSkillsList = ["React", "TypeScript", "Node.js", "Python", "Kubernetes", "AWS", "Docker", "GraphQL", "Go"];

const simulateMarketIntel = (role, currentSkills) => {
  const normRole = (role || '').toLowerCase();
  
  let match = 'default';
  if (normRole.includes('front')) match = 'frontend';
  else if (normRole.includes('back')) match = 'backend';
  else if (normRole.includes('full') || normRole.includes('software')) match = 'fullstack';
  else if (normRole.includes('data') || normRole.includes('machine')) match = 'data';

  // Find trending skills that the user doesn't have yet
  const userSkillsNorm = (currentSkills || []).map(s => s.toLowerCase());
  const missingTrending = trendingSkillsList.filter(s => !userSkillsNorm.includes(s.toLowerCase()));

  return {
    careerPath: {
      estimatedSalary: roleData[match].salary,
      marketTrend: roleData[match].trend,
      predictedNextRole: roleData[match].nextStep,
      timeToNextRole: '1.5 - 2.5 Years'
    },
    skillRoadmap: {
      highlyDemandedMissingSkills: missingTrending.slice(0, 3)
    }
  };
};

module.exports = { simulateMarketIntel };
