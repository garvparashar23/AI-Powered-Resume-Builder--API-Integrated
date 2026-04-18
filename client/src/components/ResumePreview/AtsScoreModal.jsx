import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Lightbulb, Target, Scale } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function AtsScoreModal({ isOpen, onClose }) {
  const [jobDescription, setJobDescription] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentResume } = useSelector((state) => state.resume);
  const { user } = useSelector((state) => state.auth);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/ai/ats-score`, 
        { resume: currentResume, jobDescription }, 
        { headers: { Authorization: `Bearer ${user?.token || ''}` } }
      );
      setData(res.data);
    } catch (error) {
      toast.error('Failed to analyze resume.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setData(null);
    setJobDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-primary bg-clip-text text-transparent flex items-center gap-2">
              <Target size={28} className="text-indigo-600" />
              AI Resume Intelligence Scanner
            </h2>
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          {!data && !loading && (
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Target Job Description & Deep Scan</h3>
                <p className="text-sm text-gray-500 mb-4">Paste the job description you are applying for to get a precise keyword match score. We will also scan for Recruiter Attention Heatmaps and Ethical Bias.</p>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition text-sm mb-4"
                  placeholder="Paste Job Description here..."
                ></textarea>
                <button
                  onClick={handleAnalyze}
                  className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition shadow-md flex items-center justify-center gap-2"
                >
                  <Target size={18} /> Analyze Resume Match
                </button>
             </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative w-24 h-24 mb-6">
                <svg className="animate-spin w-full h-full text-primary" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target size={32} className="text-primary animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Intelligence Scanning...</h3>
              <p className="text-gray-500 mt-2 text-center max-w-xs">Checking ATS compatibility, Recruiter Heatmap patterns, and Fairness algorithms.</p>
            </div>
          ) : data ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Score Section */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={data.score >= 80 ? '#10B981' : data.score >= 60 ? '#F59E0B' : '#EF4444'}
                      strokeWidth="3"
                      strokeDasharray={`${data.score}, 100`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">{data.score}</span>
                    <span className="text-sm font-medium text-gray-500">/100</span>
                  </div>
                </div>
                <div>
                   <div className="flex flex-wrap mb-3 gap-2">
                      <div className="bg-white px-3 py-1.5 border border-indigo-100 shadow-sm rounded-md text-xs font-bold text-gray-700 uppercase tracking-wider">Format Score: {data.structuralScore} / 100</div>
                      {jobDescription && <div className="bg-white px-3 py-1.5 border border-indigo-200 shadow-sm rounded-md text-xs font-bold text-indigo-700 uppercase tracking-wider">Job Match: {data.atsPluginScore} / 100</div>}
                   </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {data.score >= 80 ? 'Excellent Match!' : data.score >= 50 ? 'Needs Improvement' : 'Action Required'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {data.score >= 80
                      ? 'Your resume is highly optimized and likely to pass automated ATS screenings.'
                      : data.score >= 50
                      ? 'Your resume is okay but might miss out on opportunities due to missing keywords.'
                      : 'Your resume is incomplete. Please finish adding details to align with the job description.'}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Missing Keywords */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-indigo-700">
                       <Lightbulb size={20} />
                       <h4 className="font-bold">Missing ATS Keywords</h4>
                    </div>
                  </div>
                  {data.missingKeywords && data.missingKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {data.missingKeywords.map((kw, idx) => (
                        <span key={idx} className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-full capitalize font-medium">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-500" />
                      We couldn't find any common missing keywords. Great job!
                    </p>
                  )}
                </div>

                {/* Bias Checker (Ethical AI) */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-purple-700">
                       <Scale size={20} />
                       <h4 className="font-bold">Ethical Fairness / Bias Scan</h4>
                    </div>
                  </div>
                  {data.biasReport && data.biasReport.isBiased ? (
                     <div className="space-y-3">
                         <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-2">
                             <span>Masculine Coded: {data.biasReport.mCount}</span>
                             <span>Feminine Coded: {data.biasReport.fCount}</span>
                         </div>
                        {data.biasReport.suggestions.map((suggestion, idx) => (
                           <div key={idx} className="bg-purple-50 p-3 rounded-lg border border-purple-100 text-sm text-purple-800">
                             {suggestion}
                           </div>
                        ))}
                     </div>
                  ) : (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-500" />
                      No extreme gender-coded tone biases detected. Tone is balanced.
                    </p>
                  )}
                </div>

                {/* Weak Sections */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
                  <div className="flex items-center gap-2 mb-4 text-rose-700">
                    <AlertTriangle size={20} />
                    <h4 className="font-bold">Structural & Recruiter Simulator Warnings</h4>
                  </div>
                  {data.weakSections && data.weakSections.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-3">
                      {data.weakSections.map((ws, idx) => (
                        <div key={idx} className="bg-rose-50 text-sm text-rose-800 p-3 rounded-lg border border-rose-100 font-medium">
                          {ws}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 flex items-center gap-2 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                      <CheckCircle size={18} className="text-emerald-600" />
                      All sections look extremely solid and well-detailed across our recruiter simulation heatmap.
                    </p>
                  )}
                </div>

              </div>
            </div>
          ) : null}

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-2">
            {data && <button
              onClick={() => setData(null)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Re-Scan
            </button>}
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-900/20"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
