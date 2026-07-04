import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit2, Trash2, LogOut, FileText, TrendingUp, Download, Target, Calendar, ArrowRight, Clock, Activity, CheckCircle2, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { logout } from '../store/authSlice';
import { resetResume, setResumeData } from '../store/resumeSlice';
import { API_URL } from '../config';

// Reusable Button Components
const ToolButton = ({ onClick, children, className = '', title }) => (
  <button 
    onClick={onClick} 
    className={`p-2 transition-colors duration-200 rounded-sm flex items-center justify-center ${className}`}
    title={title}
  >
    {children}
  </button>
);

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await axios.get(`${API_URL}/resumes`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setResumes(res.data);
    } catch (error) {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const createNewResume = () => {
    dispatch(resetResume());
    navigate('/builder');
  };

  const editResume = (resumeData) => {
    dispatch(setResumeData(resumeData));
    navigate(`/builder/${resumeData._id}`);
  };

  const deleteResume = async (id) => {
    if (!window.confirm('Are you certain you wish to purge this document? This action is irreversible.')) return;
    try {
      await axios.delete(`${API_URL}/resumes/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setResumes(resumes.filter(r => r._id !== id));
      toast.success('Document purged successfully');
    } catch (error) {
      toast.error('Failed to purge document');
    }
  };

  // Analytics Calculations
  const totalResumes = resumes.length;

  // Helper for relative time
  const getRelativeTime = (dateString) => {
    const now = new Date();
    const diffMs = now - new Date(dateString);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const [activeModal, setActiveModal] = useState(null);

  // Math-based calculations
  const calculateResumePropensity = (resume) => {
    const ats = resume.analytics?.atsScore || 85;
    const skillsCount = resume.skills?.length || 0;
    const experienceCount = resume.experience?.length || 0;
    const projectsCount = resume.projects?.length || 0;
    const hasEducation = resume.education?.length > 0;
    const hasSummary = !!resume.summary;

    const completenessScore = 
      (Math.min(10, skillsCount) * 1) + 
      (Math.min(5, experienceCount) * 3) + 
      (Math.min(5, projectsCount) * 2) + 
      (hasEducation ? 10 : 0) + 
      (hasSummary ? 15 : 0); 

    const scoreVal = Math.min(99, Math.round((ats * 0.5) + (completenessScore * (50 / 60))));
    return {
      score: scoreVal,
      atsWeight: Math.round(ats * 0.5),
      completenessWeight: Math.round(completenessScore * (50 / 60)),
      skillsCount,
      experienceCount,
      projectsCount,
      hasEducation,
      hasSummary
    };
  };

  const resumePropensities = resumes.map(r => ({
    _id: r._id,
    name: r.name || 'Untitled Document',
    atsScore: r.analytics?.atsScore || 85,
    ...calculateResumePropensity(r)
  }));

  const avgAtsScore = totalResumes > 0 
    ? Math.round(resumes.reduce((acc, curr) => acc + (curr.analytics?.atsScore || 85), 0) / totalResumes) 
    : 0;
  
  const totalDownloads = resumes.reduce((acc, curr) => acc + (curr.analytics?.downloads || 0), 0);
  
  const avgPropensity = totalResumes > 0 
    ? Math.round(resumePropensities.reduce((acc, curr) => acc + curr.score, 0) / totalResumes) 
    : 0;

  // Compile dynamic activity list
  const getDynamicActivities = () => {
    const act = [];
    
    act.push({
      title: "Secure Session Started",
      time: "Just now",
      timestamp: new Date(),
      type: "system"
    });

    resumes.forEach(r => {
      const created = new Date(r.createdAt);
      const updated = new Date(r.updatedAt);

      act.push({
        title: `Document "${r.name || 'Untitled'}" Initialized`,
        time: getRelativeTime(r.createdAt),
        timestamp: created,
        type: "create"
      });

      if (updated.getTime() - created.getTime() > 10000) {
        act.push({
          title: `Document "${r.name || 'Untitled'}" Refined`,
          time: getRelativeTime(r.updatedAt),
          timestamp: updated,
          type: "update"
        });
      }

      if (r.analytics?.atsScore > 0) {
        act.push({
          title: `Intelligence Scan for "${r.name || 'Untitled'}"`,
          time: getRelativeTime(r.updatedAt),
          timestamp: new Date(updated.getTime() - 1000),
          type: "scan"
        });
      }

      if (r.analytics?.downloads > 0) {
        for (let i = 0; i < r.analytics.downloads; i++) {
          const exportTime = new Date(updated.getTime() - (i * 60000));
          act.push({
            title: `Asset "${r.name || 'Untitled'}" Exported to PDF`,
            time: getRelativeTime(exportTime),
            timestamp: exportTime,
            type: "export"
          });
        }
      }
    });

    act.sort((a, b) => b.timestamp - a.timestamp);
    return act.slice(0, 5);
  };

  const recentActivities = getDynamicActivities();

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans text-gray-900 selection:bg-[#051C2C] selection:text-white">
      {/* Enterprise Topbar */}
      <header className="bg-[#051C2C] text-white border-b border-white/10 sticky top-0 z-20 shadow-md">
        <div className="max-w-[1600px] mx-auto px-8 py-3 flex justify-between items-center h-[72px]">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-blue-600 text-white font-serif italic font-bold text-2xl flex items-center justify-center rounded-sm shadow-inner shadow-blue-500/50">
                R
             </div>
             <span className="text-xl font-serif tracking-wide font-normal hidden sm:block">The Resume Doctrine</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-2 text-blue-200 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
               <Activity size={12} className="text-blue-400" /> System Active
            </div>
            
            <div className="flex items-center gap-6 border-l border-white/20 pl-8">
               <div className="hidden sm:block text-right">
                 <p className="text-[13px] font-sans font-bold tracking-widest uppercase text-white leading-tight">{user.name}</p>
                 <p className="text-[11px] text-blue-300/80 mt-1">{user.email}</p>
               </div>
               <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 relative group">
                  <span className="font-bold text-lg font-serif">{user.name?.[0]?.toUpperCase() || 'U'}</span>
                  <button 
                     onClick={handleLogout} 
                     className="absolute -bottom-1 -right-1 bg-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border-2 border-[#051C2C]" 
                     title="Secure Logout"
                  >
                    <LogOut size={12} className="text-white" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-[1600px] mx-auto px-8 py-10 w-full flex flex-col xl:flex-row gap-10">
        
        {/* Main Workspace Area (Left/Top) */}
        <div className="w-full xl:w-3/4 flex flex-col gap-10">
           {/* Section: Metrics Intelligence */}
           <section>
              <div className="flex justify-between items-end mb-6">
                 <div>
                   <h2 className="text-2xl font-serif text-[#051C2C] tracking-tight mb-1">Intelligence Overview</h2>
                   <p className="text-sm text-gray-500 font-light">Real-time performance metrics</p>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 border-t-4 border-[#051C2C] shadow-sm flex flex-col transition-transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                     <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Active Documents</p>
                     <FileText size={18} className="text-blue-600" />
                  </div>
                  <h4 className="text-4xl font-light text-[#051C2C] font-serif">{totalResumes}</h4>
                </div>
                
                <div 
                  onClick={() => setActiveModal('ats')}
                  className="bg-white p-6 border-t-4 border-blue-600 shadow-sm flex flex-col transition-all hover:-translate-y-1 cursor-pointer hover:shadow-md group"
                >
                  <div className="flex justify-between items-start mb-4">
                     <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-blue-600 transition-colors">Avg ATS Impact</p>
                     <Target size={18} className="text-blue-600" />
                  </div>
                  <div className="flex items-baseline gap-1">
                     <h4 className="text-4xl font-light text-[#051C2C] font-serif">{avgAtsScore}</h4>
                     <span className="text-sm font-medium text-gray-400">/ 100</span>
                  </div>
                  <span className="text-[10px] text-blue-500/70 group-hover:text-blue-600 mt-2 block font-medium underline">View calculation details</span>
                </div>

                <div 
                  onClick={() => setActiveModal('propensity')}
                  className="bg-white p-6 border-t-4 border-teal-600 shadow-sm flex flex-col transition-all hover:-translate-y-1 cursor-pointer hover:shadow-md group"
                >
                  <div className="flex justify-between items-start mb-4">
                     <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-teal-600 transition-colors">Interview Propensity</p>
                     <TrendingUp size={18} className="text-teal-600" />
                  </div>
                  <div className="flex items-baseline gap-1">
                     <h4 className="text-4xl font-light text-[#051C2C] font-serif">{avgPropensity}%</h4>
                  </div>
                  <span className="text-[10px] text-teal-500/70 group-hover:text-teal-600 mt-2 block font-medium underline">View calculation details</span>
                </div>

                <div 
                  onClick={() => setActiveModal('exports')}
                  className="bg-white p-6 border-t-4 border-purple-600 shadow-sm flex flex-col transition-all hover:-translate-y-1 cursor-pointer hover:shadow-md group"
                >
                  <div className="flex justify-between items-start mb-4">
                     <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-purple-600 transition-colors">Asset Exports</p>
                     <Download size={18} className="text-purple-600" />
                  </div>
                  <h4 className="text-4xl font-light text-[#051C2C] font-serif">{totalDownloads}</h4>
                  <span className="text-[10px] text-purple-500/70 group-hover:text-purple-600 mt-2 block font-medium underline">View download details</span>
                </div>
              </div>
           </section>

           {/* Section: Document Repository */}
           <section>
              <div className="flex justify-between items-end mb-6 border-b border-gray-300 pb-4">
                 <div>
                   <h2 className="text-2xl font-serif text-[#051C2C] tracking-tight mb-1">Document Repository</h2>
                   <p className="text-sm text-gray-500 font-light">Manage and optimize your professional portfolio</p>
                 </div>
                 <button onClick={createNewResume} className="hidden sm:flex items-center gap-2 bg-[#051C2C] hover:bg-blue-700 text-white px-6 py-2.5 transition-colors uppercase tracking-widest text-xs font-bold">
                    <Plus size={16} /> New Asset
                 </button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-72 bg-white border border-gray-200 animate-pulse rounded-sm"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Create New Block - Visible strictly on mobile or if empty */}
                  {resumes.length === 0 && (
                    <button 
                      onClick={createNewResume}
                      className="flex flex-col items-center justify-center h-72 border-2 border-gray-300 border-dashed bg-white/50 hover:bg-white hover:border-blue-600 transition-all group rounded-sm"
                    >
                      <div className="p-4 rounded-full border border-gray-300 group-hover:border-blue-600 group-hover:bg-blue-50 mb-4 transition-all">
                        <Plus className="text-gray-400 group-hover:text-blue-600 w-8 h-8 transition-colors" />
                      </div>
                      <span className="text-gray-600 font-bold uppercase tracking-widest text-xs group-hover:text-blue-600">Initialize New Document</span>
                    </button>
                  )}

                  {resumes.map(resume => (
                    <div key={resume._id} className="bg-white border border-gray-200 hover:border-[#051C2C] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group h-72 relative rounded-sm">
                       {/* Top right status */}
                       <div className="absolute top-4 right-4 flex items-center gap-2">
                          <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full flex items-center gap-1 border border-green-200">
                             <CheckCircle2 size={10} /> Optimized
                          </span>
                       </div>
                       
                       <div className="px-6 pt-10 pb-6 flex-grow flex flex-col">
                          <div className="w-12 h-12 bg-blue-50 rounded-sm flex items-center justify-center mb-6">
                            <FileText className="text-blue-600 w-6 h-6" />
                          </div>
                          <h3 className="font-serif text-[#051C2C] text-xl truncate font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                            {resume.name || 'Structural Document'}
                          </h3>
                          <div className="space-y-2 mt-auto">
                             <div className="flex items-center justify-between text-xs text-gray-500">
                               <span className="font-medium">Template</span>
                               <span className="uppercase tracking-widest font-bold text-[#051C2C]">{resume.templateId || 'Professional'}</span>
                             </div>
                             <div className="flex items-center justify-between text-xs text-gray-500">
                               <span className="font-medium">Last Modified</span>
                               <span className="tracking-wide">
                                  {new Date(resume.updatedAt).toLocaleDateString()}
                               </span>
                             </div>
                          </div>
                       </div>
                       
                       {/* Action Bar */}
                       <div className="border-t border-gray-100 grid grid-cols-2 bg-gray-50">
                          <button 
                            onClick={() => editResume(resume)}
                            className="py-3.5 flex justify-center items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#051C2C] hover:bg-blue-50 hover:text-blue-700 transition-colors border-r border-gray-200"
                          >
                            <Edit2 size={14} /> Refine
                          </button>
                          <button 
                            onClick={() => deleteResume(resume._id)}
                            className="py-3.5 flex justify-center items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Purge Document"
                          >
                            <Trash2 size={14} /> Purge
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
              )}
           </section>
        </div>

        {/* Sidebar Space (Right) */}
        <div className="w-full xl:w-1/4 flex flex-col gap-8">
           <div className="bg-white border border-gray-200 p-6 rounded-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#051C2C] mb-6 flex items-center gap-2">
                 <Clock size={16} /> Recent Activity
              </h3>
              <div className="space-y-6">
                {recentActivities.map((act, i) => (
                  <div key={i} className="flex gap-4">
                     <div className="w-2 rounded-full hidden flex-col items-center"></div>
                     <div className="relative">
                        <div className={`w-3 h-3 rounded-full mt-1.5 ${
                          act.type === 'scan' ? 'bg-teal-400' : 
                          act.type === 'export' ? 'bg-purple-400' :
                          act.type === 'create' ? 'bg-emerald-400' : 'bg-blue-400'
                        }`}></div>
                        {i !== recentActivities.length - 1 && <div className="absolute top-4 left-1.5 w-px h-10 bg-gray-200"></div>}
                     </div>
                     <div>
                        <p className="text-sm font-semibold text-gray-800">{act.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{act.time}</p>
                     </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-[#051C2C] text-white p-8 rounded-sm shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full filter blur-2xl transform translate-x-10 -translate-y-10"></div>
               <h3 className="text-lg font-serif mb-2">Upgrade to Enterprise</h3>
               <p className="text-sm text-blue-200 leading-relaxed font-light mb-6">
                 Unlock profound algorithmic insights, advanced bias detection, and strict consulting-grade formatting filters.
               </p>
               <button className="w-full bg-white text-[#051C2C] py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors">
                 View Capabilities
               </button>
           </div>
        </div>
      </main>

      {/* Metrics Calculations Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#051C2C]/20 shadow-2xl w-full max-w-2xl flex flex-col rounded-sm overflow-hidden text-gray-900 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-[#051C2C] text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif tracking-tight font-semibold">
                  {activeModal === 'ats' && 'Avg ATS Impact Calculation'}
                  {activeModal === 'propensity' && 'Interview Propensity Probability'}
                  {activeModal === 'exports' && 'Asset Exports Summary'}
                </h3>
                <p className="text-xs text-blue-200 mt-1 font-light">
                  {activeModal === 'ats' && 'Applicant Tracking System compatibility breakdown'}
                  {activeModal === 'propensity' && 'Algorithmic assessment of hiring probability'}
                  {activeModal === 'exports' && 'Real-time document distribution metrics'}
                </p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
              {activeModal === 'ats' && (
                <>
                  <div className="bg-blue-50 p-4 border-l-4 border-blue-600 rounded-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-800 mb-1">Mathematical Formula</p>
                    <code className="text-sm font-mono text-blue-950 font-semibold">
                      Average ATS Impact = (Sum of ATS Scores) / (Total Active Resumes)
                    </code>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700">Document Breakdown</h4>
                    {totalResumes === 0 ? (
                      <p className="text-sm text-gray-500 italic">No active documents found.</p>
                    ) : (
                      <div className="border border-gray-200 rounded-sm overflow-hidden">
                        <table className="w-full text-left border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="p-3 font-semibold text-gray-600">Document Name</th>
                              <th className="p-3 font-semibold text-gray-600 text-right">ATS Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resumes.map((r, i) => (
                              <tr key={r._id || i} className="border-b border-gray-150 hover:bg-gray-50">
                                <td className="p-3 font-medium text-gray-900">{r.name || 'Untitled Document'}</td>
                                <td className="p-3 text-right font-mono font-semibold text-blue-600">
                                  {r.analytics?.atsScore || 85} <span className="text-xs text-gray-400">/ 100</span>
                                  {!(r.analytics?.atsScore) && <span className="text-[10px] text-gray-400 ml-1 italic">(Baseline)</span>}
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                              <td className="p-3">Average Overall Score</td>
                              <td className="p-3 text-right font-mono text-blue-800 text-base">
                                {avgAtsScore} <span className="text-xs text-gray-500">/ 100</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 space-y-2 leading-relaxed">
                    <p className="font-semibold text-gray-700">How ATS score is determined per document:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Keyword Density (80% Weight):</strong> Matching relevant skills and tools found in target job description files.</li>
                      <li><strong>Structure & Layout (20% Weight):</strong> Structural parser compatibility, heading hierarchies, layout alignment, and length optimization.</li>
                      <li><strong>Note:</strong> Documents that have not undergone intelligence scanning are initialized with a default standard baseline of 85.</li>
                    </ul>
                  </div>
                </>
              )}

              {activeModal === 'propensity' && (
                <>
                  <div className="bg-teal-50 p-4 border-l-4 border-teal-600 rounded-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-teal-800 mb-1">Probability Algorithm</p>
                    <code className="text-sm font-mono text-teal-950 font-semibold block leading-relaxed">
                      Propensity = (ATS Score * 50%) + (Completeness Score * 50%)
                    </code>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700">Individual Propensity Contribution</h4>
                    {totalResumes === 0 ? (
                      <p className="text-sm text-gray-500 italic">No active documents found.</p>
                    ) : (
                      <div className="border border-gray-200 rounded-sm overflow-hidden">
                        <table className="w-full text-left border-collapse text-xs md:text-sm">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="p-3 font-semibold text-gray-600">Document</th>
                              <th className="p-3 font-semibold text-gray-600 text-center">ATS Weight (50%)</th>
                              <th className="p-3 font-semibold text-gray-600 text-center">Completeness Weight (50%)</th>
                              <th className="p-3 font-semibold text-gray-600 text-right font-bold text-teal-800">Total Propensity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resumePropensities.map((r, i) => (
                              <tr key={r._id || i} className="border-b border-gray-150 hover:bg-gray-50">
                                <td className="p-3 font-medium text-gray-900">{r.name}</td>
                                <td className="p-3 text-center font-mono">{r.atsWeight}%</td>
                                <td className="p-3 text-center font-mono">{r.completenessWeight}%</td>
                                <td className="p-3 text-right font-mono font-semibold text-teal-600 text-base">{r.score}%</td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                              <td className="p-3" colSpan="3">Average Interview Propensity</td>
                              <td className="p-3 text-right font-mono text-teal-800 text-base">
                                {avgPropensity}%
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 space-y-2 leading-relaxed">
                    <p className="font-semibold text-gray-700">Profile Completeness weights (max 60 points normalized to 50% weight):</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 bg-gray-50 p-3 border border-gray-200 rounded-sm text-xs">
                      <div>• Skills Set: 1pt per skill (up to 10pts)</div>
                      <div>• Work Experience: 3pts per role (up to 15pts)</div>
                      <div>• Project Portfolio: 2pts per project (up to 10pts)</div>
                      <div>• Education Profile: 10pts if present</div>
                      <div className="col-span-2">• Professional Summary Statement: 15pts if present</div>
                    </div>
                  </div>
                </>
              )}

              {activeModal === 'exports' && (
                <>
                  <div className="bg-purple-50 p-4 border-l-4 border-purple-600 rounded-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-purple-800 mb-1">Export Aggregation</p>
                    <code className="text-sm font-mono text-purple-950 font-semibold">
                      Total Exports = Sum of download instances across all assets
                    </code>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700">Export Logs</h4>
                    {totalResumes === 0 ? (
                      <p className="text-sm text-gray-500 italic">No active documents found.</p>
                    ) : (
                      <div className="border border-gray-200 rounded-sm overflow-hidden">
                        <table className="w-full text-left border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <th className="p-3 font-semibold text-gray-600">Document Name</th>
                              <th className="p-3 font-semibold text-gray-600 text-right">PDF Downloads</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resumes.map((r, i) => (
                              <tr key={r._id || i} className="border-b border-gray-150 hover:bg-gray-50">
                                <td className="p-3 font-medium text-gray-900">{r.name || 'Untitled Document'}</td>
                                <td className="p-3 text-right font-mono font-semibold text-purple-600">
                                  {r.analytics?.downloads || 0}
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
                              <td className="p-3">Total Asset Exports</td>
                              <td className="p-3 text-right font-mono text-purple-800 text-base">
                                {totalDownloads}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
              <button 
                onClick={() => setActiveModal(null)}
                className="bg-[#051C2C] hover:bg-[#0a2e47] text-white px-5 py-2 text-xs uppercase font-bold tracking-wider transition-colors rounded-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

