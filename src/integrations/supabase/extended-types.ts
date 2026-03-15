import { Database as GeneratedDatabase } from './types';

export type ExtendedDatabase = GeneratedDatabase & {
  public: {
    Tables: {
      user_progress: {
        Row: {
          user_id: string;
          completed_topics: string[];
          solved_problems: string[];
          bookmarks: string[];
          notes: Record<string, string>;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          completed_topics?: string[];
          solved_problems?: string[];
          bookmarks?: string[];
          notes?: Record<string, string>;
          updated_at?: string;
        };
        Update: {
          completed_topics?: string[];
          solved_problems?: string[];
          bookmarks?: string[];
          notes?: Record<string, string>;
          updated_at?: string;
        };
      };
    };
  };
};
