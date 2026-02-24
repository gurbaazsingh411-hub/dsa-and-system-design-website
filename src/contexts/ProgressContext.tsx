import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { dsaRoadmap, systemDesignRoadmap } from "@/lib/roadmapData";
import { problems } from "@/lib/problemsData";

interface ProgressState {
  completedTopics: string[];
  solvedProblems: string[];
  bookmarks: string[];
}

interface ProgressContextType extends ProgressState {
  toggleTopicComplete: (topicId: string) => void;
  toggleProblemSolved: (problemId: string) => void;
  toggleBookmark: (id: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
  isProblemSolved: (problemId: string) => boolean;
  isBookmarked: (id: string) => boolean;
  dsaProgress: number;
  systemDesignProgress: number;
  overallProgress: number;
  totalProblems: number;
  solvedCount: number;
  streakDays: number;
}

const STORAGE_KEY = "algoarchitect-progress";

const defaultState: ProgressState = {
  completedTopics: [],
  solvedProblems: [],
  bookmarks: [],
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggleTopicComplete = useCallback((topicId: string) => {
    setState((prev) => ({
      ...prev,
      completedTopics: prev.completedTopics.includes(topicId)
        ? prev.completedTopics.filter((id) => id !== topicId)
        : [...prev.completedTopics, topicId],
    }));
  }, []);

  const toggleProblemSolved = useCallback((problemId: string) => {
    setState((prev) => ({
      ...prev,
      solvedProblems: prev.solvedProblems.includes(problemId)
        ? prev.solvedProblems.filter((id) => id !== problemId)
        : [...prev.solvedProblems, problemId],
    }));
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(id)
        ? prev.bookmarks.filter((b) => b !== id)
        : [...prev.bookmarks, id],
    }));
  }, []);

  const isTopicCompleted = useCallback((topicId: string) => state.completedTopics.includes(topicId), [state.completedTopics]);
  const isProblemSolved = useCallback((problemId: string) => state.solvedProblems.includes(problemId), [state.solvedProblems]);
  const isBookmarked = useCallback((id: string) => state.bookmarks.includes(id), [state.bookmarks]);

  const dsaTopicCount = dsaRoadmap.length;
  const sdTopicCount = systemDesignRoadmap.length;
  const dsaCompleted = state.completedTopics.filter((id) => dsaRoadmap.some((n) => n.id === id)).length;
  const sdCompleted = state.completedTopics.filter((id) => systemDesignRoadmap.some((n) => n.id === id)).length;

  const dsaProgress = dsaTopicCount > 0 ? Math.round((dsaCompleted / dsaTopicCount) * 100) : 0;
  const systemDesignProgress = sdTopicCount > 0 ? Math.round((sdCompleted / sdTopicCount) * 100) : 0;
  const totalTopics = dsaTopicCount + sdTopicCount;
  const totalCompleted = dsaCompleted + sdCompleted;
  const overallProgress = totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0;

  const totalProblems = problems.length;
  const solvedCount = state.solvedProblems.length;

  // Simple streak: count consecutive days with activity (mock for now)
  const streakDays = solvedCount > 0 ? Math.min(solvedCount, 7) : 0;

  return (
    <ProgressContext.Provider
      value={{
        ...state,
        toggleTopicComplete,
        toggleProblemSolved,
        toggleBookmark,
        isTopicCompleted,
        isProblemSolved,
        isBookmarked,
        dsaProgress,
        systemDesignProgress,
        overallProgress,
        totalProblems,
        solvedCount,
        streakDays,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
