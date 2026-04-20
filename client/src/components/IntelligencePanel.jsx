import React, { useState } from 'react';
import axios from 'axios';

const IntelligencePanel = ({ resumeId, jobDescription }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const performAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      // In production, this URL would be parameterized based on env
      const response = await axios.post(`/api/ai/analyze/${resumeId}`, { jobDescription });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error executing AI analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          The Resume Doctrine
        </h3>
        <button 
          onClick={performAnalysis}
          disabled={loading || !resumeId}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </div>

      {error && <div className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded">{error}</div>}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">ATS Match Score</p>
              <p className={`text-3xl font-bold ${data.atsCheck.score > 70 ? 'text-green-500' : 'text-orange-500'}`}>
                {data.atsCheck.score}%
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">AI Profile</p>
              <p className="text-md font-semibold text-gray-800 dark:text-gray-200">
                {data.nlpData.primaryRole}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Missing Skills</h4>
            <div className="flex flex-wrap gap-2">
              {data.atsCheck.missingKeywords.length === 0 ? (
                <span className="text-green-500 text-sm">Perfect Keyword Match!</span>
              ) : (
                data.atsCheck.missingKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    {kw}
                  </span>
                ))
              )}
            </div>
          </div>

          <div>
             <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Bias & Fairness Check</h4>
             {data.biasCheck.hasBias ? (
               <ul className="text-sm text-orange-600 list-disc pl-5 space-y-1">
                 {data.biasCheck.details.map((warn, i) => <li key={i}>{warn}</li>)}
               </ul>
             ) : (
               <p className="text-sm text-green-600 flex items-center">
                 <span className="mr-2">✨</span> {data.biasCheck.neutralSuggestions}
               </p>
             )}
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-400 font-mono">
              XAI Log: {data.xaiLogs.map(l => l.feature).join(' | ')}
            </p>
          </div>
        </div>
      )}
      
      {!data && !loading && (
        <div className="text-center text-gray-500 py-8">
          Upload a Job Description and click "Run Analysis" to get deep insights on your resume.
        </div>
      )}
    </div>
  );
};

export default IntelligencePanel;
