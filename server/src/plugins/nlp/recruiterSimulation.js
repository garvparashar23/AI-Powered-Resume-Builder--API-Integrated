/**
 * Recruiter Simulation Engine
 * Simulates how much attention a recruiter would give to specific sections based on formatting and data density.
 */

const simulateRecruiterAttention = (resume) => {
  const heatMap = {
    summary: 0,
    experience: 0,
    skills: 0,
    education: 0,
    projects: 0
  };

  const warnings = [];

  // Recruiter Eye-tracking theory: Top Left (Summary/Experience) gets most attention
  // Density calculation (rough estimation)
  
  if (resume.summary && resume.summary.length > 100) {
     heatMap.summary = 85; 
  } else {
     heatMap.summary = 40;
     warnings.push("Summary is too short; recruiters often skim past short summaries.");
  }

  let expLength = 0;
  if (resume.experience) {
     resume.experience.forEach(e => { expLength += (e.description || '').length });
     if (expLength > 200) heatMap.experience = 95;
     else if (expLength > 50) heatMap.experience = 60;
     else {
        heatMap.experience = 30;
        warnings.push("Experience section lacks bullet points. This is the #1 area recruiters look at.");
     }
  }

  if (resume.skills && resume.skills.length > 8) heatMap.skills = 80;
  else heatMap.skills = 50;

  if (resume.projects && resume.projects.length >= 2) heatMap.projects = 75;
  else heatMap.projects = 35;

  heatMap.education = 60; // Standard attention

  return { heatMap, warnings };
};

module.exports = { simulateRecruiterAttention };
