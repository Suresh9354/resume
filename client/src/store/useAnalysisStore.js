import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const mapRecordToAnalysis = (record) => ({
  id: record._id,
  score: record.score ?? 0,
  skills: record.skills ?? [],
  suggestions: record.suggestions ?? [],
  jobRole: record.jobRole ?? 'Unspecified',
  missingSkills: record.missingSkills ?? [],
  extractedText: record.extractedText ?? '',
  fileUrl: record.fileUrl ?? '',
  createdAt: record.createdAt,
});

const useAnalysisStore = create(
  persist(
    (set) => ({
      currentAnalysis: null,
      uploadHistory: [],
      setAnalysis: (analysis) => set({ currentAnalysis: analysis }),
      clearAnalysis: () => set({ currentAnalysis: null, uploadHistory: [] }),
      addToHistory: (item) =>
        set((state) => ({
          uploadHistory: [item, ...state.uploadHistory].slice(0, 20),
        })),
    }),
    { name: 'resume-analysis-store', partialize: (state) => ({ currentAnalysis: state.currentAnalysis }) }
  )
);

export default useAnalysisStore;
