export default function ProfessionalTemplate({ data }) {
  return (
    <div className="w-full min-h-full p-12 font-serif bg-white text-gray-900 border-t-[12px] border-blue-900 border-b-[12px]">
      <header className="mb-8 border-b-[3px] border-[#051C2C] pb-4">
        <h1 className="text-4xl font-extrabold uppercase tracking-widest mb-1 text-[#051C2C]">{data?.name || 'Your Name'}</h1>
        <div className="text-xs font-sans font-bold text-gray-600 flex items-center gap-4 uppercase tracking-[0.2em] mt-3">
          <span>{data?.email || 'email@example.com'}</span>
          {data?.phone && <><span className="w-1 h-1 bg-blue-900 rounded-full"></span><span>{data.phone}</span></>}
          {data?.location && <><span className="w-1 h-1 bg-blue-900 rounded-full"></span><span>{data.location}</span></>}
        </div>
      </header>

      {data?.summary && (
        <section className="mb-6">
           <h2 className="text-xs font-sans font-bold text-white bg-[#051C2C] uppercase tracking-widest px-3 py-1 inline-block mb-3">
            Professional Summary
          </h2>
          <p className="text-[13px] leading-relaxed text-justify mb-2">{data.summary}</p>
        </section>
      )}

      {data?.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-sans font-bold text-white bg-[#051C2C] uppercase tracking-widest px-3 py-1 inline-block mb-4">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i} className="relative pl-4 border-l border-gray-300">
                <div className="absolute w-2 h-2 bg-blue-900 -left-[4.5px] top-1.5 rounded-sm"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[15px] text-[#051C2C] uppercase tracking-wide">{exp.role}</h3>
                  <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-gray-500">{exp.duration}</span>
                </div>
                <div className="mb-2">
                  <span className="text-[13px] font-bold text-gray-800">{exp.company}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-justify text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data?.projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-sans font-bold text-white bg-[#051C2C] uppercase tracking-widest px-3 py-1 inline-block mb-4">
            Key Initiatives
          </h2>
          <div className="space-y-6">
            {data.projects.map((proj, i) => (
              <div key={i} className="pl-4 border-l border-gray-300 relative">
                <div className="absolute w-1.5 h-1.5 bg-gray-400 -left-[3px] top-2 rounded-full"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-[14px] text-gray-900">{proj.title}</h3>
                  <span className="text-[10px] font-sans text-blue-600 tracking-wider break-all max-w-[200px] text-right">{proj.link}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-justify mt-1 text-gray-700 whitespace-pre-line">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8 mb-6 mt-8">
        {data?.education?.length > 0 && (
          <section>
            <h2 className="text-xs font-sans font-bold text-[#051C2C] border-b-2 border-[#051C2C] uppercase tracking-widest mb-4 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-bold text-[14px] text-gray-900">{edu.degree}</h3>
                  <div className="flex justify-between items-baseline mt-1">
                    <p className="text-[12px] font-sans font-medium text-gray-700">{edu.institution}</p>
                    <span className="text-[10px] font-sans font-bold text-gray-500">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.skills?.length > 0 && (
          <section>
            <h2 className="text-xs font-sans font-bold text-[#051C2C] border-b-2 border-[#051C2C] uppercase tracking-widest mb-4 pb-1">
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
               {data.skills.map((skill, i) => (
                 <span key={i} className="text-[11px] font-sans font-bold text-gray-700 bg-gray-100 px-2 py-1 uppercase tracking-wider">
                   {skill}
                 </span>
               ))}
            </div>
          </section>
        )}
      </div>

    </div>
  );
}
