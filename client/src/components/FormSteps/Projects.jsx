import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../../store/resumeSlice';
import { Plus, Trash2, FolderGit2 as Github, Wand2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../config';

export default function Projects() {
  const { projects } = useSelector((state) => state.resume.currentResume);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [githubUser, setGithubUser] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    dispatch(updateField({
      field: 'projects',
      value: [...(projects || []), { title: '', link: '', description: '' }]
    }));
  };

  const handleChange = (index, field, value) => {
    const newProj = [...(projects || [])];
    newProj[index] = { ...newProj[index], [field]: value };
    dispatch(updateField({ field: 'projects', value: newProj }));
  };

  const handleRemove = (index) => {
    const newProj = projects.filter((_, i) => i !== index);
    dispatch(updateField({ field: 'projects', value: newProj }));
  };

  const handleGithubImport = async () => {
    if (!githubUser) {
      toast.error('Please enter a GitHub username');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/ai/github-import`, { username: githubUser }, {
        headers: { Authorization: `Bearer ${user?.token || ''}` }
      });
      const imported = res.data.projects || [];
      if (imported.length > 0) {
         dispatch(updateField({
           field: 'projects',
           value: [...(projects || []), ...imported]
         }));
         toast.success(`Imported ${imported.length} projects!`);
         setGithubUser('');
      } else {
         toast.error('No public repositories found.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to import from GitHub');
    } finally {
      setLoading(false);
    }
  };

  const [aiLoadingIdx, setAiLoadingIdx] = useState(null);

  const handleAiEnhance = async (index) => {
     const proj = projects[index];
     if (!proj.description) {
        toast.error('Write a brief synopsis first for the AI to enhance!');
        return;
     }
     setAiLoadingIdx(index);
     try {
       const res = await axios.post(`${API_URL}/ai/enhance-project`, 
          { title: proj.title, synopsis: proj.description },
          { headers: { Authorization: `Bearer ${user?.token || ''}` } }
       );
       handleChange(index, 'description', res.data.enhanced);
       toast.success('Project details enhanced with AI!');
     } catch (error) {
       toast.error(error.response?.data?.message || 'Failed to enhance project');
     } finally {
       setAiLoadingIdx(null);
     }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white sticky top-0 py-2 z-10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
          <p className="text-gray-500 text-sm mt-1">Add your key projects or import from GitHub.</p>
        </div>
        <div className="flex gap-2">
           <div className="flex bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
             <input 
               type="text" 
               value={githubUser}
               onChange={(e) => setGithubUser(e.target.value)}
               placeholder="GitHub User..." 
               className="px-3 py-1.5 text-sm bg-transparent outline-none w-32"
             />
             <button 
               onClick={handleGithubImport}
               disabled={loading}
               className="bg-gray-800 text-white px-3 py-1.5 flex items-center gap-1 hover:bg-gray-700 disabled:opacity-50 transition text-sm font-medium"
             >
               <Github size={14} /> {loading ? '...' : 'Import'}
             </button>
           </div>
           <button onClick={handleAdd} className="flex items-center gap-1 text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-100 transition border border-indigo-100">
             <Plus size={16} /> Add 
           </button>
        </div>
      </div>

      <div className="space-y-6">
        {projects?.map((proj, index) => (
          <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50 relative group">
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
            <div className="grid gap-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    placeholder="AI Resume Builder"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link (Optional)</label>
                  <input
                    type="text"
                    value={proj.link}
                    onChange={(e) => handleChange(index, 'link', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    placeholder="github.com/my-project"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                   <label className="block text-sm font-medium text-gray-700">Project Synopsis</label>
                   <button 
                      onClick={() => handleAiEnhance(index)}
                      disabled={aiLoadingIdx === index}
                      className="text-xs flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 transition bg-indigo-50 px-2 py-1 rounded-md"
                   >
                      <Wand2 size={12} /> {aiLoadingIdx === index ? 'Generating...' : 'AI Enhance into Bullet Points'}
                   </button>
                </div>
                <textarea
                  value={proj.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white resize-vertical text-sm leading-relaxed"
                  placeholder="Write a rough synopsis (1-2 sentences) and let AI rewrite it into professional bullet points..."
                />
              </div>
            </div>
          </div>
        ))}
        {(!projects || projects.length === 0) && (
          <div className="text-center py-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-gray-500">
            No project entries yet. Enter a GitHub username to quickly import your repositories.
          </div>
        )}
      </div>
    </div>
  );
}
