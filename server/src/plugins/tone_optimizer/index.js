// src/plugins/tone_optimizer/index.js
const { OpenAI } = require('openai');

/**
 * tone_optimizer Plugin
 * Converts text into different tones (startup, corporate, research)
 */
class ToneOptimizerPlugin {
  constructor() {
    this.name = 'ToneOptimizer';
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({ 
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1'
    }) : null;
  }

  async rewrite(content, targetTone) {
    if (!this.openai) {
      console.warn('OpenAI API Key missing, returning mock response.');
      return { 
        original: content, toneUsed: targetTone, 
        optimizedText: `[Simulated ${targetTone} Tone]: ${content}` 
      };
    }

    const systemPrompt = `You are an expert career consultant. Rewrite the provided content into a ${targetTone} tone. Keep it highly impactful and professional. Output only the rewritten text.`;
    
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content }
        ],
        model: 'llama-3.1-8b-instant',
      });

      return {
        original: content,
        toneUsed: targetTone,
        optimizedText: completion.choices[0].message.content.trim(),
        promptTriggered: systemPrompt
      };
    } catch (error) {
      console.error('OpenAI Tone Optimizer Error:', error);
      throw new Error('Failed to rewrite content tone.');
    }
  }
}

module.exports = new ToneOptimizerPlugin();
