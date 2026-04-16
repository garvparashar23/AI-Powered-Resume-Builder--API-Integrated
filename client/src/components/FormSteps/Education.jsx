import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../../store/resumeSlice';
import { Plus, Trash2 } from 'lucide-react';

export default function Education() {
  const { education } = useSelector((state) => state.resume.currentResume);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(updateField({
      field: 'education',
      value: [...education, { institution: '', degree: '', year: '' }]
    }));
  };

  const handleChange = (index, field, value) => {
    const newEdu = [...education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    dispatch(updateField({ field: 'education', value: newEdu }));
  };

  const handleRemove = (index) => {
    const newEdu = education.filter((_, i) => i !== index);
    dispatch(updateField({ field: 'education', value: newEdu }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center bg-white sticky top-0 py-2 z-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Education</h2>
          <p className="text-gray-500 text-sm mt-1">Add your educational background.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-1 text-sm bg-indigo-50 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-100 transition">
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50 relative group">
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
            <div className="grid gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleChange(index, 'institution', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                  placeholder="Harvard University"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    placeholder="B.S. Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleChange(index, 'year', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
                    placeholder="2018 - 2022"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {education.length === 0 && (
          <div className="text-center py-10 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-gray-500">
            No education entries yet. Click Add to begin.
          </div>
        )}
      </div>
    </div>
  );
}
