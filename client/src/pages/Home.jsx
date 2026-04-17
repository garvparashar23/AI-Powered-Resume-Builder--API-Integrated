import { Link } from 'react-router-dom';
import { FileText, Zap, LayoutTemplate, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
           <FileText className="text-primary w-8 h-8" />
           <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">AI Resume</span>
        </div>
        <div className="space-x-6">
          <Link to="/about" className="text-gray-600 hover:text-primary font-medium transition-colors">About Project</Link>
          <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">Login</Link>
          <Link to="/register" className="bg-primary text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all hover:shadow-lg inline-block">Get Started</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-dark leading-tight">
            Build your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">dream resume</span> with AI.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Create professional, ATS-friendly resumes in minutes. Let our AI write the perfect summary tailored to your job role.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="bg-dark text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-gray-800 transition-all hover:-translate-y-1">
              Create Resume Now
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg text-primary"><Zap size={24}/></div>
              <span className="font-semibold text-gray-700">AI Powered</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600"><LayoutTemplate size={24}/></div>
              <span className="font-semibold text-gray-700">Modern Templates</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-indigo-400 rounded-2xl md:rounded-[3rem] opacity-20 blur-3xl transform rotate-6"></div>
          <div className="glassmorphism rounded-2xl md:rounded-[3rem] p-8 border border-white/40 shadow-2xl relative z-10 overflow-hidden group">
            {/* Mockup Resume Preview in Header */}
            <div className="h-96 w-full bg-white rounded-xl shadow-inner p-6 flex flex-col gap-4">
               <div className="w-1/3 h-6 bg-gray-200 rounded animate-pulse"></div>
               <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
               <div className="my-4 border-t-2 border-gray-100"></div>
               <div className="space-y-2">
                  <div className="w-full h-3 bg-gray-100 rounded"></div>
                  <div className="w-full h-3 bg-gray-100 rounded"></div>
                  <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
               </div>
               <div className="my-4 border-t-2 border-gray-100"></div>
               <div className="w-1/4 h-4 bg-gray-200 rounded mb-2"></div>
               <div className="w-full h-12 bg-indigo-50 rounded-lg"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
