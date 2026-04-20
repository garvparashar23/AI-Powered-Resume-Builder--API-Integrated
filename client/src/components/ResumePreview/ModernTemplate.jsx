export default function ModernTemplate({ data }) {
  return (
    <div className="w-full min-h-full flex flex-col font-sans bg-white leading-relaxed text-gray-800">
      <header className="bg-slate-800 text-white p-8 mb-6 shadow-sm">
        <h1 className="text-3xl font-light tracking-widest uppercase mb-1">{data?.name || 'Your Name'}</h1>
        <div className="text-[#a1b0c0] text-[11px] tracking-widest font-bold uppercase flex items-center gap-4 mt-2">
          <span>{data?.email || 'email@example.com'}</span>
          {data?.phone && <><span className="w-px h-3 bg-slate-600"></span><span>{data.phone}</span></>}
          {data?.location && <><span className="w-px h-3 bg-slate-600"></span><span>{data.location}</span></>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8 px-8 pb-8">
        <div className="col-span-2 space-y-8">
          {data?.summary && (
            <section>
              <h2 className="text-[12px] font-bold text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
                Executive Summary
              </h2>
              <p className="text-[13px] text-gray-700 leading-relaxed text-justify">{data.summary}</p>
            </section>
          )}

          {data?.experience?.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900 text-[14px] uppercase tracking-wide">{exp.role}</h3>
                      <span className="text-[11px] font-bold tracking-widest uppercase text-slate-500 whitespace-nowrap">{exp.duration}</span>
                    </div>
                    <p className="text-[12px] font-bold text-gray-600 mb-2 uppercase tracking-wide">{exp.company}</p>
                    <p className="text-[13px] text-gray-700 text-justify leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data?.projects?.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
                Strategic Projects
              </h2>
              <div className="space-y-6">
                {data.projects.map((proj, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900 text-[13px]">{proj.title}</h3>
                      <span className="text-[10px] font-mono tracking-wider text-slate-500 whitespace-nowrap">{proj.link}</span>
                    </div>
                    <p className="text-[13px] text-gray-700 text-justify whitespace-pre-line leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-1 space-y-8 pl-6 border-l border-gray-200">
          {data?.skills?.length > 0 && (
            <section>
              <h2 className="text-[12px] font-bold text-slate-800 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Technical Skills</h2>
              <ul className="flex flex-col gap-2">
                {data.skills.map((skill, i) => (
                  <li key={i} className="text-[12px] font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-800 rounded-sm"></span> {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data?.education?.length > 0 && (
            <section>
               <h2 className="text-[12px] font-bold text-slate-800 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Education</h2>
              <div className="space-y-5">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-bold text-gray-900 text-[13px] leading-tight">{edu.degree}</h3>
                    <p className="text-[12px] text-gray-600 leading-snug mt-1">{edu.institution}</p>
                    <p className="text-[11px] font-bold text-slate-500 tracking-widest uppercase mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
