import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { updateField, setResumeData } from '../store/resumeSlice';
import html2pdf from 'html2pdf.js';
import { ArrowLeft, Save, Download, User, BookOpen, Briefcase, FolderGit2, Settings, Target, Video, MessageSquare, Share2, Globe } from 'lucide-react';
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
import AtsScoreModal from '../components/ResumePreview/AtsScoreModal';
import VideoScriptModal from '../components/ResumePreview/VideoScriptModal';
import InterviewPrepModal from '../components/ResumePreview/InterviewPrepModal';

export default function ResumeBuilder() {
  const { currentResume, currentStep } = useSelector((state) => state.resume);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsData, setAtsData] = useState(null);

  const steps = [
    { id: 1, name: 'Personal', icon: <User size={18} /> },
    { id: 2, name: 'Education', icon: <BookOpen size={18} /> },
    { id: 3, name: 'Experience', icon: <Briefcase size={18} /> },
    { id: 4, name: 'Projects', icon: <FolderGit2 size={18} /> },
    { id: 5, name: 'Skills', icon: <Settings size={18} /> },
    { id: 6, name: 'Summary', icon: <Target size={18} /> },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const endpoint = id ? `${API_URL}/resumes/${id}` : `${API_URL}/resumes`;
      const method = id ? 'put' : 'post';
      
      const res = await axios[method](endpoint, currentResume, {
        headers: { Authorization: `Bearer ${user?.token || ''}` }
      });
      
      toast.success('Resume saved successfully!');
      if (!id && res.data && res.data._id) {
        navigate(`/builder/${res.data._id}`, { replace: true });
      }
    } catch (error) {
      toast.error('Failed to save resume');
    } finally {
      setIsSaving(false);
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

  const toggleShare = () => {
     if (!id) {
        toast.error('Please save your resume first before sharing!');
        return;
     }
     const newPublicState = !currentResume.isPublic;
     dispatch(updateField({ field: 'isPublic', value: newPublicState }));
     toast.success(newPublicState ? 'Resume is now Public!' : 'Resume is now Private');
  };

  const copyPublicLink = () => {
     const link = `${window.location.origin}/p/${id}`;
     navigator.clipboard.writeText(link);
     toast.success('Public link copied to clipboard!');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left Sidebar Form */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col bg-white border-r border-gray-200 shadow-xl z-10">
        
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white flex-wrap gap-2">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500">
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2">
             {currentResume.isPublic && id && (
                <button onClick={copyPublicLink} className="flex gap-1 items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold border border-emerald-200 transition">
                   <Globe size={14} /> Copy Link
                </button>
             )}
             <button onClick={toggleShare} className={`flex gap-1 items-center px-3 py-1.5 rounded-lg text-xs font-bold border transition ${currentResume.isPublic ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                <Share2 size={14} /> {currentResume.isPublic ? 'Shared' : 'Private'}
             </button>
          </div>

          <div className="flex gap-2 ml-auto">
            <button onClick={() => setIsAtsModalOpen(true)} className="flex gap-2 items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:from-indigo-100 hover:to-purple-100 rounded-lg font-medium transition border border-indigo-100 hidden xl:flex">
              <Target size={16} /> Scan
            </button>
            <button onClick={() => setIsVideoModalOpen(true)} className="flex gap-2 items-center px-4 py-2 bg-gradient-to-r from-rose-50 to-orange-50 text-rose-700 hover:from-rose-100 hover:to-orange-100 rounded-lg font-medium transition border border-rose-100 hidden sm:flex">
              <Video size={16} /> Pitch
            </button>
            <button onClick={() => setIsInterviewModalOpen(true)} className="flex gap-2 items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 hover:from-blue-100 hover:to-cyan-100 rounded-lg font-medium transition border border-blue-100 hidden md:flex">
              <MessageSquare size={16} /> Prep
            </button>
            <button onClick={handleSave} disabled={isSaving} className="flex gap-2 items-center px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition">
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={handleDownload} className="flex gap-2 items-center px-4 py-2 bg-primary text-white hover:bg-blue-600 rounded-lg font-medium transition shadow-md shadow-blue-500/20">
              <Download size={16} /> PDF
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
      
      <AtsScoreModal 
        isOpen={isAtsModalOpen} 
        onClose={() => setIsAtsModalOpen(false)} 
      />
      <VideoScriptModal
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)}
      />
      <InterviewPrepModal
        isOpen={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
      />
    </div>
  );
}
