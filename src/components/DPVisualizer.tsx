import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Info } from "lucide-react";

type DPType = "knapsack" | "lcs";

interface DPStep {
  i: number;
  j: number;
  value: number;
  explanation: string;
  comparison?: [number, number]; // [valIfIncluded, valIfExcluded]
  currentGrid: number[][];
}

export const DPVisualizer = () => {
  const [type, setType] = useState<DPType>("knapsack");
  const [steps, setSteps] = useState<DPStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);

  // Knapsack data
  const items = [
    { name: "A", w: 2, v: 3 },
    { name: "B", w: 3, v: 4 },
    { name: "C", w: 4, v: 5 },
    { name: "D", w: 5, v: 8 },
  ];
  const capacity = 7;

  // LCS data
  const s1 = "ALGO";
  const s2 = "ARCH";

  const generateKnapsackSteps = () => {
    const n = items.length;
    const W = capacity;
    const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
    const newSteps: DPStep[] = [{ i: 0, j: 0, value: 0, explanation: "Initialize DP table with zeros.", currentGrid: dp.map(r => [...r]) }];

    for (let i = 1; i <= n; i++) {
      const item = items[i - 1];
      for (let j = 0; j <= W; j++) {
        let val: number;
        let explanation: string;
        let comparison: [number, number] | undefined;

        if (item.w <= j) {
          const inc = item.v + dp[i - 1][j - item.w];
          const exc = dp[i - 1][j];
          val = Math.max(inc, exc);
          comparison = [inc, exc];
          explanation = inc > exc 
            ? `Including item ${item.name} (Value: ${item.v}, Weight: ${item.w}) is better (${inc} > ${exc}).`
            : `Excluding item ${item.name} is better or equal (${exc} >= ${inc}).`;
        } else {
          val = dp[i - 1][j];
          explanation = `Item ${item.name} is too heavy for capacity ${j}. Carry over previous value.`;
        }
        
        dp[i][j] = val;
        newSteps.push({
          i, j, value: val,
          explanation,
          comparison,
          currentGrid: dp.map(r => [...r])
        });
      }
    }
    setSteps(newSteps);
  };

  const generateLCSSteps = () => {
    const n = s1.length;
    const m = s2.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    const newSteps: DPStep[] = [{ i: 0, j: 0, value: 0, explanation: "Initialize DP table with zeros.", currentGrid: dp.map(r => [...r]) }];

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        let val: number;
        let explanation: string;
        if (s1[i - 1] === s2[j - 1]) {
          val = 1 + dp[i - 1][j - 1];
          explanation = `Characters match ('${s1[i - 1]}'). Increment diagonal value: 1 + ${dp[i - 1][j - 1]} = ${val}`;
        } else {
          val = Math.max(dp[i - 1][j], dp[i][j - 1]);
          explanation = `Characters differ ('${s1[i - 1]}' vs '${s2[j - 1]}'). Take max of top and left: max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${val}`;
        }
        dp[i][j] = val;
        newSteps.push({
          i, j, value: val,
          explanation,
          currentGrid: dp.map(r => [...r])
        });
      }
    }
    setSteps(newSteps);
  };

  useEffect(() => {
    if (type === "knapsack") generateKnapsackSteps();
    else generateLCSSteps();
    setCurrentStep(0);
    setIsPlaying(false);
  }, [type]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps, speed]);

  const step = steps[currentStep] || steps[0];

  return (
    <div className="p-6 space-y-8 bg-card text-card-foreground">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex bg-secondary/50 p-1 rounded-xl border border-border">
          <button
            onClick={() => setType("knapsack")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${type === "knapsack" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
          >
            0/1 Knapsack
          </button>
          <button
            onClick={() => setType("lcs")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${type === "lcs" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}
          >
            LCS
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => setCurrentStep(0)} disabled={currentStep === 0}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} disabled={currentStep === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="primary" size="icon" className="h-10 w-10 shadow-lg shadow-primary/20" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))} disabled={currentStep === steps.length - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl border border-border bg-slate-950/50 p-6 overflow-hidden shadow-inner">
            <div className="overflow-auto max-h-[400px]">
              <table className="w-full border-separate border-spacing-1">
                <thead>
                  <tr>
                    <th className="w-12 h-10 bg-secondary/30 rounded-lg text-[10px] font-bold text-muted-foreground uppercase border border-border">Idx</th>
                    {type === "knapsack" ? (
                      Array.from({ length: capacity + 1 }).map((_, j) => (
                        <th key={j} className="w-12 h-10 bg-secondary/30 rounded-lg text-[10px] font-bold text-muted-foreground border border-border">{j}w</th>
                      ))
                    ) : (
                      <>
                        <th className="w-12 h-10 bg-secondary/30 rounded-lg text-[10px] font-bold text-muted-foreground border border-border">-</th>
                        {s2.split("").map((char, j) => (
                          <th key={j} className="w-12 h-10 bg-secondary/30 rounded-lg text-[10px] font-bold text-muted-foreground border border-border uppercase">{char}</th>
                        ))}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {step.currentGrid.map((row, i) => (
                    <tr key={i}>
                      <td className="w-12 h-12 bg-secondary/20 rounded-lg text-center text-xs font-bold border border-border">
                        {type === "knapsack" ? (i === 0 ? "0" : items[i-1].name) : (i === 0 ? "0" : s1[i-1])}
                      </td>
                      {row.map((val, j) => {
                        const isCurrent = step.i === i && step.j === j;
                        const isComputed = i > 0 && (type === "knapsack" ? true : j > 0) && (i < step.i || (i === step.i && j <= step.j));
                        
                        return (
                          <motion.td
                            key={j}
                            initial={false}
                            animate={{
                              scale: isCurrent ? 1.1 : 1,
                              backgroundColor: isCurrent ? "rgba(var(--primary-rgb), 0.2)" : (isComputed ? "rgba(var(--primary-rgb), 0.05)" : "transparent"),
                              borderColor: isCurrent ? "rgb(var(--primary))" : "rgba(255,255,255,0.1)"
                            }}
                            className={`w-12 h-12 rounded-lg text-center text-sm font-mono border transition-all ${isCurrent ? "z-10 shadow-lg" : ""}`}
                          >
                            {val}
                          </motion.td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-secondary/10 p-6 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Info className="h-4 w-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Logic Engine</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              {step.explanation}
            </p>
            {step.comparison && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <span className="block text-[10px] font-bold uppercase text-emerald-500/60 mb-1">Pick</span>
                  <span className="text-lg font-mono font-bold text-emerald-500">{step.comparison[0]}</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                  <span className="block text-[10px] font-bold uppercase text-rose-500/60 mb-1">Skip</span>
                  <span className="text-lg font-mono font-bold text-rose-500">{step.comparison[1]}</span>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border p-6 space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Problem Constraints</h3>
            {type === "knapsack" ? (
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.name} className="flex items-center justify-between text-xs p-2 rounded-lg bg-secondary/30">
                    <span className="font-bold">Item {item.name}</span>
                    <span className="text-muted-foreground">Value: {item.v} | W: {item.w}</span>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-bold">Max Capacity</span>
                  <span className="text-sm font-mono font-bold text-primary">{capacity}w</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">String 1</span>
                  <div className="p-2 rounded-lg bg-secondary/30 font-mono text-center tracking-widest font-bold tracking-[0.3em] uppercase">{s1}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">String 2</span>
                  <div className="p-2 rounded-lg bg-secondary/30 font-mono text-center tracking-widest font-bold tracking-[0.3em] uppercase">{s2}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DPVisualizer;
