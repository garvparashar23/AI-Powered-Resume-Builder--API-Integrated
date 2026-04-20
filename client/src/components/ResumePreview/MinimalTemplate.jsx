export default function MinimalTemplate({ data }) {
  return (
    <div className="w-full min-h-full p-16 font-sans bg-white text-gray-800">
      <div className="text-center mb-16">
        <div className="inline-block bg-gray-900 px-6 py-1.5 mb-6">
           <h1 className="text-xs tracking-[0.3em] font-light text-white uppercase">
             {data?.name || 'Your Name'}
           </h1>
        </div>
        <p className="text-[11px] text-gray-500 tracking-[0.2em] uppercase font-medium flex justify-center gap-6">
          <span>{data?.email || 'email@example.com'}</span>
          {data?.phone && <span>{data.phone}</span>}
        </p>
        <div className="w-full max-w-[200px] h-px bg-gray-200 mx-auto mt-8"></div>
      </div>

      <div className="max-w-2xl mx-auto space-y-16">
        {data?.summary && (
          <section className="text-center">
            <p className="text-[14px] text-gray-600 leading-loose mx-auto font-light">
              {data.summary}
            </p>
          </section>
        )}

        {data?.experience?.length > 0 && (
          <section>
            <div className="flex justify-center mb-10">
              <h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.3em] px-4 py-1 border border-gray-200">
                Experience
              </h2>
            </div>
            <div className="space-y-12">
              {data.experience.map((exp, i) => (
                <div key={i} className="text-center">
                  <h3 className="font-medium text-gray-900 text-sm tracking-wide uppercase mb-1">{exp.role}</h3>
                  <div className="flex justify-center items-center gap-3 text-xs text-gray-500 uppercase tracking-widest mb-4">
                    <span>{exp.company}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{exp.duration}</span>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed font-light text-justify max-w-[500px] mx-auto">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.projects?.length > 0 && (
          <section>
            <div className="flex justify-center mb-10 mt-16">
              <h2 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.3em] px-4 py-1 border border-gray-200">
                Projects
              </h2>
            </div>
            <div className="space-y-10">
              {data.projects.map((proj, i) => (
                <div key={i} className="text-center">
                  <h3 className="font-medium text-gray-900 text-sm tracking-wide mb-1">{proj.title}</h3>
                  <p className="text-[10px] text-gray-400 lowercase tracking-wider mb-4 font-mono">{proj.link}</p>
                  <p className="text-[13px] text-gray-600 leading-relaxed font-light text-justify max-w-[500px] mx-auto whitespace-pre-line">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-12 mt-16 text-center">
          {data?.education?.length > 0 && (
            <section>
              <h2 className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 border-b border-gray-100 pb-2 inline-block">
                Education
              </h2>
              <div className="space-y-6">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-medium text-gray-800 text-[13px]">{edu.degree}</h3>
                    <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider">{edu.institution}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data?.skills?.length > 0 && (
            <section>
              <h2 className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 border-b border-gray-100 pb-2 inline-block">
                Skills
              </h2>
              <div className="flex flex-col gap-3 items-center">
                {data.skills.map((skill, i) => (
                  <span key={i} className="text-[12px] font-light text-gray-700 tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
