import { Link } from 'react-router-dom';
import { FileText, Cpu, Layout, ShieldCheck, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
           <FileText className="text-primary w-8 h-8" />
           <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">AI Resume</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">Home</Link>
          <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">Login</Link>
          <Link to="/register" className="bg-primary text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all hover:shadow-lg">Get Started</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            About the Project
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            A state-of-the-art platform designed to help professionals easily build ATS-optimized resumes using artificial intelligence. 
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
              <Cpu className="text-indigo-600 w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Summaries</h3>
            <p className="text-gray-600">
              Integrates with advanced Language Models to automatically generate compelling professional summaries based on your skills and experience.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <Layout className="text-primary w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Modern Templates</h3>
            <p className="text-gray-600">
              Choose from a suite of premium, recruiter-approved templates ensuring your resume stands out while passing automated screening systems.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="text-emerald-600 w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
            <p className="text-gray-600">
              Your career data is heavily encrypted and stored safely. We value your privacy and employ modern security protocols to keep your data safe.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-slate-900 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden text-white flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-0 -left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          
          <div className="relative z-10 max-w-2xl text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Tech Stack</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Built using the MERN stack (MongoDB, Express, React, Node.js) styled with Tailwind CSS, secured by JWT & bcryptjs, and supercharged by OpenAI.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
               <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium backdrop-blur-sm border border-white/20">React 19</span>
               <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium backdrop-blur-sm border border-white/20">Node.js</span>
               <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium backdrop-blur-sm border border-white/20">MongoDB</span>
               <span className="px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium backdrop-blur-sm border border-white/20">Tailwind CSS</span>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
             <div className="w-24 h-24 bg-white/5 border border-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Zap className="w-12 h-12 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
