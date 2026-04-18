import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FileWarning, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { API_URL } from '../config';

import ModernTemplate from '../components/ResumePreview/ModernTemplate';
import ProfessionalTemplate from '../components/ResumePreview/ProfessionalTemplate';
import MinimalTemplate from '../components/ResumePreview/MinimalTemplate';

const templates = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate,
};

export default function PublicResumeView() {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPublicResume();
  }, [id]);

  const fetchPublicResume = async () => {
    try {
      const res = await axios.get(`${API_URL}/resumes/share/${id}`);
      setResumeData(res.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const element = document.getElementById('public-resume-preview');
    const opt = {
      margin: 0,
      filename: `${resumeData.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
          <FileWarning className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Resume Not Found</h2>
          <p className="text-gray-600">This resume link is either invalid, or the owner has set it back to private.</p>
        </div>
      </div>
    );
  }

  const SelectedTemplate = templates[resumeData.templateId || 'modern'] || ModernTemplate;

  return (
    <div className="min-h-screen bg-gray-200 py-8 flex flex-col items-center">
       <div className="max-w-[8.5in] w-full flex justify-between items-center mb-6 px-4 sm:px-0">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
             <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
             Verified AI Resume Profile
          </h1>
          <button 
             onClick={handleDownload}
             className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-xl shadow-md font-bold transition text-sm"
          >
             <Download size={16} /> Save PDF
          </button>
       </div>
       
       <div className="w-full max-w-[8.5in] bg-white shadow-2xl rounded-sm min-h-[11in] shrink-0" id="public-resume-preview">
          <SelectedTemplate data={resumeData} />
       </div>

       <div className="mt-10 py-6 w-full text-center border-t border-gray-300">
           <p className="text-sm text-gray-500">Built with <strong>AI Resume Builder Enterprise</strong>.</p>
       </div>
    </div>
  );
}
