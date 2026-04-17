import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentResume: {
    name: '',
    email: '',
    skills: [],
    education: [],
    experience: [],
    projects: [],
    summary: '',
    templateId: 'modern',
  },
  currentStep: 1, // 1: Personal, 2: Education, 3: Experience, 4: Projects, 5: Skills, 6: Summary
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.currentResume[field] = value;
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setResumeData: (state, action) => {
      state.currentResume = action.payload;
    },
    resetResume: (state) => {
      state.currentResume = initialState.currentResume;
      state.currentStep = 1;
    }
  },
});

export const { updateField, setStep, setResumeData, resetResume } = resumeSlice.actions;

export default resumeSlice.reducer;
