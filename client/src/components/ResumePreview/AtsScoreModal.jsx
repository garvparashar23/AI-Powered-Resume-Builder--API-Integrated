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
        { resume: currentResume || {}, jobDescription }, 
        { headers: { Authorization: `Bearer ${user?.token || ''}` } }
      );
      setData(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to analyze resume. Please try again.');
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#051C2C]/80 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white max-w-4xl w-full rounded-none shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col border border-gray-200">
        <div className="p-8 flex-shrink-0 bg-[#051C2C] text-white">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-serif tracking-wide flex items-center gap-3">
              <Target size={24} className="text-white opacity-80" />
              The Resume Doctrine AI Scanner
            </h2>
            <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-sm text-gray-300 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-300 text-sm font-light tracking-wide leading-relaxed">
            Run a deep structural integrity check against corporate ATS algorithms. Provide a targeted job description to simulate precision keyword matching and extract deep market intelligence on your document.
          </p>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-grow bg-white relative">
          {!data && !loading && (
             <div className="mb-6">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-[#051C2C] mb-3">Target Job Description (Optional but Recommended)</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-[#051C2C] outline-none transition font-sans text-sm mb-6"
                  placeholder="Paste target Job Description here for maximum scan fidelity..."
                ></textarea>
                <button
                  onClick={handleAnalyze}
                  className="w-full px-6 py-4 bg-[#051C2C] text-white rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-gray-900 transition flex items-center justify-center gap-3"
                >
                  <Target size={16} /> Initialize Deep Scan
                </button>
             </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-80">
              <div className="h-0.5 w-48 bg-gray-200 rounded-full overflow-hidden mb-6">
                 <div className="h-full bg-[#051C2C] w-1/3 animate-ping"></div>
              </div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#051C2C] mb-2">Executing Market Scanning Protocols...</h3>
              <p className="text-xs text-gray-500 max-w-xs text-center font-light leading-relaxed">Evaluating ATS mapping, recruiter simulation heuristics, and ethical bias formatting across document elements.</p>
            </div>
          ) : data ? (
            <div className="space-y-8 animate-fadeIn">
              {/* Score Section */}
              <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-8 rounded-sm border border-gray-200">
                <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="2" />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={data.score >= 80 ? '#051C2C' : data.score >= 60 ? '#6B7280' : '#EF4444'}
                      strokeWidth="2"
                      strokeDasharray={`${data.score}, 100`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-serif text-[#051C2C]">{data.score}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">/ 100</span>
                  </div>
                </div>
                <div>
                   <div className="flex flex-wrap mb-4 gap-3">
                      <div className="bg-white px-4 py-2 border border-gray-200 text-[10px] font-bold text-[#051C2C] uppercase tracking-widest shadow-sm">Formative Structure: {data.structuralScore} / 100</div>
                      {jobDescription && <div className="bg-[#051C2C] px-4 py-2 text-white border border-[#051C2C] text-[10px] font-bold uppercase tracking-widest shadow-sm">Market Targeting: {data.atsPluginScore} / 100</div>}
                   </div>
                  <h3 className="text-lg font-serif text-[#051C2C] mb-2">
                    {data.score >= 80 ? 'Market Ready Documentation' : data.score >= 50 ? 'Iterative Refinement Suggested' : 'Critical Restructuring Required'}
                  </h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed max-w-lg">
                    {data.score >= 80
                      ? 'Your resume passes critical ATS bounds and presents highly optimized architectural data mapping for automatic crawlers.'
                      : data.score >= 50
                      ? 'Your resume presents adequate structure but requires more focused technical lexicons targeted to your specified role.'
                      : 'High risk of automatic rejection. Document requires immediate restructuring using professional grade methodology.'}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Missing Keywords */}
                <div className="bg-white p-6 border border-gray-200">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4 text-[#051C2C]">
                    <Lightbulb size={18} />
                    <h4 className="text-[11px] font-bold uppercase tracking-widest">Market Deficiencies (Keywords)</h4>
                  </div>
                  {data.missingKeywords && data.missingKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {data.missingKeywords.map((kw, idx) => (
                        <span key={idx} className="bg-slate-100 border border-gray-200 text-gray-700 px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 flex items-end gap-2 font-light">
                      <CheckCircle size={16} className="text-[#051C2C]" />
                      No significant intelligence gaps identified.
                    </p>
                  )}
                </div>

                {/* Bias Checker (Ethical AI) */}
                <div className="bg-white p-6 border border-gray-200">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4 text-[#051C2C]">
                    <Scale size={18} />
                    <h4 className="text-[11px] font-bold uppercase tracking-widest">Ethical & Bias Heuristics</h4>
                  </div>
                  {data.biasReport && data.biasReport.isBiased ? (
                     <div className="space-y-4">
                         <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                             <span>Masculine Coded: {data.biasReport.mCount}</span>
                             <span>Feminine Coded: {data.biasReport.fCount}</span>
                         </div>
                        {data.biasReport.suggestions.map((suggestion, idx) => (
                           <div key={idx} className="bg-slate-50 border-l-2 border-gray-400 p-3 text-xs text-gray-700 leading-relaxed font-light">
                             {suggestion}
                           </div>
                        ))}
                     </div>
                  ) : (
                    <p className="text-sm text-gray-600 flex items-end gap-2 font-light">
                      <CheckCircle size={16} className="text-[#051C2C]" />
                      Document tone falls within optimal neutral bands.
                    </p>
                  )}
                </div>

                {/* Weak Sections */}
                <div className="bg-white p-6 border border-gray-200 md:col-span-2">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-4 text-[#051C2C]">
                    <AlertTriangle size={18} />
                    <h4 className="text-[11px] font-bold uppercase tracking-widest">Simulator & Formatting Diagnostics</h4>
                  </div>
                  {data.weakSections && data.weakSections.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {data.weakSections.map((ws, idx) => (
                        <div key={idx} className="bg-slate-50 text-xs text-gray-800 p-4 border border-gray-200 leading-relaxed font-light flex items-start gap-2">
                          <span className="text-gray-400 font-bold mt-0.5">•</span> {ws}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 flex items-end gap-2 p-4 bg-slate-50 border border-gray-200 font-light">
                      <CheckCircle size={16} className="text-[#051C2C]" />
                      Formatting passes technical recruiter optical simulation.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-slate-50 flex justify-end gap-4">
          {data && <button
            onClick={() => setData(null)}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#051C2C] border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Re-Initialize Scan
          </button>}
          <button
            onClick={handleClose}
            className="px-8 py-2.5 bg-[#051C2C] text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
