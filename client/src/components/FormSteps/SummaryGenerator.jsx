import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../../store/resumeSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Wand2, TrendingUp, DollarSign, Map, Lightbulb } from 'lucide-react';
import { API_URL } from '../../config';

export default function SummaryGenerator() {
  const { summary, skills, experience, education } = useSelector((state) => state.resume.currentResume);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [role, setRole] = useState('');
  const [tone, setTone] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [intelLoading, setIntelLoading] = useState(false);
  const [marketIntel, setMarketIntel] = useState(null);

  const generateAI = async () => {
    if (!role) {
      toast.error('Please enter a target role/job title first');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/ai/generate-summary`,
        { role, tone, skills, experience, education },
        { headers: { Authorization: `Bearer ${user?.token || ''}` } }
      );
      dispatch(updateField({ field: 'summary', value: res.data.summary }));
      toast.success(`AI Summary Generated in ${tone} tone!`);
    } catch (error) {
      toast.error('Failed to generate summary');
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketIntel = async () => {
    if (!role) {
      toast.error('Please enter a target role to get insights');
      return;
    }
    setIntelLoading(true);
    try {
      const res = await axios.post(
          `${API_URL}/ai/market-intel`,
          { role, skills },
          { headers: { Authorization: `Bearer ${user?.token || ''}` } }
      );
      setMarketIntel(res.data);
    } catch (error) {
       toast.error('Could not fetch market intelligence');
    } finally {
       setIntelLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Professional Summary & Market Intel</h2>
        <p className="text-gray-500 text-sm mt-1">Write a short summary or let AI do it for you using Advanced Prompting.</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100 flex flex-col gap-4 relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row gap-4 items-end z-10 relative">
          <div className="w-full">
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Target Job Role <span className="font-normal text-indigo-500">(for AI & Insights)</span></label>
            <div className="flex gap-2">
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition bg-white"
                  placeholder="e.g. Senior Frontend Developer"
                />
                <button
                  onClick={fetchMarketIntel}
                  disabled={intelLoading}
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-2 rounded-lg font-medium transition text-sm flex items-center justify-center min-w-[120px]"
                >
                  {intelLoading ? 'Fetching...' : 'Get Intel'}
                </button>
            </div>
          </div>
          <div className="w-full sm:w-1/3">
             <label className="block text-sm font-semibold text-indigo-900 mb-1">Tone Style</label>
             <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition bg-white"
             >
                <option value="modern">Modern & Balanced</option>
                <option value="corporate">Corporate & Formal</option>
                <option value="startup">Startup & Dynamic</option>
                <option value="research">Research & Academic</option>
             </select>
          </div>
        </div>
        
        {marketIntel && (
           <div className="mt-4 bg-white/80 backdrop-blur border border-indigo-100 p-4 rounded-xl shadow-sm z-10 relative animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                 <div className="flex items-center gap-2 text-gray-700"><DollarSign size={16} className="text-emerald-500" /> <strong>Est. Salary:</strong> {marketIntel.careerPath.estimatedSalary}</div>
                 <div className="flex items-center gap-2 text-gray-700"><TrendingUp size={16} className="text-blue-500" /> <strong>Market Trend:</strong> {marketIntel.careerPath.marketTrend}</div>
              </div>
              <div className="space-y-3">
                 <div className="flex items-center gap-2 text-gray-700"><Map size={16} className="text-purple-500" /> <strong>Next Step:</strong> {marketIntel.careerPath.predictedNextRole}</div>
                 <div className="flex items-start gap-2 text-gray-700">
                    <Lightbulb size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                    <span><strong>Recommended Skills to Learn:</strong> {marketIntel.skillRoadmap.highlyDemandedMissingSkills.length > 0 ? marketIntel.skillRoadmap.highlyDemandedMissingSkills.join(', ') : 'You have all trending skills covered!'}</span>
                 </div>
              </div>
           </div>
        )}

        <div className="flex justify-end mt-2 z-10 relative">
          <button
            onClick={generateAI}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow-md shadow-blue-500/30 transition disabled:opacity-75 whitespace-nowrap"
          >
            {loading ? (
               <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Generating...</span>
            ) : (
              <><Wand2 size={16} /> Generate AI Summary</>
            )}
          </button>
        </div>
        <TrendingUp className="absolute -right-8 -bottom-8 text-indigo-500/10 w-48 h-48 z-0 pointer-events-none" />
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
