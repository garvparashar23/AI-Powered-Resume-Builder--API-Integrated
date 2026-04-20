import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecruiterPanel = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this hits an Admin/Recruiter specific endpoint
    // We mock this slightly for the UI scaffolding
    setTimeout(() => {
      setCandidates([
        { id: '1', name: 'Alice Smith', role: 'Frontend Eng', ats: 82, publicLink: '/resume/pub-1' },
        { id: '2', name: 'Bob Jones', role: 'Data Scientist', ats: 91, publicLink: '/resume/pub-2' },
        { id: '3', name: 'Charlie Lee', role: 'Backend Eng', ats: 65, publicLink: '/resume/pub-3' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Recruiter Intelligence Panel</h1>
        <div className="bg-blue-100 text-blue-800 text-sm px-4 py-2 rounded-full font-semibold">
          Pro Feature
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-t-4 border-indigo-500">
          <p className="text-sm text-gray-500 uppercase">Pool Average ATS</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">79.3%</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-t-4 border-green-500">
          <p className="text-sm text-gray-500 uppercase">Candidates Available</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">1,204</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border-t-4 border-purple-500">
          <p className="text-sm text-gray-500 uppercase">Top Skill Demand</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">React, Node.js</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate Profile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matched Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ATS Score</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr><td colSpan="4" className="text-center py-8 text-gray-500">Loading candidate data...</td></tr>
            ) : (
              candidates.map(candidate => (
                <tr key={candidate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {candidate.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {candidate.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${candidate.ats > 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {candidate.ats}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href={candidate.publicLink} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">View Resume</a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruiterPanel;
