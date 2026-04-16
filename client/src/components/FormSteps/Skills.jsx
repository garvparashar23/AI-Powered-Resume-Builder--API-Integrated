import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../../store/resumeSlice';
import { Plus, X } from 'lucide-react';

export default function Skills() {
  const { skills } = useSelector((state) => state.resume.currentResume);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      dispatch(updateField({
        field: 'skills',
        value: [...skills, inputValue.trim()]
      }));
      setInputValue('');
    }
  };

  const handleRemove = (skillToRemove) => {
    dispatch(updateField({
      field: 'skills',
      value: skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <p className="text-gray-500 text-sm mt-1">Highlight your core competencies.</p>
      </div>

      <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm space-y-4">
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
            placeholder="e.g. React, Node.js, Project Management"
          />
          <button 
            type="submit" 
            disabled={!inputValue.trim()}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 hover:bg-blue-600 flex items-center justify-center min-w-[80px]"
          >
            <Plus size={20} />
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium border border-indigo-100">
              {skill}
              <button 
                onClick={() => handleRemove(skill)}
                className="hover:text-red-500 transition ml-1 bg-white rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {skills.length === 0 && (
             <p className="text-sm text-gray-400 italic">No skills added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
