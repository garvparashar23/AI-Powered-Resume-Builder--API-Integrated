import { Link } from 'react-router-dom';
import { ArrowRight, Play, Check, Minus } from 'lucide-react';
import { useState } from 'react';

// Reusable elegant buttons
const PrimaryButton = ({ children, to, className = '' }) => (
  <Link to={to} className={`bg-white text-[#051C2C] hover:bg-gray-100 px-8 py-4 font-semibold transition-all inline-block text-center flex items-center justify-center gap-2 tracking-wide ${className}`}>
    {children}
  </Link>
);

const OutlineDarkButton = ({ children, to, className = '' }) => (
  <Link to={to} className={`border border-[#ffffff40] text-white hover:bg-white/10 px-8 py-4 font-semibold transition-all inline-block text-center flex items-center justify-center gap-2 tracking-wide ${className}`}>
    {children}
  </Link>
);

const OutlineLightButton = ({ children, to, className = '' }) => (
  <Link to={to} className={`border border-[#051C2C] text-[#051C2C] hover:bg-[#051C2C] hover:text-white px-8 py-4 font-semibold transition-all inline-block text-center flex items-center justify-center gap-2 tracking-wide ${className}`}>
    {children}
  </Link>
);

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#051C2C] font-sans selection:bg-[#051C2C] selection:text-white">
      {/* Header - Minimal & Corporate */}
      <header className="bg-[#051C2C] text-white sticky top-0 z-50 border-b border-white/10">
        <nav className="max-w-[1440px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 text-white font-serif italic font-bold text-xl flex items-center justify-center rounded-sm">
                R
             </div>
             <span className="text-xl font-serif tracking-wide font-normal">The Resume Doctrine</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-[14px] font-medium tracking-wider uppercase">
            <Link to="/register" className="hover:text-blue-400 transition-colors">Platform</Link>
            <a href="#impact" className="hover:text-blue-400 transition-colors">Our Impact</a>
            <a href="#features" className="hover:text-blue-400 transition-colors">Capabilities</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-[14px] font-medium">
            <Link to="/login" className="hover:text-blue-400 transition-colors tracking-wider uppercase">Log in</Link>
            <div className="h-4 w-px bg-white/30"></div>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 transition-colors tracking-wider uppercase">
              Start Building
            </Link>
          </div>

          <button className="lg:hidden p-2 text-white" onClick={() => setNavOpen(!navOpen)}>
             <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
             </div>
          </button>
        </nav>
      </header>

      {/* Hero Section - Deep Blue like McKinsey */}
      <section className="bg-[#051C2C] text-white relative overflow-hidden pt-16 pb-32 lg:pt-32 lg:pb-48">
         {/* Subtle abstract line styling in background */}
         <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-white">
               <path d="M 0 100 C 50 50, 50 0, 100 0 L 100 100 Z" fill="currentColor" />
            </svg>
         </div>
         <div className="absolute left-0 bottom-0 top-0 w-1/3 opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-white" fill="none" strokeWidth="0.5">
               <path d="M 0 100 Q 50 50 100 0" />
               <path d="M 0 90 Q 50 40 100 0" />
               <path d="M 0 80 Q 50 30 100 0" />
               <path d="M 0 70 Q 50 20 100 0" />
               <path d="M 0 60 Q 50 10 100 0" />
            </svg>
         </div>

         <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            <p className="text-[13px] uppercase tracking-[0.2em] mb-4 text-blue-300 font-bold inline-block pb-1">AI Powered Resume Builder</p>
            <h1 className="text-5xl lg:text-[5.5rem] font-serif leading-[1.1] mb-6 max-w-4xl tracking-tight">
              The Resume Doctrine
            </h1>
            <h2 className="text-2xl font-light text-blue-100 mb-8 max-w-2xl tracking-wide">
              "Where your skills are not <span className="font-semibold text-white">listed</span>, but <span className="font-semibold text-white">proven</span>."
            </h2>
            <p className="text-lg lg:text-xl font-light leading-relaxed max-w-2xl mb-12 text-blue-50/90">
              For ambitious professionals. We empower your career strategy using industry-leading AI and premium parsing algorithms to solve the most complex hiring obstacles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
               <PrimaryButton to="/register">
                 Build Your Resume <ArrowRight size={18} />
               </PrimaryButton>
               <OutlineDarkButton to="/login">
                 Sign In / Import
               </OutlineDarkButton>
            </div>
         </div>
      </section>

      {/* Our Impact Section */}
      <section id="impact" className="py-24 bg-white">
         <div className="max-w-[1440px] mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#051C2C] mb-2 after:content-[''] after:block after:w-12 after:h-[2px] after:bg-blue-600 after:mt-4 after:mx-auto">
                 Our Impact
               </h2>
            </div>
            
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-center border-y border-gray-200">
               <div className="py-12 md:py-16 px-6">
                 <div className="text-[4rem] lg:text-[5rem] font-light text-blue-600 leading-none mb-4">
                   38%
                 </div>
                 <h3 className="text-xl font-serif text-[#051C2C] mb-2">more interviews</h3>
                 <p className="text-[14px] text-gray-500 font-light">secured by candidates using our premium algorithmic optimization</p>
               </div>
               <div className="py-12 md:py-16 px-6">
                 <div className="text-[4rem] lg:text-[5rem] font-light text-blue-600 leading-none mb-4">
                   2M+
                 </div>
                 <h3 className="text-xl font-serif text-[#051C2C] mb-2">resumes processed</h3>
                 <p className="text-[14px] text-gray-500 font-light">across top-tier consulting, finance, and technology sectors globally</p>
               </div>
               <div className="py-12 md:py-16 px-6">
                 <div className="text-[4rem] lg:text-[5rem] font-light text-blue-600 leading-none mb-4">
                   95%
                 </div>
                 <h3 className="text-xl font-serif text-[#051C2C] mb-2">ATS pass rate</h3>
                 <p className="text-[14px] text-gray-500 font-light">ensuring your human-readable impact reaches human reviewers</p>
               </div>
            </div>
         </div>
      </section>

      {/* Corporate Features / "Tech that moves everything" Dark Section */}
      <section id="features" className="bg-[#0b121f] text-white flex flex-col lg:flex-row min-h-[600px]">
         <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
            <h2 className="text-4xl lg:text-5xl font-serif mb-8 leading-tight tracking-tight">Intelligence that shapes careers</h2>
            <p className="text-lg font-light text-gray-300 leading-relaxed mb-6">
               There's a standard resume. Then there's a document that reimagines your organizational impact — built with AI context, structured by industry standards, and proven to create lasting professional value.
            </p>
            <p className="text-lg font-light text-gray-300 leading-relaxed mb-12">
               Our proprietary intelligence engine evaluates semantic skills matching, biases, and structural integrity against enterprise ATS engines.
            </p>
            <div>
               <Link to="/register" className="inline-flex items-center gap-2 font-bold text-white hover:text-blue-400 transition-colors uppercase tracking-[0.15em] text-[13px] border-b border-transparent hover:border-blue-400 pb-1">
                 Discover Intelligence <ArrowRight size={16} />
               </Link>
            </div>
         </div>
         {/* Abstract Deep Visual area */}
         <div className="lg:w-1/2 relative bg-gradient-to-br from-[#0b121f] to-blue-900 overflow-hidden flex items-center justify-center p-12 min-h-[400px]">
             {/* Simulating the "eye/tech" deep visual from McKinsey style with abstract shapes */}
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjI1KSIvPgo8L3N2Zz4=')] opacity-20"></div>
             <div className="w-[80%] h-[80%] rounded-full border border-blue-500/30 absolute animate-[spin_60s_linear_infinite]"></div>
             <div className="w-[60%] h-[60%] rounded-full border border-blue-400/20 absolute animate-[spin_40s_linear_infinite_reverse]"></div>
             <div className="absolute w-[200%] h-px bg-blue-500/50 rotate-12 transform shadow-[0_0_20px_10px_rgba(59,130,246,0.2)]"></div>
             
             <div className="relative z-10 glass-panel bg-white/5 backdrop-blur-md p-8 border border-white/10 max-w-sm w-full">
                <div className="text-[12px] uppercase tracking-widest text-blue-300 mb-6 font-semibold">Live Analysis</div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                     <span className="font-light">Structural Score</span>
                     <span className="font-serif italic text-lg">98/100</span>
                   </div>
                   <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                     <span className="font-light">Keyword Density</span>
                     <span className="font-serif italic text-lg">Optimal</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="font-light">Sentiment</span>
                     <span className="font-serif italic text-lg">Action-Oriented</span>
                   </div>
                </div>
             </div>
         </div>
      </section>

      {/* Featured Insights / Templates */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 bg-slate-50 border-t border-gray-200">
         <div className="text-center mb-16">
            <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#051C2C] mb-2 after:content-[''] after:block after:w-12 after:h-[2px] after:bg-blue-600 after:mt-4 after:mx-auto">
              Our Templates
            </h2>
         </div>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Elegant Template Cards */}
            <div className="bg-white group cursor-pointer border border-gray-200 hover:border-[#051C2C] transition-colors p-1">
               <div className="bg-slate-100 aspect-[3/4] relative overflow-hidden flex items-center justify-center p-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <div className="bg-white w-full h-full shadow-sm border border-gray-200 p-6 flex flex-col justify-start">
                     <div className="w-full h-6 bg-slate-800 mb-6 flex items-center px-4 text-white text-[8px] font-serif uppercase tracking-widest">Modern Structure</div>
                     <div className="h-2 w-3/4 bg-gray-200 mb-3"></div>
                     <div className="h-2 w-full bg-gray-200 mb-2"></div>
                     <div className="h-2 w-5/6 bg-gray-200 mb-8"></div>
                     <div className="h-px w-full bg-gray-300 mb-4"></div>
                     <div className="h-2 w-1/3 bg-slate-800 mb-3"></div>
                     <div className="h-2 w-full bg-gray-200 mb-2"></div>
                     <div className="h-2 w-4/5 bg-gray-200 mb-2"></div>
                  </div>
                  <div className="absolute inset-0 bg-[#051C2C]/0 group-hover:bg-[#051C2C]/50 transition-colors flex items-center justify-center">
                     <OutlineDarkButton to="/register" className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 text-sm py-3 px-6">
                        Preview Format
                     </OutlineDarkButton>
                  </div>
               </div>
               <div className="py-6 px-4">
                  <h3 className="font-serif text-2xl text-[#051C2C] mb-2">The Modern Executive</h3>
                  <p className="text-[14px] font-light text-gray-600">Tailored for leadership and strategy roles, prioritizing clarity and absolute impact over styling.</p>
               </div>
            </div>

            <div className="bg-white group cursor-pointer border border-gray-200 hover:border-[#051C2C] transition-colors p-1">
               <div className="bg-slate-100 aspect-[3/4] relative overflow-hidden flex items-center justify-center p-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <div className="bg-white w-full h-full shadow-sm border-t-[8px] border-blue-900 p-6 flex flex-col justify-start">
                     <div className="h-4 w-1/2 bg-blue-900 mb-8 text-white text-[8px] flex items-center justify-center font-bold">PROFESSIONAL</div>
                     <div className="flex gap-4">
                        <div className="w-1/3 border-r pr-2"><div className="h-2 w-full bg-gray-200 mb-2"></div><div className="h-2 w-3/4 bg-gray-200"></div></div>
                        <div className="w-2/3"><div className="h-2 w-full bg-gray-300 mb-2"></div><div className="h-2 w-5/6 bg-gray-300"></div></div>
                     </div>
                  </div>
                  <div className="absolute inset-0 bg-[#051C2C]/0 group-hover:bg-[#051C2C]/50 transition-colors flex items-center justify-center">
                     <OutlineDarkButton to="/register" className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 text-sm py-3 px-6">
                        Preview Format
                     </OutlineDarkButton>
                  </div>
               </div>
               <div className="py-6 px-4">
                  <h3 className="font-serif text-2xl text-[#051C2C] mb-2">The Professional Strict</h3>
                  <p className="text-[14px] font-light text-gray-600">The gold standard format for technical consulting and rigorous financial environments.</p>
               </div>
            </div>

            <div className="bg-white group cursor-pointer border border-gray-200 hover:border-[#051C2C] transition-colors p-1 lg:block hidden">
               <div className="bg-slate-100 aspect-[3/4] relative overflow-hidden flex items-center justify-center p-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <div className="bg-white w-full h-full shadow-sm border border-gray-200 p-8 flex flex-col justify-start items-center">
                     <div className="h-6 w-3/4 bg-gray-800 mb-2 text-center text-white text-[9px] font-light uppercase tracking-[0.2em] flex items-center justify-center">Minimalist</div>
                     <div className="h-px w-24 bg-gray-400 mb-8"></div>
                     <div className="w-full text-center"><div className="h-2 w-full bg-gray-200 mx-auto mb-2"></div><div className="h-2 w-4/5 bg-gray-200 mx-auto mb-8"></div></div>
                     <div className="w-full text-center"><div className="h-2 w-1/4 bg-slate-800 mx-auto mb-3"></div><div className="h-2 w-full bg-gray-200 mx-auto mb-2"></div></div>
                  </div>
                  <div className="absolute inset-0 bg-[#051C2C]/0 group-hover:bg-[#051C2C]/50 transition-colors flex items-center justify-center">
                     <OutlineDarkButton to="/register" className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 text-sm py-3 px-6">
                        Preview Format
                     </OutlineDarkButton>
                  </div>
               </div>
               <div className="py-6 px-4">
                  <h3 className="font-serif text-2xl text-[#051C2C] mb-2">The Minimalist</h3>
                  <p className="text-[14px] font-light text-gray-600">Extremely vast whitespace designed for creative directors and senior technical architects.</p>
               </div>
            </div>
         </div>
         
         <div className="text-center mt-12">
            <OutlineLightButton to="/register" className="text-sm px-10">
               Access All Templates
            </OutlineLightButton>
         </div>
      </section>

      {/* Corporate Minimal Footer */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
         <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Logo Col */}
            <div className="lg:col-span-1 border-b md:border-b-0 pb-8 md:pb-0">
               <div className="flex items-center gap-2 mb-8">
                  <span className="text-2xl font-serif text-[#051C2C]">The Resume Doctrine</span>
               </div>
               
               <div className="flex gap-4">
                  {/* Clean text social icons */}
                  <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-[#051C2C] hover:bg-[#051C2C] hover:text-white transition-colors">in</a>
                  <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-[#051C2C] hover:bg-[#051C2C] hover:text-white transition-colors">Y</a>
               </div>
            </div>

            {/* Links Columns */}
            <div>
               <h4 className="text-[12px] uppercase tracking-widest text-[#051C2C] font-bold mb-6">Capabilities</h4>
               <ul className="space-y-4 text-[14px] font-light text-gray-600">
                  <li><Link to="/register" className="hover:text-blue-600 transition-colors">AI Document Parsing</Link></li>
                  <li><Link to="/register" className="hover:text-blue-600 transition-colors">Formatting Engineering</Link></li>
                  <li><Link to="/register" className="hover:text-blue-600 transition-colors">Market Intel Simulation</Link></li>
                  <li><Link to="/register" className="hover:text-blue-600 transition-colors">Interview Architecture</Link></li>
               </ul>
            </div>
            
            <div>
               <h4 className="text-[12px] uppercase tracking-widest text-[#051C2C] font-bold mb-6">Explore</h4>
               <ul className="space-y-4 text-[14px] font-light text-gray-600">
                  <li><Link to="/login" className="hover:text-blue-600 transition-colors">Sign In Portal</Link></li>
                  <li><Link to="/register" className="hover:text-blue-600 transition-colors">New Registration</Link></li>
                  <li><Link to="/" className="hover:text-blue-600 transition-colors">Global Locations</Link></li>
               </ul>
            </div>

            <div>
               <h4 className="text-[12px] uppercase tracking-widest text-[#051C2C] font-bold mb-6">Subscribe</h4>
               <p className="text-[14px] font-light text-gray-600 mb-4">Select topics and stay current with our latest career insights.</p>
               <div className="flex">
                  <input type="text" placeholder="Email address" className="border border-gray-300 px-4 py-2 w-full text-sm outline-none focus:border-[#051C2C]" />
                  <button className="bg-blue-600 text-white px-6 font-semibold text-sm hover:bg-blue-700 transition">Submit</button>
               </div>
            </div>

         </div>

         {/* Bottom Footer Border & Rules */}
         <div className="max-w-[1440px] mx-auto px-6 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-500 font-light">
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
               <a href="#" className="hover:text-gray-900 transition-colors">Scam warning</a>
               <a href="#" className="hover:text-gray-900 transition-colors">FAQ</a>
               <a href="#" className="hover:text-gray-900 transition-colors">Privacy policy</a>
               <a href="#" className="hover:text-gray-900 transition-colors border-l pl-4 border-gray-300">Terms of use</a>
               <a href="#" className="hover:text-gray-900 transition-colors border-l pl-4 border-gray-300">Accessibility statement</a>
            </div>
            <div>
               © 1996-2026 The Resume Doctrine Organization
            </div>
         </div>
      </footer>
    </div>
  );
}
