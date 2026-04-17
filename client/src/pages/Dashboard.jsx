import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit2, Trash2, LogOut, FileText } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="text-primary w-6 h-6" />
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">Hello, {user.name}</span>
            <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-red-500 transition">
              <LogOut size={20} className="mr-1" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Your Resumes</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <button 
              onClick={createNewResume}
              className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-blue-50 transition-colors group"
            >
              <div className="p-4 bg-white rounded-full group-hover:scale-110 transition-transform mb-3 shadow-sm">
                <Plus className="text-primary w-8 h-8" />
              </div>
              <span className="text-gray-600 font-medium border-b border-transparent group-hover:border-primary">Create New Resume</span>
            </button>

            {resumes.map(resume => (
              <div key={resume._id} className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative p-4">
                  <FileText className="text-gray-400 w-12 h-12 opacity-50" />
                  <span className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded text-xs font-semibold text-gray-600 uppercase shadow-sm">
                    {resume.templateId}
                  </span>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg truncate mb-1">
                      {resume.name || 'Untitled Resume'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Modified: {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => editResume(resume)}
                      className="flex-1 flex justify-center items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded font-medium transition"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button 
                      onClick={() => deleteResume(resume._id)}
                      className="flex-1 flex justify-center items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded font-medium transition"
                    >
                      <Trash2 size={16} /> Delete
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
