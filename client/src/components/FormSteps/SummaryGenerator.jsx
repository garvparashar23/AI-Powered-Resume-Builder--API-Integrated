import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../../store/resumeSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Wand2 } from 'lucide-react';
import { API_URL } from '../../config';

export default function SummaryGenerator() {
  const { summary, skills, experience, education } = useSelector((state) => state.resume.currentResume);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const generateAI = async () => {
    if (!role) {
      toast.error('Please enter a target role/job title first');
      return;
    }
    setLoading(true);
    try {

      const res = await axios.post(
        `${API_URL}/ai/generate-summary`,
        { 
          role,
          skills,
          experience,
          education
        },
        { headers: { Authorization: `Bearer ${user?.token || ''}` } }
      );
      dispatch(updateField({ field: 'summary', value: res.data.summary }));
      toast.success('AI Summary Generated!');
    } catch (error) {
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Professional Summary</h2>
        <p className="text-gray-500 text-sm mt-1">Write a short summary or let AI do it for you.</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 flex flex-col sm:flex-row gap-4 items-end">
        <div className="w-full">
          <label className="block text-sm font-semibold text-indigo-900 mb-1">Target Job Role <span className="font-normal text-indigo-500">(for AI)</span></label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition bg-white"
            placeholder="e.g. Senior Frontend Developer"
          />
        </div>
        <button
          onClick={generateAI}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-md shadow-blue-500/30 transition disabled:opacity-75 whitespace-nowrap min-w-[160px]"
        >
          {loading ? (
             <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Generating...</span>
          ) : (
            <><Wand2 size={16} /> Generate AI</>
          )}
        </button>
      </div>

      <div>
        <textarea
          value={summary}
          onChange={(e) => dispatch(updateField({ field: 'summary', value: e.target.value }))}
          rows="8"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-gray-700 leading-relaxed"
          placeholder="Write your professional summary here..."
        />
      </div>
    </div>
  );
}
