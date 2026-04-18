/**
 * GitHub Analyzer Plugin
 * Fetches a user's public GitHub repositories and structures them into Resume Project format.
 */
const axios = require('axios');
const logger = require('../../utils/logger');

const analyzeGithubProfile = async (username) => {
  if (!username) return [];
  
  try {
    // Fetch public repos from GitHub API
    // Using a sort by 'updated' and taking top 5 to keep the resume relevant
    const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
    const repos = response.data;

    // Transform into resume-friendly objects
    const projectSuggestions = repos.map(repo => {
      // Create a sensible description based on topics or description
      let desc = repo.description || `Developed a ${repo.language || 'software'} application.`;
      if (repo.topics && repo.topics.length > 0) {
        desc += ` Built using ${repo.topics.join(', ')}.`;
      }
      
      return {
        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
        link: repo.html_url,
        description: desc
      };
    });

    return projectSuggestions;
  } catch (error) {
    logger.error('Failed to fetch GitHub repos:', error.message);
    throw new Error('Could not fetch GitHub repositories. Please verify the username.');
  }
};

module.exports = { analyzeGithubProfile };
