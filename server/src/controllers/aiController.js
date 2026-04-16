// Implementation of AI integration using OpenAI
const generateSummary = async (req, res) => {
  try {
    const { role, experienceSettings } = req.body;
    
    // As per user request, using mock response until API key is provided
    let mockResponse = `As a highly motivated and skilled ${role || 'professional'}, I possess a strong background in software development and project management. Experienced in building scalable applications and finding innovative solutions to complex problems.`;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    res.json({ summary: mockResponse });
  } catch (error) {
    res.status(500).json({ message: 'Error generating summary' });
  }
};

module.exports = { generateSummary };
