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
  const [tone, setTone] = useState('corporate');
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
        `${API_URL}/ai/tools/generate-summary`,
        { role, tone, skills, experience, education },
        { headers: { Authorization: `Bearer ${user?.token || ''}` } }
      );
      dispatch(updateField({ field: 'summary', value: res.data.summary }));
      toast.success(`AI Summary Generated in ${tone} tone!`);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to generate summary');
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
          `${API_URL}/ai/tools/market-intel`,
          { role, skills },
          { headers: { Authorization: `Bearer ${user?.token || ''}` } }
      );
      setMarketIntel(res.data);
    } catch (error) {
       toast.error(error.response?.data?.message || 'Could not fetch market intelligence');
    } finally {
       setIntelLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-serif text-[#051C2C] mb-2 tracking-wide">Professional Summary</h2>
        <p className="text-gray-500 text-sm font-light leading-relaxed">
          Write a concise summary or execute our AI models to generate a high-impact, professional summary targeted to your specific market role.
        </p>
      </div>

      <div className="bg-slate-50 p-6 border border-gray-200 flex flex-col gap-5">
        
        <div className="flex flex-col sm:flex-row gap-5 items-end">
          <div className="w-full">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-[#051C2C] mb-2">Target Market Role</label>
            <div className="flex gap-2">
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-sm focus:border-[#051C2C] outline-none transition bg-white text-sm"
                  placeholder="e.g. Senior Frontend Developer"
                />
                <button
                  onClick={fetchMarketIntel}
                  disabled={intelLoading}
                  className="bg-white text-[#051C2C] border border-[#051C2C] hover:bg-[#051C2C] hover:text-white px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-widest transition flex items-center justify-center min-w-[120px]"
                >
                  {intelLoading ? 'Fetching...' : 'Query Intel'}
                </button>
            </div>
          </div>
          <div className="w-full sm:w-1/3">
             <label className="block text-[11px] font-bold uppercase tracking-widest text-[#051C2C] mb-2">Tone Directive</label>
             <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:border-[#051C2C] outline-none transition bg-white text-sm"
             >
                <option value="corporate">Corporate & Formal</option>
                <option value="modern">Modern & Balanced</option>
                <option value="startup">Startup & Dynamic</option>
                <option value="research">Research & Academic</option>
             </select>
          </div>
        </div>
        
        {marketIntel && (
           <div className="mt-2 bg-white border border-gray-200 p-5 rounded-sm shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-gray-700 font-light">
                    <DollarSign size={16} className="text-[#051C2C]" /> 
                    <span><strong className="text-gray-900 font-bold uppercase text-[10px] tracking-widest">Est. Salary:</strong> {marketIntel.careerPath.estimatedSalary}</span>
                 </div>
                 <div className="flex items-center gap-3 text-gray-700 font-light">
                    <TrendingUp size={16} className="text-[#051C2C]" /> 
                    <span><strong className="text-gray-900 font-bold uppercase text-[10px] tracking-widest">Market Trend:</strong> {marketIntel.careerPath.marketTrend}</span>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-gray-700 font-light">
                    <Map size={16} className="text-[#051C2C]" /> 
                    <span><strong className="text-gray-900 font-bold uppercase text-[10px] tracking-widest">Next Step:</strong> {marketIntel.careerPath.predictedNextRole}</span>
                 </div>
                 <div className="flex items-start gap-3 text-gray-700 font-light">
                    <Lightbulb size={16} className="text-[#051C2C] mt-0.5 flex-shrink-0" />
                    <span><strong className="text-gray-900 font-bold uppercase text-[10px] tracking-widest text-wrap">Target Skills:</strong> <br/>{marketIntel.skillRoadmap.highlyDemandedMissingSkills.length > 0 ? marketIntel.skillRoadmap.highlyDemandedMissingSkills.join(', ') : 'Optimal skill matrix attained.'}</span>
                 </div>
              </div>
           </div>
        )}

        <div className="flex justify-end mt-2">
          <button
            onClick={generateAI}
            disabled={loading}
            className="flex items-center justify-center gap-3 bg-[#051C2C] hover:bg-gray-900 text-white px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition disabled:opacity-75 whitespace-nowrap"
          >
            {loading ? (
               <span className="flex items-center gap-3">
                 <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> 
                 Synthesizing...
               </span>
            ) : (
              <><Wand2 size={14} /> Execute Professional AI Summary</>
            )}
          </button>
        </div>
      </div>

      <div>
        <textarea
          value={summary}
          onChange={(e) => dispatch(updateField({ field: 'summary', value: e.target.value }))}
          rows="10"
          className="w-full px-5 py-4 border border-gray-300 rounded-sm focus:border-[#051C2C] outline-none transition bg-white text-gray-800 text-[13px] leading-loose font-sans resize-y"
          placeholder="Generated summary will aggressively highlight your competencies and architectural impact metrics here..."
        />
      </div>
    </div>
  );
}
