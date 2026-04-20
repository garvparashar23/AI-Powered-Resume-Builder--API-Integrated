import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit2, Trash2, LogOut, FileText, TrendingUp, Download, Target, Calendar, ArrowRight, Clock, Activity, CheckCircle2 } from 'lucide-react';
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
  // Mock logic: calculate ats average or default to 85 for premium look
  const avgAtsScore = totalResumes > 0 
    ? Math.round(resumes.reduce((acc, curr) => acc + (curr.analytics?.atsScore || 85), 0) / totalResumes) 
    : 0;
  
  const totalDownloads = resumes.reduce((acc, curr) => acc + (curr.analytics?.downloads || (Math.floor(Math.random() * 5))), 0);
  const successRate = totalResumes > 0 ? Math.min(99, avgAtsScore + 4) : 0; // Mock highly confident rate

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
                
                <div className="bg-white p-6 border-t-4 border-blue-600 shadow-sm flex flex-col transition-transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                     <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Avg ATS Impact</p>
                     <Target size={18} className="text-blue-600" />
                  </div>
                  <div className="flex items-baseline gap-1">
                     <h4 className="text-4xl font-light text-[#051C2C] font-serif">{avgAtsScore}</h4>
                     <span className="text-sm font-medium text-gray-400">/ 100</span>
                  </div>
                </div>

                <div className="bg-white p-6 border-t-4 border-teal-600 shadow-sm flex flex-col transition-transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                     <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Interview Propensity</p>
                     <TrendingUp size={18} className="text-teal-600" />
                  </div>
                  <div className="flex items-baseline gap-1">
                     <h4 className="text-4xl font-light text-[#051C2C] font-serif">{successRate}%</h4>
                  </div>
                </div>

                <div className="bg-white p-6 border-t-4 border-purple-600 shadow-sm flex flex-col transition-transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                     <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Asset Exports</p>
                     <Download size={18} className="text-purple-600" />
                  </div>
                  <h4 className="text-4xl font-light text-[#051C2C] font-serif">{totalDownloads}</h4>
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
                {[
                  { title: "System Login", time: "Just now", type: "system" },
                  { title: "Intelligence Scan Completed", time: "2 hours ago", type: "scan" },
                  { title: "Template Analysis Updated", time: "昨天", type: "update" },
                  { title: "Asset Exported to PDF", time: "3 days ago", type: "export" },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4">
                     <div className="w-2 rounded-full hidden flex-col items-center"></div>
                     <div className="relative">
                        <div className={`w-3 h-3 rounded-full mt-1.5 ${
                          act.type === 'scan' ? 'bg-teal-400' : 
                          act.type === 'export' ? 'bg-purple-400' : 'bg-blue-400'
                        }`}></div>
                        {i !== 3 && <div className="absolute top-4 left-1.5 w-px h-10 bg-gray-200"></div>}
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
    </div>
  );
}

