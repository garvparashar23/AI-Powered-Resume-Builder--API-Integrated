import React, { useState } from 'react';
import { X, MessageSquare, Lightbulb, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function InterviewPrepModal({ isOpen, onClose }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [targetRole, setTargetRole] = useState('');
  const { currentResume } = useSelector((state) => state.resume);
  const { user } = useSelector((state) => state.auth);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!targetRole) {
      toast.error('Please enter the target job role');
      return;
    }
    setLoading(true);
    setQuestions([]);
    try {
      const res = await axios.post(`${API_URL}/ai/interview-prep`, 
        { resume: currentResume || {}, targetRole }, 
        { headers: { Authorization: `Bearer ${user?.token || ''}` } }
      );
      setQuestions(res.data.questions);
      toast.success('Interview Prep Generated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate interview prep. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#051C2C]/80 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white max-w-3xl w-full rounded-none shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col border border-gray-200 animate-slideUp">
        <div className="p-8 flex-shrink-0 bg-[#051C2C] text-white">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-serif tracking-wide flex items-center gap-3">
              <MessageSquare size={24} className="text-white opacity-80" />
              AI Interview Simulator
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-sm text-gray-300 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-300 text-sm font-light tracking-wide leading-relaxed">
            Prepare for your interview. The AI reads your resume deeply and generates highly probable, rigorous questions based directly on your skills and the role you want.
          </p>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-grow bg-white relative">
          <div className="mb-8 flex flex-col md:flex-row gap-6">
             <div className="flex-1">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-[#051C2C] mb-3">Target Job Role</label>
                <input 
                  type="text" 
                  value={targetRole} 
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Backend Engineer" 
                  className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:border-[#051C2C] outline-none transition font-sans text-sm"
                />
             </div>
             <div className="flex items-end">
                <button
                   onClick={handleGenerate}
                   disabled={loading}
                   className="h-[46px] w-full md:w-auto px-8 bg-[#051C2C] text-white rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors disabled:opacity-75 flex items-center justify-center whitespace-nowrap"
                >
                   {loading ? 'Simulating Scan...' : 'Initialize Simulator'}
                </button>
             </div>
          </div>

          <div className="space-y-6">
             {questions.length > 0 && questions.map((q, idx) => (
                <div key={idx} className="bg-slate-50 border border-gray-200 rounded-sm p-6 relative">
                   <div className="absolute top-0 left-0 w-1 h-full bg-[#051C2C]"></div>
                   <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-white border border-gray-200 text-[#051C2C] text-[10px] uppercase tracking-widest font-bold rounded-sm shadow-sm">{q.type}</span>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Question {idx + 1}</span>
                   </div>
                   <h3 className="text-lg font-bold text-[#051C2C] mb-4 font-serif">{q.question}</h3>
                   <div className="bg-white border border-gray-200 p-4 rounded-sm flex items-start gap-3 shadow-sm">
                      <Lightbulb size={18} className="text-[#051C2C] flex-shrink-0 mt-0.5" />
                      <div>
                         <strong className="text-[11px] uppercase tracking-widest text-gray-700 block mb-1">Expert Advice</strong>
                         <p className="text-gray-600 text-sm leading-relaxed">{q.advice}</p>
                      </div>
                   </div>
                </div>
             ))}

             {loading && (
                 <div className="flex flex-col items-center justify-center py-12 opacity-80">
                    <div className="h-0.5 w-32 bg-gray-200 rounded-full overflow-hidden mb-4">
                       <div className="h-full bg-[#051C2C] w-1/2 animate-bounce"></div>
                    </div>
                    <p className="text-xs uppercase tracking-widest font-bold text-gray-500">Cross-referencing metrics with industry standards...</p>
                 </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
