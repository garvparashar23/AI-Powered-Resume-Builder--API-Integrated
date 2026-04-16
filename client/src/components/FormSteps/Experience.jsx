import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../../store/resumeSlice';
import { Plus, Trash2 } from 'lucide-react';

export default function Experience() {
  const { experience } = useSelector((state) => state.resume.currentResume);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(updateField({
      field: 'experience',
      value: [...experience, { company: '', role: '', duration: '', description: '' }]
    }));
  };

  const handleChange = (index, field, value) => {
    const newExp = [...experience];
    newExp[index] = { ...newExp[index], [field]: value };
    dispatch(updateField({ field: 'experience', value: newExp }));
  };

  const handleRemove = (index) => {
    const newExp = experience.filter((_, i) => i !== index);
    dispatch(updateField({ field: 'experience', value: newExp }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center bg-white sticky top-0 py-2 z-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
          <p className="text-gray-500 text-sm mt-1">Add your professional experience.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-1 text-sm bg-indigo-50 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-100 transition">
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50 relative group">
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
            <div className="grid gap-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    placeholder="Tech Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleChange(index, 'role', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    placeholder="Software Engineer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => handleChange(index, 'duration', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                  placeholder="Jan 2020 - Present"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white resize-none"
                  placeholder="Describe your responsibilities..."
                />
              </div>
            </div>
          </div>
        ))}
        {experience.length === 0 && (
          <div className="text-center py-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-gray-500">
            No experience entries yet. Click Add to begin.
          </div>
        )}
      </div>
    </div>
  );
}
