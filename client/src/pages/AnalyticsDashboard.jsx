import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Mock fetch for user analytics
    setTimeout(() => {
      setStats({
        atsScoreTrend: [60, 65, 74, 82],
        readability: 88,
        downloads: 14,
        topMissingSkills: ['Kubernetes', 'Docker', 'GraphQL'],
        resumeVersions: 4
      });
    }, 800);
  }, []);

  if (!stats) return <div className="p-8 text-center text-gray-500">Loading Intelligence Analytics...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 mb-6">
        Resume Performance Analytics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Latest ATS Score</p>
          <p className="text-4xl font-extrabold text-green-500 mt-2">{stats.atsScoreTrend[stats.atsScoreTrend.length - 1]}%</p>
          <p className="text-xs text-green-600 mt-1">↑ 8% from last version</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Readability</p>
          <p className="text-4xl font-extrabold text-blue-500 mt-2">{stats.readability}/100</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Downloads</p>
          <p className="text-4xl font-extrabold text-purple-500 mt-2">{stats.downloads}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Versions Tracked</p>
          <p className="text-4xl font-extrabold text-gray-800 dark:text-gray-200 mt-2">{stats.resumeVersions}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Skill Gap Analysis</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Based on your latest targeted jobs, you are frequently missing these high-demand skills:
        </p>
        <div className="flex flex-wrap gap-3">
          {stats.topMissingSkills.map(skill => (
             <span key={skill} className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-full font-medium">
               {skill}
             </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
