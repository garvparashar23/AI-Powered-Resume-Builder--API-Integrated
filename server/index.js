require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

const { OpenAI } = require('openai');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI conditionally if API key exists
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// Routes
// 1. Test route GET /
app.get('/', (req, res) => {
  res.send('Server running');
});

// 2. Auth register route POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  res.status(200).json({ 
    _id: "mock_id_123",
    name: req.body.name || "Test User",
    email: req.body.email || "test@test.com",
    token: "mock_jwt_token"
  });
});

// 2.1 Auth login route POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  res.status(200).json({ 
    _id: "mock_id_123",
    name: "Test User",
    email: req.body.email || "test@test.com",
    token: "mock_jwt_token"
  });
});

// 3. Save resume route POST /api/resume/save
app.post('/api/resume/save', (req, res) => {
  res.status(200).json({ success: true, message: 'Resume saved successfully' });
});

// 4. AI Generate summary route POST /api/ai/generate-summary
app.post('/api/ai/generate-summary', async (req, res) => {
  const { role, skills, experience, education, name, projects } = req.body;

  try {
    if (openai && process.env.OPENAI_API_KEY !== 'mock_key_for_testing') {
      const systemPrompt = `You are a professional resume writing expert and ATS optimization specialist.

Your task is to generate a highly professional, structured resume content based on the user's profile data.
You MUST format the output into the following sections:
## 1. Professional Summary (3-4 lines)
## 2. Projects
## 3. Experience / Internships
## 4. Certifications
## 5. Achievements
## 6. Languages

IMPORTANT RULES:
- Keep language professional and ATS-optimized
- Do not repeat information unnecessarily
- Use clean bullet points and consistent formatting
- Make content realistic and recruiter-friendly
- Avoid overly long paragraphs
- Prioritize clarity and impact over fluff`;

      const userContent = `Input Data:
- Name: ${name || 'Not provided'}
- Role: ${role || 'Not provided'}
- Skills: ${skills ? skills.join(', ') : 'Not provided'}
- Education: ${education ? JSON.stringify(education) : 'Not provided'}
- Experience: ${experience ? JSON.stringify(experience) : 'Not provided'}
- Projects: ${projects ? JSON.stringify(projects) : 'Not provided'}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent }
        ],
        temperature: 0.7,
      });

      return res.status(200).json({ summary: completion.choices[0].message.content });
    }

    // Fallback logic
    let summary = `Results-driven and highly motivated ${role || 'Professional'} with a proven track record of delivering high-quality solutions.`;

    if (experience && experience.length > 0) {
      const recentRole = experience[0].role || 'Professional';
      const recentCompany = experience[0].company || 'industry-leading organizations';
      summary += ` Experienced as a ${recentRole} at ${recentCompany}, excelling in fast-paced environments and contributing to impactful projects.`;
    } else {
      summary += ` Eager to leverage strong analytical abilities and academic foundation in a dynamic workplace.`;
    }

    if (skills && skills.length > 0) {
      const topSkills = skills.slice(0, 4).join(', ');
      summary += ` Equipped with a versatile skill set including ${topSkills}, enabling the successful execution of complex tasks and cross-functional collaboration.`;
    }

    if (education && education.length > 0) {
      const recentEdu = education[0];
      if (recentEdu.degree && recentEdu.institution) {
        summary += ` Holds a ${recentEdu.degree} from ${recentEdu.institution}, demonstrating a commitment to continuous learning and professional growth.`;
      }
    }

    summary += ` Adept at problem-solving, communication, and adapting to new technologies to drive organizational success.`;

    setTimeout(() => {
      res.status(200).json({ summary });
    }, 1000);
  } catch (error) {
    console.error('Error generating AI text:', error);
    res.status(500).json({ success: false, message: 'Server Error generating AI text.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
