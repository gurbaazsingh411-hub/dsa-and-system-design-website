import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { dsaRoadmap, systemDesignRoadmap } from "@/lib/roadmapData";
import { problems } from "@/lib/problemsData";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface ProgressState {
  completedTopics: string[];
  solvedProblems: string[];
  bookmarks: string[];
  notes: Record<string, string>;
}

interface ProgressContextType extends ProgressState {
  toggleTopicComplete: (topicId: string) => void;
  toggleProblemSolved: (problemId: string) => void;
  toggleBookmark: (id: string) => void;
  updateNote: (topicId: string, content: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
  isProblemSolved: (problemId: string) => boolean;
  isBookmarked: (id: string) => boolean;
  cloudSyncEnabled: boolean;
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
  notes: {},
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(false);
  const [state, setState] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultState;
    } catch {
      return defaultState;
    }
  });

  // Fetch from Supabase on Login
  useEffect(() => {
    if (!user) {
      setCloudSyncEnabled(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          const progressData = data as any; // Fallback for complex table types
          setState(prev => ({
            ...prev,
            completedTopics: Array.from(new Set([...prev.completedTopics, ...(progressData.completed_topics || [])])),
            solvedProblems: Array.from(new Set([...prev.solvedProblems, ...(progressData.solved_problems || [])])),
            bookmarks: Array.from(new Set([...prev.bookmarks, ...(progressData.bookmarks || [])])),
            notes: { ...prev.notes, ...(progressData.notes as Record<string, string> || {}) }
          }));
          setCloudSyncEnabled(true);
        } else {
          // First time user, sync local to cloud
          const { error: insertError } = await (supabase.from('user_progress' as any) as any)
            .insert({
              user_id: user.id,
              completed_topics: state.completedTopics,
              solved_problems: state.solvedProblems,
              bookmarks: state.bookmarks,
              notes: state.notes
            });
          
          if (insertError) throw insertError;
          setCloudSyncEnabled(true);
        }
      } catch (err: any) {
        console.error("Cloud sync error:", err);
      }
    };

    fetchProgress();
  }, [user]);

  // Push to Supabase on Change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    if (user && cloudSyncEnabled) {
      const pushProgress = async () => {
        const { error } = await (supabase.from('user_progress' as any) as any)
          .update({
            completed_topics: state.completedTopics,
            solved_problems: state.solvedProblems,
            bookmarks: state.bookmarks,
            notes: state.notes,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
        
        if (error) console.error("Error pushing progress:", error);
      };
      
      const timeout = setTimeout(pushProgress, 1000); // Debounce
      return () => clearTimeout(timeout);
    }
  }, [state, user, cloudSyncEnabled]);

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

  const updateNote = useCallback((topicId: string, content: string) => {
    setState(prev => ({
      ...prev,
      notes: { ...prev.notes, [topicId]: content }
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

  const streakDays = solvedCount > 0 ? Math.min(solvedCount, 7) : 0;

  return (
    <ProgressContext.Provider
      value={{
        ...state,
        toggleTopicComplete,
        toggleProblemSolved,
        toggleBookmark,
        updateNote,
        isTopicCompleted,
        isProblemSolved,
        isBookmarked,
        cloudSyncEnabled,
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
