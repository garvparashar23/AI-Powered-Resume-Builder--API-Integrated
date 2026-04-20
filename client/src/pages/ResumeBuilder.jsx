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
    { id: 6, name: 'Summary', icon: <Target size={18} /> },
    { id: 3, name: 'Experience', icon: <Briefcase size={18} /> },
    { id: 4, name: 'Projects', icon: <FolderGit2 size={18} /> },
    { id: 2, name: 'Education', icon: <BookOpen size={18} /> },
    { id: 5, name: 'Skills', icon: <Settings size={18} /> },
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
      filename: `${currentResume.name || 'document'}.pdf`,
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
    <div className="flex h-screen overflow-hidden bg-white font-sans text-gray-900 selection:bg-[#051C2C] selection:text-white">
      {/* Left Sidebar Form */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col bg-white border-r border-[#051C2C]/10 shadow-xl shadow-[#051C2C]/5 z-10">
        
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-[#051C2C]/10 flex justify-between items-center bg-[#051C2C]">
          <button onClick={() => navigate('/dashboard')} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-none transition" title="Back to Intelligence Dashboard">
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex gap-2 ml-auto">
            {currentResume.isPublic && id && (
               <button onClick={copyPublicLink} className="flex gap-1.5 items-center px-4 py-2 bg-transparent text-white hover:bg-white/10 text-xs font-bold uppercase tracking-widest border border-white/20 transition">
                  <Globe size={14} /> Link
               </button>
            )}
            <button onClick={toggleShare} className={`flex gap-1.5 items-center px-4 py-2 text-xs font-bold uppercase tracking-widest border transition ${currentResume.isPublic ? 'bg-white text-[#051C2C] border-transparent' : 'bg-transparent text-white border-white/20 hover:bg-white/10'}`}>
               <Share2 size={14} /> {currentResume.isPublic ? 'Shared' : 'Private'}
            </button>
          </div>
        </div>

        {/* Intelligence Action Bar */}
        <div className="flex gap-2 px-6 py-3 bg-slate-50 border-b border-[#051C2C]/10 hide-scrollbar overflow-x-auto items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#051C2C]/50 mr-2">Engine:</span>
            <button onClick={() => setIsAtsModalOpen(true)} className="flex gap-2 items-center px-4 py-1.5 bg-white text-[#051C2C] hover:bg-[#051C2C] hover:text-white text-[11px] font-bold uppercase tracking-widest transition border border-[#051C2C]/20 hidden xl:flex">
              <Target size={14} /> Scan
            </button>
            <button onClick={() => setIsVideoModalOpen(true)} className="flex gap-2 items-center px-4 py-1.5 bg-white text-[#051C2C] hover:bg-[#051C2C] hover:text-white text-[11px] font-bold uppercase tracking-widest transition border border-[#051C2C]/20 hidden sm:flex">
              <Video size={14} /> Pitch
            </button>
            <button onClick={() => setIsInterviewModalOpen(true)} className="flex gap-2 items-center px-4 py-1.5 bg-white text-[#051C2C] hover:bg-[#051C2C] hover:text-white text-[11px] font-bold uppercase tracking-widest transition border border-[#051C2C]/20 hidden md:flex">
              <MessageSquare size={14} /> Prep
            </button>
            <div className="ml-auto flex gap-2">
               <button onClick={handleSave} disabled={isSaving} className="flex gap-2 items-center px-4 py-1.5 bg-white text-[#051C2C] hover:bg-gray-100 text-[11px] font-bold uppercase tracking-widest transition border border-gray-200">
                 <Save size={14} /> {isSaving ? 'Saving...' : 'Save'}
               </button>
               <button onClick={handleDownload} className="flex gap-2 items-center px-4 py-1.5 bg-[#051C2C] text-white hover:bg-gray-900 text-[11px] font-bold uppercase tracking-widest transition shadow-sm">
                 <Download size={14} /> PDF
               </button>
            </div>
        </div>

        {/* Step Navigation */}
        <div className="flex pl-6 pr-2 py-0 border-b border-[#051C2C]/10 hide-scrollbar overflow-x-auto bg-white">
          {steps.map(step => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center gap-2 min-w-[120px] px-4 py-4 border-b-2 transition-all ${activeStep === step.id ? 'border-[#051C2C] text-[#051C2C] bg-slate-50' : 'border-transparent text-gray-400 hover:text-[#051C2C] hover:bg-slate-50'}`}
            >
              <div className={`${activeStep === step.id ? 'text-[#051C2C]' : ''}`}>
                {step.icon}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest">{step.name}</span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
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
          <div className="flex justify-center gap-4 mb-8 sticky top-0 z-50 py-2">
             <div className="bg-white px-2 py-1.5 shadow-md border border-[#051C2C]/10 flex gap-2">
                {['modern', 'minimal', 'professional'].map(t => (
                  <button 
                     key={t}
                     onClick={() => dispatch(updateField({ field: 'templateId', value: t }))}
                     className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${currentResume.templateId === t ? 'bg-[#051C2C] text-white shadow-sm' : 'bg-transparent text-gray-500 hover:text-[#051C2C] hover:bg-slate-50'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
          </div>
          
          {/* A4 Paper Container */}
          <div id="resume-preview-container" className="bg-white shadow-[0_20px_50px_rgba(5,28,44,0.1)] w-full mx-auto min-h-[1100px] print:m-0 print:shadow-none overflow-hidden relative" style={{ width: '8.5in' }}>
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
