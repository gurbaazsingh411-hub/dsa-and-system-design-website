import { useState, useMemo } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import { ArrowLeft, Play, CheckCircle2, XCircle, RotateCcw, Bookmark, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getProblemsByTopic, getProblemById, type Problem } from "@/lib/problemsData";
import { dsaRoadmap } from "@/lib/roadmapData";
import { useProgress } from "@/contexts/ProgressContext";

const difficultyStyle = {
  easy: "text-primary bg-primary/10 border-primary/20",
  medium: "text-warning bg-warning/10 border-warning/20",
  hard: "text-destructive bg-destructive/10 border-destructive/20",
};

const languageMap: Record<string, string> = {
  javascript: "javascript",
  python: "python",
  java: "java",
};

type DifficultyFilter = "all" | "easy" | "medium" | "hard";

const PracticePage = () => {
  const { topicId } = useParams();
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("problem");
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");

  const topicProblems = topicId ? getProblemsByTopic(topicId) : [];

  const filteredProblems = useMemo(() => {
    return topicProblems.filter((p) => {
      const matchesDifficulty = difficultyFilter === "all" || p.difficulty === difficultyFilter;
      const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDifficulty && matchesSearch;
    });
  }, [topicProblems, difficultyFilter, searchQuery]);

  const currentProblem = problemId ? getProblemById(problemId) : filteredProblems[0] || topicProblems[0];
  const topicNode = dsaRoadmap.find((n) => n.id === topicId);

  if (!currentProblem) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-24 text-center">
          <h1 className="text-2xl font-bold">No problems found</h1>
          <Link to="/roadmap" className="mt-4 inline-flex items-center gap-2 text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Roadmap
          </Link>
        </div>
      </div>
    );
  }

  const difficultyFilters: { value: DifficultyFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16 flex flex-col">
        {/* Problem selector bar with filters */}
        <div className="border-b border-border bg-card/60 backdrop-blur px-4 py-2 space-y-2">
          {/* Top row: back link + search + difficulty filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to={`/topic/${topicId}`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {topicNode?.title || "Back"}
            </Link>
            <div className="h-4 w-px bg-border" />

            {/* Search input */}
            <div className="relative shrink-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problems..."
                className="w-44 rounded-md border border-border bg-background pl-8 pr-3 py-1 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Difficulty filter pills */}
            <div className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
              {difficultyFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setDifficultyFilter(f.value)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    difficultyFilter === f.value
                      ? f.value === "all"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : difficultyStyle[f.value] + " border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-muted-foreground ml-auto shrink-0">
              {filteredProblems.length} of {topicProblems.length} problems
            </span>
          </div>

          {/* Bottom row: problem tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            {filteredProblems.map((p) => (
              <Link
                key={p.id}
                to={`/practice/${topicId}?problem=${p.id}`}
                className={`shrink-0 rounded-md border px-3 py-1 text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  p.id === currentProblem.id
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${
                  p.difficulty === "easy" ? "bg-primary" : p.difficulty === "medium" ? "bg-warning" : "bg-destructive"
                }`} />
                {p.title}
              </Link>
            ))}
            {filteredProblems.length === 0 && (
              <p className="text-xs text-muted-foreground italic py-1">No problems match your filters</p>
            )}
          </div>
        </div>

        {/* Main split layout */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Left: Problem description */}
          <div className="lg:w-[45%] border-r border-border overflow-y-auto p-6">
            <ProblemDescription problem={currentProblem} />
          </div>

          {/* Right: Code editor + output */}
          <div className="lg:w-[55%] flex flex-col">
            <CodeEditor problem={currentProblem} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProblemDescription = ({ problem }: { problem: Problem }) => {
  const { isBookmarked, toggleBookmark } = useProgress();
  const bookmarked = isBookmarked(problem.id);
  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={problem.id}>
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold">{problem.title}</h1>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-mono uppercase ${difficultyStyle[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
      </div>
      <button
        onClick={() => toggleBookmark(problem.id)}
        className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors shrink-0 ${
          bookmarked
            ? "border-primary bg-primary/10 text-primary"
            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
        }`}
        title={bookmarked ? "Remove bookmark" : "Bookmark for later"}
      >
        <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
      </button>
    </div>

    <div className="prose-sm text-muted-foreground whitespace-pre-line leading-relaxed mb-6">
      {problem.description}
    </div>

    <div className="space-y-4 mb-6">
      {problem.examples.map((ex, i) => (
        <div key={i} className="rounded-lg border border-border bg-secondary/50 p-4">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Example {i + 1}</p>
          <div className="space-y-1 font-mono text-sm">
            <p><span className="text-muted-foreground">Input: </span><span className="text-foreground">{ex.input}</span></p>
            <p><span className="text-muted-foreground">Output: </span><span className="text-primary">{ex.output}</span></p>
            {ex.explanation && (
              <p className="text-muted-foreground text-xs mt-1">{ex.explanation}</p>
            )}
          </div>
        </div>
      ))}
    </div>

    <div>
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Constraints</p>
      <ul className="space-y-1">
        {problem.constraints.map((c, i) => (
          <li key={i} className="text-sm text-muted-foreground font-mono">• {c}</li>
        ))}
      </ul>
    </div>
  </motion.div>
  );
};

const CodeEditor = ({ problem }: { problem: Problem }) => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(problem.starterCode[language] || "");
  const [output, setOutput] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<{ passed: boolean; input: string; expected: string; got: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(problem.starterCode[lang] || "");
    setOutput([]);
    setTestResults([]);
  };

  const resetCode = () => {
    setCode(problem.starterCode[language] || "");
    setOutput([]);
    setTestResults([]);
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    setTestResults([]);

    setTimeout(() => {
      if (language !== "javascript") {
        setOutput([`⚠ Browser execution only supports JavaScript. Showing your code for review.`]);
        setIsRunning(false);
        return;
      }

      try {
        const logs: string[] = [];
        const mockConsole = { log: (...args: unknown[]) => logs.push(args.map(String).join(" ")) };

        // Try to evaluate and run test cases
        const wrappedCode = `(function(console) { ${code}\n return typeof twoSum !== 'undefined' ? twoSum : typeof isValid !== 'undefined' ? isValid : typeof containsDuplicate !== 'undefined' ? containsDuplicate : typeof maxSubArray !== 'undefined' ? maxSubArray : typeof reverseString !== 'undefined' ? reverseString : typeof maxDepth !== 'undefined' ? maxDepth : null; })(mockConsole)`;
        
        // eslint-disable-next-line no-eval
        const fn = eval(`(function(mockConsole) { ${code}\n; return { logs: [] }; })`);
        fn(mockConsole);

        if (logs.length > 0) {
          setOutput(logs);
        } else {
          setOutput(["Code executed successfully. Add console.log() to see output."]);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setOutput([`Error: ${message}`]);
      }

      // Mock test results
      const results = problem.testCases.map((tc) => ({
        passed: false,
        input: tc.input,
        expected: tc.expected,
        got: "—",
      }));
      setTestResults(results);
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Editor toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-card/60 px-4 py-2">
        <div className="flex items-center gap-1">
          {Object.keys(problem.starterCode).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`rounded-md px-3 py-1 text-xs font-mono font-medium transition-colors ${
                language === lang
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetCode}
            className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110 transition disabled:opacity-50"
          >
            <Play className="h-3 w-3" />
            {isRunning ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-[300px]">
        <Editor
          height="100%"
          language={languageMap[language] || "javascript"}
          value={code}
          onChange={(val) => setCode(val || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            roundedSelection: true,
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>

      {/* Output / Test Results */}
      <div className="border-t border-border bg-card/60 max-h-[200px] overflow-y-auto">
        <div className="px-4 py-2 border-b border-border">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Output
          </span>
        </div>
        <div className="p-4 space-y-2">
          {output.length === 0 && testResults.length === 0 && (
            <p className="text-xs text-muted-foreground italic">Click "Run Code" to see output</p>
          )}
          {output.map((line, i) => (
            <p key={i} className="font-mono text-sm text-foreground">{line}</p>
          ))}
          {testResults.length > 0 && (
            <div className="space-y-2 mt-2">
              {testResults.map((r, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 rounded-lg border p-3 text-xs font-mono ${
                    r.passed
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-secondary/50"
                  }`}
                >
                  {r.passed ? (
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-muted-foreground">Input: {r.input}</p>
                    <p className="text-muted-foreground">Expected: <span className="text-primary">{r.expected}</span></p>
                    <p className="text-muted-foreground">Got: <span className="text-foreground">{r.got}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
