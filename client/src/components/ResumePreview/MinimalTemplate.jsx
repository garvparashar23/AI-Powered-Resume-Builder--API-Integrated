export default function MinimalTemplate({ data }) {
  return (
    <div className="w-full h-full p-10 font-sans bg-white text-gray-800">
      <div className="text-center mb-10">
        <h1 className="text-3xl tracking-widest font-light text-gray-900 uppercase mb-2">
          {data?.name || 'Your Name'}
        </h1>
        <p className="text-sm text-gray-500 tracking-wider">
          {data?.email || 'email@example.com'}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {data?.summary && (
          <section className="text-center">
            <p className="text-sm text-gray-600 leading-loose italic max-w-2xl mx-auto">
              "{data.summary}"
            </p>
          </section>
        )}

        {data?.experience?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2 mb-6">
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="pl-4 border-l-2 border-gray-200">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800 text-base">{exp.role} at {exp.company}</h3>
                    <span className="text-xs text-gray-400 tracking-wider uppercase">{exp.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.projects?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2 mb-6 mt-8">
              Projects
            </h2>
            <div className="space-y-6">
              {data.projects.map((proj, i) => (
                <div key={i} className="pl-4 border-l-2 border-gray-200">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800 text-base">{proj.title}</h3>
                    <span className="text-xs text-gray-400 tracking-wider lowercase">{proj.link}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mt-2">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.education?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2 mb-6 mt-8">
              Education
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-gray-800 text-sm">{edu.degree}</h3>
                  <p className="text-sm text-gray-500">{edu.institution}</p>
                  <p className="text-xs text-gray-400 mt-1">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.skills?.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2 mb-6 mt-8">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="text-xs text-gray-600 border border-gray-200 px-3 py-1 rounded-full">
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
