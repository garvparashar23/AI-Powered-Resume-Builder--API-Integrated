const atsChecker = require('./ats_checker');
const toneOptimizer = require('./tone_optimizer');
const jobMatcher = require('./job_matcher');

class PluginSystem {
  constructor() {
    this.plugins = {
      atsChecker,
      toneOptimizer,
      jobMatcher
    };
  }

  // Orchestrate ATS matching
  async runAtsCheck(resumeData, jobDescription) {
    if (!this.plugins.atsChecker) throw new Error("ATS Checker plugin not found.");
    return await this.plugins.atsChecker.evaluate(resumeData, jobDescription);
  }

  // Rewrite tone based on persona
  async runToneOptimization(content, targetTone) {
    if (!this.plugins.toneOptimizer) throw new Error("Tone Optimizer plugin not found.");
    return await this.plugins.toneOptimizer.rewrite(content, targetTone);
  }

  // Match jobs dynamically
  async runJobMatch(resumeData, marketContext) {
    if (!this.plugins.jobMatcher) throw new Error("Job Matcher plugin not found.");
    return await this.plugins.jobMatcher.findMatches(resumeData, marketContext);
  }
}

module.exports = new PluginSystem();
