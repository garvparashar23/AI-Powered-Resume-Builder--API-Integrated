export default function ProfessionalTemplate({ data }) {
  return (
    <div className="w-full h-full p-10 font-serif bg-white text-gray-900 border-t-[12px] border-slate-800">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{data?.name || 'Your Name'}</h1>
        <div className="text-sm text-gray-700 flex justify-center items-center gap-2">
          <span>{data?.email || 'email@example.com'}</span>
        </div>
      </header>

      {data?.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-slate-800 uppercase tracking-widest mb-3 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
        </section>
      )}

      {data?.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-slate-800 uppercase tracking-widest mb-4 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">{exp.role}</h3>
                  <span className="text-sm italic">{exp.duration}</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-semibold uppercase text-slate-700">{exp.company}</span>
                </div>
                <p className="text-sm leading-relaxed text-justify">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data?.projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-slate-800 uppercase tracking-widest mb-4 pb-1">
            Projects
          </h2>
          <div className="space-y-5">
            {data.projects.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">{proj.title}</h3>
                  <span className="text-sm italic">{proj.link}</span>
                </div>
                <p className="text-sm leading-relaxed text-justify mt-1">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data?.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-slate-800 uppercase tracking-widest mb-4 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-base">{edu.degree}</h3>
                  <p className="text-sm text-slate-700">{edu.institution}</p>
                </div>
                <span className="text-sm italic">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data?.skills?.length > 0 && (
        <section>
          <h2 className="text-lg font-bold border-b-2 border-slate-800 uppercase tracking-widest mb-3 pb-1">
            Core Competencies
          </h2>
          <p className="text-sm leading-relaxed">
            {data.skills.join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
}
