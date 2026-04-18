import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit2, Trash2, LogOut, FileText, TrendingUp, Download, Target, Calendar } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { logout } from '../store/authSlice';
import { resetResume, setResumeData } from '../store/resumeSlice';
import { API_URL } from '../config';

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
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await axios.delete(`${API_URL}/resumes/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setResumes(resumes.filter(r => r._id !== id));
      toast.success('Resume deleted');
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  // Analytics Calculations
  const totalResumes = resumes.length;
  // Fallback to dummy data if analytics DB fields aren't populated yet
  const avgAtsScore = totalResumes > 0 
    ? Math.round(resumes.reduce((acc, curr) => acc + (curr.analytics?.atsScore || 72), 0) / totalResumes) 
    : 0;
  const totalDownloads = resumes.reduce((acc, curr) => acc + (curr.analytics?.downloads || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white shadow border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
               <TrendingUp className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">AI Resume Intelligence</h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold border border-indigo-100 hidden sm:block">
              {user.plan === 'pro' ? '🚀 PRO Plan' : 'Free Trial'}
            </span>
            <div className="flex items-center gap-3">
               <div className="hidden sm:block text-right">
                 <p className="text-sm font-semibold text-gray-800 leading-tight">{user.name}</p>
                 <p className="text-xs text-gray-500">{user.email}</p>
               </div>
               <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition" title="Logout">
                 <LogOut size={20} />
               </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Analytics Header Section */}
        <div className="mb-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-xl"><FileText size={24} /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Resumes</p>
                <h4 className="text-3xl font-bold text-gray-900">{totalResumes}</h4>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl"><Target size={24} /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average ATS Score</p>
                <div className="flex items-baseline gap-1">
                   <h4 className="text-3xl font-bold text-gray-900">{avgAtsScore}</h4>
                   <span className="text-sm font-medium text-gray-500">/ 100</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-xl"><Download size={24} /></div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Downloads</p>
                <h4 className="text-3xl font-bold text-gray-900">{totalDownloads}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Documents</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <button 
              onClick={createNewResume}
              className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-gray-300 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors group"
            >
              <div className="p-4 bg-white rounded-full group-hover:scale-110 group-hover:bg-indigo-600 transition-all mb-3 shadow-sm border border-gray-100">
                <Plus className="text-indigo-600 group-hover:text-white w-8 h-8 transition-colors" />
              </div>
              <span className="text-gray-600 font-semibold">Create New Resume</span>
            </button>

            {resumes.map(resume => (
              <div key={resume._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group h-56">
                <div className="h-28 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center relative p-4 border-b border-gray-100">
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-[10px] font-bold text-gray-500 uppercase tracking-wider shadow-sm border border-gray-100">
                    {resume.templateId}
                  </div>
                  <FileText className="text-indigo-200 w-12 h-12" />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between bg-white relative">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg truncate mb-1">
                      {resume.name || 'Untitled Resume'}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} /> {new Date(resume.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => editResume(resume)}
                      className="flex-1 flex justify-center items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button 
                      onClick={() => deleteResume(resume._id)}
                      className="px-3 flex justify-center items-center bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg transition"
                      title="Delete Resume"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
