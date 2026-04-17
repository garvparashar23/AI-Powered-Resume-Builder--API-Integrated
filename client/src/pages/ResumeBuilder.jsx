import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { updateField, setResumeData } from '../store/resumeSlice';
import html2pdf from 'html2pdf.js';
import { ArrowLeft, Save, Download, User, BookOpen, Briefcase, FolderGit2, Settings, Target } from 'lucide-react';
import { API_URL } from '../config';

/* Step Components */
import PersonalInfo from '../components/FormSteps/PersonalInfo';
import Education from '../components/FormSteps/Education';
import Experience from '../components/FormSteps/Experience';
import Projects from '../components/FormSteps/Projects';
import Skills from '../components/FormSteps/Skills';
import SummaryGenerator from '../components/FormSteps/SummaryGenerator';

/* Preview Component */
import PreviewManager from '../components/ResumePreview/PreviewManager';

export default function ResumeBuilder() {
  const { currentResume, currentStep } = useSelector((state) => state.resume);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { id: 1, name: 'Personal', icon: <User size={18} /> },
    { id: 2, name: 'Education', icon: <BookOpen size={18} /> },
    { id: 3, name: 'Experience', icon: <Briefcase size={18} /> },
    { id: 4, name: 'Projects', icon: <FolderGit2 size={18} /> },
    { id: 5, name: 'Skills', icon: <Settings size={18} /> },
    { id: 6, name: 'Summary', icon: <Target size={18} /> },
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      let res;
      if (currentResume._id) {
        // Update existing resume
        res = await axios.put(`${API_URL}/resumes/${currentResume._id}`, currentResume, {
          headers: { Authorization: `Bearer ${user?.token || ''}` }
        });
      } else {
        // Create new resume
        res = await axios.post(`${API_URL}/resumes`, currentResume, {
          headers: { Authorization: `Bearer ${user?.token || ''}` }
        });
        // Update local state with the saved DB item (which contains _id)
        if (res.data && res.data._id) {
          dispatch(setResumeData(res.data));
          // Optionally dynamically update the URL so a refresh keeps it to the same ID
          navigate(`/builder/${res.data._id}`, { replace: true });
        }
      }
      toast.success('Resume saved successfully!');
    } catch (error) {
      toast.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    const element = document.getElementById('resume-preview-container');
    const opt = {
      margin: 0,
      filename: `${currentResume.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left Sidebar Form */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col bg-white border-r border-gray-200 shadow-xl z-10">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="flex gap-2 items-center px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-medium transition">
              <Save size={16} /> {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={handleDownload} className="flex gap-2 items-center px-4 py-2 bg-primary text-white hover:bg-blue-600 rounded-lg font-medium transition shadow-md shadow-blue-500/20">
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex px-4 py-3 gap-1 overflow-x-auto bg-gray-50/50 border-b border-gray-100 hide-scrollbar">
          {steps.map(step => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex flex-col items-center min-w-[80px] p-2 rounded-lg transition-all ${activeStep === step.id ? 'bg-white shadow-sm text-primary border border-gray-200' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <div className={`mb-1 ${activeStep === step.id ? 'text-primary' : 'text-gray-400'}`}>
                {step.icon}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider">{step.name}</span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-xl mx-auto space-y-6">
            {activeStep === 1 && <PersonalInfo />}
            {activeStep === 2 && <Education />}
            {activeStep === 3 && <Experience />}
            {activeStep === 4 && <Projects />}
            {activeStep === 5 && <Skills />}
            {activeStep === 6 && <SummaryGenerator />}
          </div>
        </div>

      </div>

      {/* Right Sidebar Preview */}
      <div className="hidden lg:flex lg:flex-1 h-screen overflow-y-auto bg-slate-100 p-8 custom-scrollbar justify-center items-start">
        <div className="mt-4 pb-12 w-full max-w-[850px]">
          {/* Template Selector Tool */}
          <div className="flex justify-center gap-4 mb-6 sticky top-0 z-50 py-2">
             <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-200 flex gap-2">
                {['modern', 'minimal', 'professional'].map(t => (
                  <button 
                     key={t}
                     onClick={() => dispatch(updateField({ field: 'templateId', value: t }))}
                     className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${currentResume.templateId === t ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
          </div>
          
          {/* A4 Paper Container */}
          <div id="resume-preview-container" className="bg-white shadow-2xl rounded-sm w-full mx-auto min-h-[1100px] print:m-0 print:shadow-none overflow-hidden relative" style={{ width: '8.5in' }}>
            <PreviewManager data={currentResume} />
          </div>
        </div>
      </div>
    </div>
  );
}
