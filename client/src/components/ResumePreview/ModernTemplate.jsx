export default function ModernTemplate({ data }) {
  return (
    <div className="w-full h-full flex flex-col p-8 font-sans bg-white leading-relaxed text-gray-800">
      <header className="border-b-4 border-blue-600 pb-6 mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase">{data?.name || 'Your Name'}</h1>
        <div className="text-blue-600 font-medium mt-2 flex items-center gap-4">
          <span>{data?.email || 'email@example.com'}</span>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          {data?.summary && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-800 inline-block"></span> Profile
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed text-justify">{data.summary}</p>
            </section>
          )}

          {data?.experience?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-800 inline-block"></span> Experience
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{exp.role}</h3>
                      <span className="text-sm font-semibold text-blue-600 whitespace-nowrap">{exp.duration}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-700 text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data?.projects?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-800 inline-block"></span> Projects
              </h2>
              <div className="space-y-5">
                {data.projects.map((proj, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{proj.title}</h3>
                      <span className="text-sm font-semibold text-blue-600 whitespace-nowrap">{proj.link}</span>
                    </div>
                    <p className="text-sm text-gray-700 text-justify">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-1 space-y-8 pl-6 border-l border-gray-200">
          {data?.skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 uppercase tracking-widest mb-4">Skills</h2>
              <ul className="flex flex-col gap-2">
                {data.skills.map((skill, i) => (
                  <li key={i} className="text-sm font-medium text-gray-700 pb-1 border-b border-gray-100">{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {data?.education?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-800 uppercase tracking-widest mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{edu.degree}</h3>
                    <p className="text-sm text-gray-600 leading-snug">{edu.institution}</p>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">{edu.year}</p>
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
