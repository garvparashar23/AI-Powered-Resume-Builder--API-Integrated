import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Users, FileText, Target, Zap, ShieldAlert, ArrowLeft } from 'lucide-react';
import { API_URL } from '../config';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      toast.error('Unauthorized access. Admins only.');
      navigate('/dashboard');
      return;
    }
    fetchMetrics();
  }, [user]);

  const fetchMetrics = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/metrics`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setData(res.data);
    } catch (error) {
      toast.error('Failed to load system metrics.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <header className="bg-slate-800 shadow-xl border-b border-slate-700 sticky top-0 z-10 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <button onClick={() => navigate('/dashboard')} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition">
              <ArrowLeft size={18} />
           </button>
           <ShieldAlert className="text-rose-500 w-6 h-6" />
           <h1 className="text-xl font-bold tracking-tight">SaaS Admin Control Center</h1>
        </div>
        <div className="flex items-center gap-3">
           <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {user?.role} Root
           </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-fadeIn flex flex-col gap-8">
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {!loading && data ? (
               <>
                  <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-lg flex items-center gap-4">
                     <div className="p-4 bg-blue-500/20 text-blue-400 rounded-xl"><Users size={24} /></div>
                     <div>
                        <p className="text-sm font-medium text-slate-400">Total Registered Users</p>
                        <h4 className="text-3xl font-bold text-white">{data.metrics.totalUsers}</h4>
                     </div>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-lg flex items-center gap-4">
                     <div className="p-4 bg-emerald-500/20 text-emerald-400 rounded-xl"><FileText size={24} /></div>
                     <div>
                        <p className="text-sm font-medium text-slate-400">Total Resumes Managed</p>
                        <h4 className="text-3xl font-bold text-white">{data.metrics.totalResumes}</h4>
                     </div>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-lg flex items-center gap-4">
                     <div className="p-4 bg-amber-500/20 text-amber-400 rounded-xl"><Target size={24} /></div>
                     <div>
                        <p className="text-sm font-medium text-slate-400">Global Avg ATS Score</p>
                        <div className="flex items-baseline gap-1">
                           <h4 className="text-3xl font-bold text-white">{data.metrics.avgAtsScore}</h4>
                           <span className="text-xs text-slate-500">/100</span>
                        </div>
                     </div>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-lg flex items-center gap-4">
                     <div className="p-4 bg-purple-500/20 text-purple-400 rounded-xl"><Zap size={24} /></div>
                     <div>
                        <p className="text-sm font-medium text-slate-400">Total API Tokens Used</p>
                        <h4 className="text-3xl font-bold text-white">{data.metrics.totalTokensUsed}</h4>
                     </div>
                  </div>
               </>
            ) : (
                [1,2,3,4].map(i => <div key={i} className="bg-slate-800 h-28 rounded-2xl animate-pulse"></div>)
            )}
         </div>

         <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden mt-4">
            <div className="px-6 py-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
               <h3 className="text-lg font-bold text-slate-200">Recent Users Stream</h3>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-widest px-6">
                        <th className="px-6 py-4 font-semibold">User Data</th>
                        <th className="px-6 py-4 font-semibold">Plan Tier</th>
                        <th className="px-6 py-4 font-semibold">AI Tokens</th>
                        <th className="px-6 py-4 font-semibold">Sign Up Date</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                     {loading ? (
                         <tr><td colSpan="4" className="text-center py-10 text-slate-500">Loading user data...</td></tr>
                     ) : (
                        data?.recentUsers?.map(u => (
                           <tr key={u._id} className="hover:bg-slate-700/30 transition">
                              <td className="px-6 py-4">
                                 <div className="font-bold text-slate-200">{u.name}</div>
                                 <div className="text-xs text-slate-500 lowercase">{u.email}</div>
                              </td>
                              <td className="px-6 py-4">
                                 <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${u.plan === 'pro' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-slate-700 text-slate-400'}`}>
                                    {u.plan}
                                 </span>
                              </td>
                              <td className="px-6 py-4 font-mono text-sm text-slate-300">{u.tokensUsed}</td>
                              <td className="px-6 py-4 text-sm text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>

      </main>
    </div>
  );
}
