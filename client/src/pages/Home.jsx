import { Link } from 'react-router-dom';
import { ArrowUp, Star, Smartphone, LayoutTemplate, Palette, FileText, CheckSquare, Lightbulb, ChevronLeft, ChevronRight, Moon } from 'lucide-react';
import { useState } from 'react';

// Reusable Button Components
const PrimaryButton = ({ children, to, className = '' }) => (
  <Link to={to} className={`bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1 inline-block text-center ${className}`}>
    {children}
  </Link>
);

const OutlineButton = ({ children, to, className = '' }) => (
  <Link to={to} className={`border border-rose-300 text-rose-500 hover:bg-rose-50 px-8 py-4 rounded-xl font-bold transition-colors inline-block text-center ${className}`}>
    {children}
  </Link>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-rose-200">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <nav className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-rose-500 text-white font-bold text-xl">
               <span className="transform -skew-x-12">R</span>
            </div>
            <span className="text-xl font-bold text-purple-700 tracking-tight">Resume Builder</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-700">
            <a href="#" className="hover:text-rose-500 transition">Resume Builder App</a>
            <a href="#" className="hover:text-rose-500 transition">Resume Examples</a>
            <a href="#" className="hover:text-rose-500 transition">Resume Templates</a>
            <a href="#" className="hover:text-rose-500 transition">Cover Letter Builder</a>
            <a href="#" className="hover:text-rose-500 transition">Career Center</a>
            <Link to="/login" className="hover:text-rose-500 transition">My Account</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/register" className="border border-rose-300 text-rose-500 hover:bg-rose-50 px-6 py-2.5 rounded-xl font-bold transition">
              Build My Resume
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
         {/* Left: Graphic Placeholder (Using CSS to simulate the image) */}
         <div className="relative order-2 lg:order-1 flex justify-center">
            <div className="absolute inset-0 bg-pink-200 rounded-[3rem] transform -rotate-6 scale-95 opacity-50 z-0 blur-sm"></div>
            <div className="bg-white rounded-md shadow-2xl border border-gray-100 w-full max-w-md relative z-10 overflow-hidden flex flex-col">
               {/* Header of Resume Graphic */}
               <div className="bg-[#6B4E99] p-6 flex items-center gap-4 text-white rounded-t-md">
                  <div className="w-16 h-16 rounded-full bg-slate-300 border border-white flex-shrink-0"></div>
                  <div>
                    <div className="text-xl font-serif">Jessica Lang</div>
                    <div className="text-sm opacity-80 mt-1">Registered Nurse</div>
                  </div>
               </div>
               
               <div className="p-6 flex-1 flex flex-col gap-4 bg-white">
                  <div className="grid grid-cols-3 gap-6">
                     <div className="col-span-1 border-r border-gray-200 pr-4 space-y-4">
                        <div className="h-3 w-full bg-purple-200 rounded"></div>
                        <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                        <div className="h-2 w-full bg-gray-200 rounded"></div>
                        <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
                     </div>
                     <div className="col-span-2 space-y-6">
                        <div className="h-3 w-1/3 bg-purple-200 rounded"></div>
                        <div className="space-y-2">
                           <div className="h-2 w-full bg-gray-200 rounded"></div>
                           <div className="h-2 w-full bg-gray-200 rounded"></div>
                           <div className="h-2 w-4/5 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-3 w-1/4 bg-purple-200 rounded"></div>
                        <div className="space-y-2">
                           <div className="h-2 w-full bg-gray-200 rounded"></div>
                           <div className="h-2 w-11/12 bg-gray-200 rounded"></div>
                           <div className="h-2 w-10/12 bg-gray-200 rounded"></div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Absolute Floating Settings Panel Simulation */}
               <div className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-white rounded shadow-[0_0_20px_rgba(0,0,0,0.15)] border border-gray-100 w-[240px] p-4 z-20">
                  <div className="flex items-center justify-between mb-4 border-b pb-2">
                     <span className="text-xs font-bold text-gray-700">Templates & colors</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                     <div className="h-20 bg-slate-100 border rounded"></div>
                     <div className="h-20 bg-slate-100 border border-purple-400 rounded"></div>
                     <div className="h-20 bg-green-50 border rounded"></div>
                     <div className="h-20 bg-slate-100 border rounded"></div>
                     <div className="h-20 bg-zinc-100 border rounded"></div>
                     <div className="h-20 bg-rose-50 border rounded"></div>
                     <div className="h-20 bg-blue-50 border rounded"></div>
                     <div className="h-20 bg-orange-50 border rounded"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Right: Copy */}
         <div className="order-1 lg:order-2 space-y-8 pl-0 lg:pl-10">
            <h1 className="text-5xl lg:text-[4.5rem] font-bold text-[#1a1a1a] leading-[1.1] tracking-tight">
              The Best Online Resume Builder
            </h1>
            <p className="text-xl text-slate-700 font-medium leading-relaxed max-w-xl">
              Easily create a resume from any device with our best-in-class resume builder platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
               <PrimaryButton to="/register" className="flex-1 max-w-[280px]">
                  Create My Resume Now
               </PrimaryButton>
               <OutlineButton to="/login" className="flex-1 max-w-[280px]">
                  Import Resume
               </OutlineButton>
            </div>

            <div className="flex items-center gap-8 pt-6 pb-8 border-b border-gray-200">
               <div className="space-y-1 text-[#86409b]">
                  <div className="flex items-center gap-2 font-bold text-4xl">
                     <ArrowUp size={30} strokeWidth={3} className="text-[#86409b]" /> 38%
                  </div>
                  <p className="text-sm font-medium opacity-80">more interviews</p>
               </div>
               <div className="w-px h-16 bg-gray-300"></div>
               <div className="space-y-1 text-[#86409b]">
                  <div className="flex items-center gap-2 font-bold text-4xl">
                     <ArrowUp size={30} strokeWidth={3} className="text-[#86409b]" /> 23%
                  </div>
                  <p className="text-sm font-medium opacity-80">more likely to<br/>get a job offer</p>
               </div>
            </div>

            <div className="space-y-4 pt-2">
               <p className="font-bold text-slate-800">Subscribers have been hired by: *</p>
               <div className="flex items-center gap-8 flex-wrap">
                  {/* Text based logos simulating the image */}
                  <span className="text-2xl font-black text-black lowercase tracking-tighter flex items-center">amazon</span>
                  <span className="text-2xl font-bold text-black tracking-tighter">Deloitte.</span>
                  <span className="text-2xl font-serif text-black">J.P.Morgan</span>
                  <span className="text-2xl font-bold text-black lowercase">facebook</span>
                  <span className="text-xl font-serif text-black leading-none font-bold">Goldman<br/>Sachs</span>
               </div>
            </div>
         </div>
      </section>

      {/* Templates Carousel Section */}
      <section className="bg-slate-50 py-24 relative overflow-hidden">
         {/* Subtle background glow */}
         <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none"></div>
         <div className="absolute top-10 right-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none"></div>

         <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col items-center">
            
            {/* The Carousel Track */}
            <div className="flex gap-8 overflow-x-auto w-full pb-16 snap-x hide-scrollbar px-4 sm:px-10 justify-center items-center">
               
               {/* Template 1 */}
               <div className="min-w-[300px] w-[350px] bg-white rounded shadow flex-shrink-0 snap-center transition-transform hover:-translate-y-2 border border-purple-100 p-2 opacity-80 scale-95">
                 <div className="h-[450px] bg-white border border-purple-200 flex flex-col">
                    <div className="text-center pt-8 pb-4 border-b border-purple-100 relative">
                       <div className="text-purple-800 font-serif text-xl">Alex Johnson</div>
                       <div className="text-[10px] text-gray-500 mt-2">123 Street Name • (555) 555-5555</div>
                    </div>
                    <div className="flex gap-4 mt-4 h-full">
                       <div className="w-1/3 border-r border-purple-100 pr-2 space-y-4 flex flex-col items-center">
                          <div className="h-2 w-1/2 bg-purple-100"></div>
                          <div className="h-1 w-3/4 bg-gray-200"></div>
                          <div className="h-1 w-full bg-gray-200"></div>
                       </div>
                       <div className="w-2/3 space-y-4 pr-4">
                          <div className="h-2 w-1/3 bg-purple-200 text-center mx-auto"></div>
                          <div className="h-1 w-full bg-gray-200"></div>
                          <div className="h-1 w-5/6 bg-gray-200"></div>
                       </div>
                    </div>
                 </div>
               </div>

               {/* Template 2 */}
               <div className="min-w-[300px] w-[350px] bg-white rounded shadow flex-shrink-0 snap-center transition-transform hover:-translate-y-2 border border-rose-100 p-2 opacity-80 scale-95">
                 <div className="h-[450px] bg-white border border-rose-200 flex flex-col">
                    <div className="bg-rose-700 h-28 w-full relative text-center text-white flex items-end justify-center pb-6">
                       <span className="font-sans text-2xl tracking-widest">JAMIE SMITH</span>
                    </div>
                    <div className="flex gap-4 mt-6 px-4 h-full">
                       <div className="w-1/3 space-y-4">
                          <div className="h-2 w-full bg-rose-200"></div><div className="h-1 w-full bg-gray-200"></div><div className="h-1 w-3/4 bg-gray-200"></div>
                       </div>
                       <div className="w-2/3 space-y-4 border-l border-rose-100 pl-4">
                          <div className="h-2 w-1/3 bg-rose-200"></div><div className="h-1 w-full bg-gray-200"></div><div className="h-1 w-5/6 bg-gray-200"></div>
                       </div>
                    </div>
                 </div>
               </div>

               {/* Template 3 (Centered / Hovered) */}
               <div className="min-w-[300px] w-[380px] bg-white rounded shadow-2xl flex-shrink-0 snap-center scale-100 border border-gray-200 p-2 relative group z-20 mx-4">
                 <div className="h-[480px] bg-white rounded border border-gray-100 flex flex-col">
                    <div className="bg-[#2D3F58] h-24 w-full relative flex items-center px-6">
                       <div className="w-14 h-14 bg-slate-300 rounded-full border-2 border-white absolute -bottom-7 left-6 shadow"></div>
                       <span className="text-white ml-20 text-xl font-serif">Alex Johnson</span>
                    </div>
                    <div className="pt-12 px-6 space-y-6">
                       <div className="space-y-2">
                         <div className="h-1 w-full bg-gray-300"></div><div className="h-1 w-full bg-gray-300"></div><div className="h-1 w-3/4 bg-gray-300"></div>
                       </div>
                       <div className="space-y-3">
                         <div className="h-2 w-1/3 bg-blue-800 rounded"></div>
                         <div className="h-1 w-full bg-gray-300"></div><div className="h-1 w-5/6 bg-gray-300"></div>
                         <div className="h-1 w-4/6 bg-gray-300"></div>
                       </div>
                       <div className="space-y-3 pt-4">
                         <div className="h-2 w-1/4 bg-blue-800 rounded"></div>
                         <div className="h-1 w-full bg-gray-300"></div><div className="h-1 w-5/6 bg-gray-300"></div>
                       </div>
                    </div>
                 </div>

                 {/* Hover Overlay Button */}
                 <div className="absolute inset-0 bg-white/10 flex items-center justify-center opacity-100 transition-opacity">
                    <Link to="/register" className="bg-gradient-to-r from-orange-400 to-rose-500 hover:from-orange-500 hover:to-rose-600 text-white px-8 py-4 rounded-lg font-bold shadow-2xl hover:scale-105 transition-transform text-lg flex items-center gap-0">
                       Use This Template
                    </Link>
                 </div>
               </div>

               {/* Template 4 */}
               <div className="min-w-[300px] w-[350px] bg-white rounded shadow flex-shrink-0 snap-center transition-transform hover:-translate-y-2 border border-orange-100 p-2 opacity-80 scale-95">
                 <div className="h-[450px] bg-white border border-gray-100 flex flex-col pt-8 px-6">
                    <div className="w-2/3 h-10 bg-[#E88B35] rounded-r-3xl -ml-6 mb-6 flex items-center pl-6 text-white font-bold text-xl">Taylor Lee</div>
                    <div className="space-y-6">
                       <div className="space-y-3">
                         <div className="h-1 w-full bg-gray-300"></div><div className="h-1 w-5/6 bg-gray-300"></div>
                       </div>
                        <div className="space-y-3">
                         <div className="h-2 w-1/3 bg-[#E88B35] rounded"></div>
                         <div className="h-1 w-full bg-gray-300"></div><div className="h-1 w-5/6 bg-gray-300"></div>
                       </div>
                       <div className="space-y-3">
                         <div className="h-2 w-1/3 bg-[#E88B35] rounded"></div>
                         <div className="h-1 w-full bg-gray-300"></div><div className="h-1 w-5/6 bg-gray-300"></div>
                       </div>
                    </div>
                 </div>
               </div>
               
            </div>

            {/* Dots */}
            <div className="flex gap-4 mb-12 items-center">
               <ChevronLeft className="text-orange-400 cursor-pointer w-6 h-6 stroke-[3]" />
               <div className="w-3 h-3 rounded-full border border-orange-400 cursor-pointer"></div>
               <div className="w-3 h-3 rounded-full border border-orange-400 cursor-pointer"></div>
               <div className="w-3 h-3 rounded-full border border-orange-400 cursor-pointer"></div>
               <div className="w-3 h-3 rounded-full border border-orange-400 cursor-pointer"></div>
               <div className="w-3 h-3 rounded-full border border-orange-400 cursor-pointer"></div>
               <div className="w-3 h-3 rounded-full border border-orange-400 cursor-pointer"></div>
               <div className="w-3 h-3 rounded-full border border-orange-400 cursor-pointer"></div>
               <div className="w-3 h-3 rounded-full bg-orange-400 cursor-pointer scale-[1.2]"></div>
               <ChevronRight className="text-orange-400 cursor-pointer w-6 h-6 stroke-[3]" />
            </div>

            <OutlineButton to="/register" className="bg-white border-orange-200 text-orange-500 hover:bg-orange-50 font-bold px-12 py-4 shadow-sm text-lg rounded-xl">
               See All Resume Templates
            </OutlineButton>
         </div>
      </section>

      {/* Features Grid Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-24 text-center">
         <h2 className="text-4xl md:text-[2.75rem] font-bold text-[#1a1a1a] mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
            Get hired 36% faster with our feature-packed and easy-to-use resume builder app
         </h2>
         <p className="text-[17px] text-slate-800 mb-20 max-w-3xl mx-auto">
            ResumeBuilder.com is now part of Bold LLC. For more information visit our <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>.
         </p>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 text-left">
            {/* Feat 1 */}
            <div>
               <div className="text-purple-600 mb-4 opacity-80">
                  <Smartphone size={40} className="stroke-[1.5]" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">Powerful resume builder</h3>
               <p className="text-slate-700 leading-relaxed text-[15px]">Use our potent creation tools and expert guidance to create the perfect resume for your next job application.</p>
            </div>
            {/* Feat 2 */}
            <div>
               <div className="text-purple-600 mb-4 opacity-80">
                  <FileText size={40} className="stroke-[1.5]" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">Professional templates</h3>
               <p className="text-slate-700 leading-relaxed text-[15px]">Choose from 25+ applicant tracking systems (ATS)-friendly modern and professional templates.</p>
            </div>
            {/* Feat 3 */}
            <div>
               <div className="text-purple-600 mb-4 opacity-80">
                  <Palette size={40} className="stroke-[1.5]" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">Customize fonts and colors</h3>
               <p className="text-slate-700 leading-relaxed text-[15px]">Select custom <a href="#" className="underline">fonts</a> and colors on any resume template.</p>
            </div>
            {/* Feat 4 */}
            <div>
               <div className="text-purple-600 mb-4 opacity-80">
                  <LayoutTemplate size={40} className="stroke-[1.5]" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">Free resume examples</h3>
               <p className="text-slate-700 leading-relaxed text-[15px]">Use our more than 500 resume examples and templates to see what a great resume looks like in your field.</p>
            </div>
            {/* Feat 5 */}
            <div>
               <div className="text-purple-600 mb-4 opacity-80">
                  <CheckSquare size={40} className="stroke-[1.5]" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">ATS-friendly templates</h3>
               <p className="text-slate-700 leading-relaxed text-[15px]">Sail through <a href="#" className="underline">applicant tracking systems</a> with resume templates that appeal to both machines and humans.</p>
            </div>
            {/* Feat 6 */}
            <div>
               <div className="text-purple-600 mb-4 opacity-80">
                  <Lightbulb size={40} className="stroke-[1.5]" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">Expert tips and guidance</h3>
               <p className="text-slate-700 leading-relaxed text-[15px]">Get help every step of the way as you build your resume with expert tips and suggested phrases.</p>
            </div>
         </div>
      </section>

      {/* Large Bottom CTA Section */}
      <section className="bg-gradient-to-r from-[#9b51e0] via-[#ed4c8b] to-[#f58442] py-24 md:py-32 text-center text-white relative overflow-hidden">
         {/* Background Shapes Overlay */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white opacity-20 rotate-45 rounded-[120px] pointer-events-none mix-blend-overlay"></div>
         <div className="absolute top-1/4 right-[10%] transform rotate-12 w-[300px] h-[300px] bg-white opacity-10 rounded-full pointer-events-none mix-blend-overlay"></div>
         <div className="absolute bottom-1/4 left-[10%] transform -rotate-12 w-[400px] h-[400px] bg-white opacity-10 rounded-[80px] pointer-events-none mix-blend-overlay"></div>

         <div className="max-w-[1000px] mx-auto px-6 relative z-10 flex flex-col items-center">
            <h2 className="text-5xl md:text-[5rem] font-bold mb-12 leading-[1.1] tracking-tight text-white drop-shadow-sm">
               Let's Land Your Dream<br/>Job Together
            </h2>
            <Link to="/register" className="bg-gradient-to-r from-orange-400 to-rose-500 hover:from-orange-500 hover:to-rose-600 transition-all text-white px-10 py-4 border border-white/20 rounded-lg font-bold shadow-xl hover:scale-105 inline-block text-lg mb-20 relative overflow-hidden">
               Start Your Resume Now
            </Link>

            <div className="w-full text-center">
               <p className="text-[13px] font-bold mb-6 text-white/90">As seen in</p>
               <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 select-none text-white">
                  <span className="text-2xl font-bold tracking-[0.2em] font-sans border-2 border-white px-1 py-0.5 leading-none">WIRED</span>
                  <span className="text-3xl font-serif font-bold tracking-tighter">Forbes</span>
                  <span className="text-[1.3rem] font-bold leading-none text-left tracking-tight">BUSINESS<br/>INSIDER</span>
                  <span className="text-[1.8rem] font-sans font-bold lowercase tracking-tighter">Bloomberg</span>
                  <span className="text-[2rem] font-bold italic tracking-tighter flex items-center pr-2"><span className="text-3xl mr-1">msn</span></span>
                  <span className="text-3xl font-bold tracking-tighter lowercase">yahoo!</span>
                  <span className="text-2xl font-black lowercase border-2 border-white px-1 rounded-sm leading-none py-1">npr</span>
                  <span className="text-3xl font-serif font-semibold tracking-wide">FORTUNE</span>
                  <span className="text-[1.7rem] font-black italic tracking-tighter bg-transparent text-white border-y-4 border-white px-0.5 pb-1 uppercase">HUFFPOST</span>
                  <span className="text-2xl font-serif font-bold">Entrepreneur</span>
                  <span className="text-[11px] font-extrabold uppercase leading-none text-left pl-1 border-l-4 border-white">Harvard<br/>Business<br/>Review</span>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-gray-100 relative">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20 relative">
            
            {/* Logo & Trust Pilot & Socials */}
            <div className="lg:col-span-1 space-y-10 pl-0">
               <div className="flex items-center gap-2">
                 <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-rose-500 text-white font-bold text-xl">
                    <span className="transform -skew-x-12">R</span>
                 </div>
                 <span className="text-2xl font-bold text-purple-700 tracking-tight">Resume Builder</span>
               </div>

               <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-[#00b67a] font-bold text-xl tracking-tight">
                    <Star fill="currentColor" size={24} /> Trustpilot
                  </div>
                  <div className="flex gap-1 h-8">
                     <div className="bg-[#00b67a] w-8 flex items-center justify-center text-white"><Star fill="currentColor" size={20} /></div>
                     <div className="bg-[#00b67a] w-8 flex items-center justify-center text-white"><Star fill="currentColor" size={20} /></div>
                     <div className="bg-[#00b67a] w-8 flex items-center justify-center text-white"><Star fill="currentColor" size={20} /></div>
                     <div className="bg-[#00b67a] w-8 flex items-center justify-center text-white"><Star fill="currentColor" size={20} /></div>
                     <div className="bg-[#00b67a] w-8 flex items-center justify-center text-white flex-row-reverse relative overflow-hidden">
                        <Star fill="currentColor" size={20} />
                        <div className="absolute top-0 right-0 h-full w-1/2 bg-gray-200 mix-blend-overlay"></div>
                     </div>
                  </div>
                  <p className="text-[13px] text-slate-800 pt-1">TrustScore <strong>4.3</strong> | <strong className="underline decoration-1 underline-offset-2">1,404</strong> reviews</p>
               </div>

               <div className="flex gap-4 text-orange-400">
                  <div className="w-6 h-6 rounded flex flex-col items-center justify-center cursor-pointer font-bold leading-none ring-2 ring-orange-300 bg-white shadow-sm hover:-translate-y-0.5 transition">in</div>
                  <div className="w-6 h-6 rounded flex flex-col items-center justify-center cursor-pointer font-bold leading-none ring-2 ring-orange-300 bg-white shadow-sm hover:-translate-y-0.5 transition">X</div>
                  <div className="w-6 h-6 rounded flex flex-col items-center justify-center cursor-pointer font-bold leading-none ring-2 ring-orange-300 bg-white shadow-sm hover:-translate-y-0.5 transition">ig</div>
                  <div className="w-6 h-6 rounded flex flex-col items-center justify-center cursor-pointer font-bold leading-none ring-2 ring-orange-300 bg-white shadow-sm hover:-translate-y-0.5 transition">tk</div>
                  <div className="w-6 h-6 rounded flex flex-col items-center justify-center cursor-pointer font-bold leading-none ring-2 ring-orange-300 bg-white shadow-sm hover:-translate-y-0.5 transition">fb</div>
               </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-start-3">
               <h4 className="font-bold text-slate-900 mb-6 text-lg tracking-tight">Build Your Resume</h4>
               <ul className="space-y-4 text-[15px] text-slate-700">
                  <li><a href="#" className="hover:underline underline-offset-4">AI Resume Builder</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Basic Resume Examples</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">How To Write a Resume</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Resume Builder App</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Cover Letter Builder</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Resume Examples</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Resume Templates</a></li>
               </ul>
            </div>
            
            <div>
               <h4 className="font-bold text-slate-900 mb-6 text-lg tracking-tight">Career Resources</h4>
               <ul className="space-y-4 text-[15px] text-slate-700">
                  <li><a href="#" className="hover:underline underline-offset-4">How To Make a Resume</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Professional Resume Summary</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Best Resume Formats</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Best Fonts for Your Resume</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">How To List References on a Resume</a></li>
               </ul>
            </div>

            <div>
               <h4 className="font-bold text-slate-900 mb-6 text-lg tracking-tight">About Resume Builder</h4>
               <ul className="space-y-4 text-[15px] text-slate-700">
                  <li><a href="#" className="hover:underline underline-offset-4">About Us</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Contact Us</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Privacy Policy</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Terms of Service</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Press</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Accessibility</a></li>
                  <li><a href="#" className="hover:underline underline-offset-4">Do Not Sell or Share</a></li>
               </ul>
            </div>

         </div>

         <div className="absolute right-10 bottom-24 w-12 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center text-slate-700 cursor-pointer hover:bg-slate-50 transition z-50">
            <Moon size={22} className="stroke-[1.5]" />
         </div>

         <div className="text-center text-slate-800 text-[15px] mt-10 w-full font-medium">
            © 2026, Bold Limited. All rights reserved.
         </div>
      </footer>
    </div>
  );
}
