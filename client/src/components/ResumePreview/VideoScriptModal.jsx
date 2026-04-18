import React, { useState } from 'react';
import { X, Video, Copy, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function VideoScriptModal({ isOpen, onClose }) {
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState('confident');
  const [copied, setCopied] = useState(false);
  const { currentResume } = useSelector((state) => state.resume);
  const { user } = useSelector((state) => state.auth);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setCopied(false);
    try {
      const res = await axios.post(`${API_URL}/ai/video-script`, 
        { resume: currentResume, tone }, 
        { headers: { Authorization: `Bearer ${user?.token || ''}` } }
      );
      setScript(res.data.script);
      toast.success('Script generated successfully!');
    } catch (error) {
      toast.error('Failed to generate video script.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    toast.success('Script copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        <div className="p-6 md:p-8 flex-shrink-0 border-b border-gray-100">
          <div className="flex justify-between items-center bg-transparent">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent flex items-center gap-2">
              <Video size={28} className="text-rose-500" />
              AI Video Pitch Generator
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-2">Generate a 60-second video script or cover letter pitch tailored directly from your resume.</p>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow bg-slate-50 relative">
          <div className="mb-4">
             <label className="block text-sm font-semibold text-gray-700 mb-2">Select Pitch Tone:</label>
             <div className="flex gap-3">
                {['confident', 'casual', 'enthusiastic'].map((t) => (
                   <button
                     key={t}
                     onClick={() => setTone(t)}
                     className={`px-4 py-2 text-sm font-medium rounded-full capitalize transition ${tone === t ? 'bg-rose-500 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:border-rose-300'}`}
                   >
                     {t}
                   </button>
                ))}
             </div>
          </div>

          <button
             onClick={handleGenerate}
             disabled={loading}
             className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-75 flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20 mt-4"
          >
             {loading ? 'Generating Scripts...' : 'Generate New Pitch'}
          </button>

          {script && (
             <div className="mt-6 bg-white p-5 rounded-xl border border-rose-100 shadow-sm relative animate-fadeIn">
                <button onClick={handleCopy} className="absolute top-4 right-4 text-gray-400 hover:text-rose-500 transition tooltip-container">
                   {copied ? <CheckCircle size={20} className="text-emerald-500" /> : <Copy size={20} />}
                </button>
                <h4 className="text-xs font-bold uppercase text-rose-500 tracking-wider mb-2">Your Script:</h4>
                <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{script}</div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
