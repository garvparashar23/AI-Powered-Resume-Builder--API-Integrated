require('dotenv').config();
const OpenAI = require('openai');

const test = async () => {
    try {
        const openai = new OpenAI({ 
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: 'https://api.groq.com/openai/v1'
        });
        
        console.log('Sending to Groq...');
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are an expert tech recruiter." }, { role: "user", content: "Test prompt" }],
            model: "llama-3.1-8b-instant",
        });

        console.log('Success:', completion.choices[0].message.content);
    } catch (e) {
        console.error('Error in Groq:', e);
    }
};

test();
