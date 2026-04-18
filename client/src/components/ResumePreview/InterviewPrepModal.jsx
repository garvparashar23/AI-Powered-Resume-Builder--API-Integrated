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
        { resume: currentResume, targetRole }, 
        { headers: { Authorization: `Bearer ${user?.token || ''}` } }
      );
      setQuestions(res.data.questions);
      toast.success('Interview Prep Generated!');
    } catch (error) {
      toast.error('Failed to generate interview prep.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col animate-slideUp">
        <div className="p-6 md:p-8 flex-shrink-0 border-b border-indigo-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center bg-transparent">
            <h2 className="text-2xl font-bold text-indigo-900 flex items-center gap-2">
              <MessageSquare size={28} className="text-indigo-600" />
              AI Interview Simulator
            </h2>
            <button onClick={onClose} className="p-2 bg-white hover:bg-gray-100 rounded-full text-gray-500 shadow-sm transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-indigo-700/70 text-sm mt-3 leading-relaxed">
            Prepare for your interview. The AI reads your resume deeply and generates highly probable, rigorous questions based directly on your skills and the role you want.
          </p>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow bg-slate-50 relative">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
             <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Job Role:</label>
                <input 
                  type="text" 
                  value={targetRole} 
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Backend Engineer" 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
             </div>
             <div className="flex items-end">
                <button
                   onClick={handleGenerate}
                   disabled={loading}
                   className="h-[46px] w-full md:w-auto px-6 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-75 flex items-center justify-center whitespace-nowrap shadow-lg shadow-indigo-600/30"
                >
                   {loading ? 'Simulating...' : 'Generate Questions'}
                </button>
             </div>
          </div>

          <div className="space-y-4">
             {questions.length > 0 && questions.map((q, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                   <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full">{q.type}</span>
                      <span className="text-sm font-semibold text-gray-400">Question {idx + 1}</span>
                   </div>
                   <h3 className="text-lg font-bold text-gray-800 mb-4">{q.question}</h3>
                   <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
                      <Lightbulb size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                         <strong className="text-amber-900 text-sm block mb-1">Expert Advice:</strong>
                         <p className="text-amber-800/80 text-sm leading-relaxed">{q.advice}</p>
                      </div>
                   </div>
                </div>
             ))}

             {loading && (
                 <div className="flex flex-col items-center justify-center py-10 opacity-60">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-sm font-medium text-gray-500">Cross-referencing your resume with industry standard interviews...</p>
                 </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
