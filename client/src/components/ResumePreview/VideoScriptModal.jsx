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
        { resume: currentResume || {}, tone }, 
        { headers: { Authorization: `Bearer ${user?.token || ''}` } }
      );
      setScript(res.data.script);
      toast.success('Script generated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate video script. Please try again.');
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#051C2C]/80 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white max-w-2xl w-full rounded-none shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col border border-gray-200">
        <div className="p-8 flex-shrink-0 bg-[#051C2C] text-white">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-serif tracking-wide flex items-center gap-3">
              <Video size={24} className="text-white opacity-80" />
              AI Video Pitch Generator
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-sm text-gray-300 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-300 text-sm font-light tracking-wide">Generate a 60-second video script or cover letter pitch tailored directly from your resume metrics.</p>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-grow bg-white relative">
          <div className="mb-8">
             <label className="block text-[11px] font-bold uppercase tracking-widest text-[#051C2C] mb-4">Select Pitch Tone</label>
             <div className="flex gap-4">
                {['confident', 'casual', 'enthusiastic'].map((t) => (
                   <button
                     key={t}
                     onClick={() => setTone(t)}
                     className={`px-6 py-2.5 text-xs font-bold tracking-widest uppercase rounded-sm transition-colors ${tone === t ? 'bg-[#051C2C] text-white' : 'bg-white border border-gray-300 text-gray-500 hover:border-[#051C2C] hover:text-[#051C2C]'}`}
                   >
                     {t}
                   </button>
                ))}
             </div>
          </div>

          <button
             onClick={handleGenerate}
             disabled={loading}
             className="w-full bg-[#051C2C] text-white py-4 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-gray-900 transition-colors disabled:opacity-75 flex items-center justify-center gap-3"
          >
             {loading ? 'Initializing Analysis...' : 'Generate Executive Pitch'}
          </button>

          {script && (
             <div className="mt-8 bg-slate-50 p-6 rounded-sm border border-gray-200 relative animate-fadeIn">
                <button onClick={handleCopy} className="absolute top-6 right-6 text-gray-400 hover:text-[#051C2C] transition-colors">
                   {copied ? <CheckCircle size={20} className="text-emerald-600" /> : <Copy size={20} />}
                </button>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 mb-4 flex items-center gap-2"><CheckCircle size={14}/> Script Synthesized Successfully</h4>
                <div className="text-gray-800 text-sm leading-loose whitespace-pre-wrap font-sans border-l-2 border-[#051C2C] pl-4">{script}</div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
