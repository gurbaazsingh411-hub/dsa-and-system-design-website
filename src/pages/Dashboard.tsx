import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, CheckCircle2, Code2, Flame, Map, BookOpen, Trophy, Target, Bookmark, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useProgress } from "@/contexts/ProgressContext";
import { dsaRoadmap, systemDesignRoadmap } from "@/lib/roadmapData";
import { problems } from "@/lib/problemsData";

const StatCard = ({ icon: Icon, label, value, subtext, color = "text-primary" }: {
  icon: typeof BarChart3;
  label: string;
  value: string | number;
  subtext?: string;
  color?: string;
}) => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className={`text-3xl font-bold font-mono ${color}`}>{value}</p>
    {subtext && <p className="text-xs text-muted-foreground mt-1">{subtext}</p>}
  </div>
);

const ProgressBar = ({ value, label, color = "bg-primary" }: { value: number; label: string; color?: string }) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-mono text-primary">{value}%</span>
    </div>
    <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  </div>
);

const Dashboard = () => {
  const {
    completedTopics,
    solvedProblems,
    dsaProgress,
    systemDesignProgress,
    overallProgress,
    totalProblems,
    solvedCount,
    streakDays,
    isTopicCompleted,
    toggleTopicComplete,
    isProblemSolved,
    toggleProblemSolved,
    bookmarks,
    isBookmarked,
    toggleBookmark,
  } = useProgress();

  const dsaSolved = solvedProblems.filter((id) => {
    const p = problems.find((pr) => pr.id === id);
    return p && dsaRoadmap.some((n) => n.id === p.topicId);
  }).length;

  const level = overallProgress < 10 ? "Beginner" : overallProgress < 30 ? "Novice" : overallProgress < 50 ? "Intermediate" : overallProgress < 75 ? "Advanced" : "Expert";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative pt-24 pb-20">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2">
              Your <span className="text-primary text-glow">Dashboard</span>
            </h1>
            <p className="text-muted-foreground mb-8">Track your learning journey</p>

            {/* Stats grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <StatCard icon={Target} label="Overall Progress" value={`${overallProgress}%`} subtext={`${completedTopics.length} of ${dsaRoadmap.length + systemDesignRoadmap.length} topics`} />
              <StatCard icon={Code2} label="Problems Solved" value={solvedCount} subtext={`of ${totalProblems} total`} />
              <StatCard icon={Trophy} label="Current Level" value={level} subtext="Keep going!" />
              <StatCard icon={Flame} label="Streak" value={`${streakDays}d`} subtext={streakDays > 0 ? "You're on fire!" : "Solve a problem to start"} />
            </div>

            {/* Progress bars */}
            <div className="rounded-xl border border-border bg-card p-6 mb-8 space-y-5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Roadmap Progress
              </h2>
              <ProgressBar label="DSA" value={dsaProgress} />
              <ProgressBar label="System Design" value={systemDesignProgress} color="bg-info" />
              <ProgressBar label="Overall" value={overallProgress} color="bg-primary" />
            </div>

            {/* Two column: topics + problems */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* DSA Topics */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Map className="h-5 w-5 text-primary" />
                  DSA Topics
                </h2>
                <div className="space-y-2">
                  {dsaRoadmap.map((node) => {
                    const completed = isTopicCompleted(node.id);
                    return (
                      <div
                        key={node.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-2.5"
                      >
                        <Link to={`/topic/${node.id}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                          <span className="text-lg">{node.icon}</span>
                          <span className={`text-sm font-medium ${completed ? "text-node-completed" : "text-foreground"}`}>
                            {node.title}
                          </span>
                        </Link>
                        <button
                          onClick={() => toggleTopicComplete(node.id)}
                          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                            completed
                              ? "border-node-completed bg-node-completed/20 text-node-completed"
                              : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Design Topics */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-info" />
                  System Design Topics
                </h2>
                <div className="space-y-2">
                  {systemDesignRoadmap.map((node) => {
                    const completed = isTopicCompleted(node.id);
                    return (
                      <div
                        key={node.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-2.5"
                      >
                        <Link to={`/topic/${node.id}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                          <span className="text-lg">{node.icon}</span>
                          <span className={`text-sm font-medium ${completed ? "text-node-completed" : "text-foreground"}`}>
                            {node.title}
                          </span>
                        </Link>
                        <button
                          onClick={() => toggleTopicComplete(node.id)}
                          className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                            completed
                              ? "border-node-completed bg-node-completed/20 text-node-completed"
                              : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Problems tracker */}
            <div className="rounded-xl border border-border bg-card p-6 mt-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-primary" />
                Practice Problems
              </h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {problems.map((problem) => {
                  const solved = isProblemSolved(problem.id);
                  const diffColor = problem.difficulty === "easy" ? "text-primary" : problem.difficulty === "medium" ? "text-warning" : "text-destructive";
                  return (
                    <div
                      key={problem.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`text-[10px] font-mono uppercase tracking-wider ${diffColor} shrink-0`}>
                          {problem.difficulty.slice(0, 1)}
                        </span>
                        <Link
                          to={`/practice/${problem.topicId}?problem=${problem.id}`}
                          className="text-sm truncate hover:text-primary transition-colors"
                        >
                          {problem.title}
                        </Link>
                      </div>
                      <button
                        onClick={() => toggleProblemSolved(problem.id)}
                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors shrink-0 ${
                          solved
                            ? "border-primary bg-primary/20 text-primary"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bookmarks */}
            <div className="rounded-xl border border-border bg-card p-6 mt-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Bookmark className="h-5 w-5 text-primary fill-primary" />
                Bookmarks ({bookmarks.length})
              </h2>
              {bookmarks.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No bookmarks yet. Bookmark topics or problems to save them for later revision.</p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {bookmarks.map((id) => {
                    const topic = [...dsaRoadmap, ...systemDesignRoadmap].find((n) => n.id === id);
                    const problem = problems.find((p) => p.id === id);
                    if (topic) {
                      return (
                        <div key={id} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2">
                          <Link to={`/topic/${topic.id}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors truncate">
                            <span>{topic.icon}</span>
                            <span className="truncate">{topic.title}</span>
                          </Link>
                          <button onClick={() => toggleBookmark(id)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    }
                    if (problem) {
                      const diffColor = problem.difficulty === "easy" ? "text-primary" : problem.difficulty === "medium" ? "text-warning" : "text-destructive";
                      return (
                        <div key={id} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`text-[10px] font-mono uppercase tracking-wider ${diffColor} shrink-0`}>{problem.difficulty.slice(0, 1)}</span>
                            <Link to={`/practice/${problem.topicId}?problem=${problem.id}`} className="text-sm truncate hover:text-primary transition-colors">
                              {problem.title}
                            </Link>
                          </div>
                          <button onClick={() => toggleBookmark(id)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
