import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BinarySearchVisualizer = () => {
  const defaultArr = [2, 5, 8, 12, 16, 23, 38, 42, 56, 72, 91];
  const [arr, setArr] = useState(defaultArr);
  const [target, setTarget] = useState(23);
  const [elementInput, setElementInput] = useState("");
  // ... rest of state
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [mid, setMid] = useState<number | null>(null);
  const [found, setFound] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepLog, setStepLog] = useState<string[]>([]);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [speed, setSpeed] = useState(700);
  const timeoutRef = useRef<number[]>([]);

  const clearAnimation = useCallback(() => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
    setLeft(null);
    setRight(null);
    setMid(null);
    setFound(null);
    setStepLog([]);
    setChecked(new Set());
    setIsPlaying(false);
  }, []);

  const addElement = () => {
    const val = parseInt(elementInput);
    if (isNaN(val)) return;
    clearAnimation();
    setArr((prev) => [...prev, val].sort((a, b) => a - b));
    setElementInput("");
  };

  const removeLast = () => {
    if (arr.length === 0) return;
    clearAnimation();
    setArr((prev) => prev.slice(0, -1));
  };

  const randomize = () => {
    clearAnimation();
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 99) + 1).sort((a, b) => a - b);
    setArr(newArr);
  };
  
  // playSearch remains mostly same but uses dynamic arr length
  const playSearch = useCallback(() => {
    if (arr.length === 0) return;
    clearAnimation();
    setIsPlaying(true);

    // Pre-compute steps
    const steps: { l: number; r: number; m: number; log: string; done: boolean; foundIdx: number | null }[] = [];
    let l = 0, r = arr.length - 1;

    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      if (arr[m] === target) {
        steps.push({ l, r, m, log: `mid=${m}, arr[${m}]=${arr[m]} == ${target} ✓ Found!`, done: true, foundIdx: m });
        break;
      } else if (arr[m] < target) {
        steps.push({ l, r, m, log: `mid=${m}, arr[${m}]=${arr[m]} < ${target} → search right`, done: false, foundIdx: null });
        l = m + 1;
      } else {
        steps.push({ l, r, m, log: `mid=${m}, arr[${m}]=${arr[m]} > ${target} → search left`, done: false, foundIdx: null });
        r = m - 1;
      }
    }

    if (steps.length === 0 || !steps[steps.length - 1].done) {
      steps.push({ l, r: r, m: -1, log: `Target ${target} not found in array.`, done: true, foundIdx: null });
    }

    const checkedSet = new Set<number>();

    steps.forEach((step, i) => {
      const t = window.setTimeout(() => {
        setLeft(step.l);
        setRight(step.r);
        setMid(step.m >= 0 ? step.m : null);
        setStepLog((prev) => [...prev, `Step ${i + 1}: ${step.log}`]);
        if (step.m >= 0) checkedSet.add(step.m);
        setChecked(new Set(checkedSet));
        if (step.done) {
          setFound(step.foundIdx);
          setIsPlaying(false);
        }
      }, i * speed);
      timeoutRef.current.push(t);
    });
  }, [arr, target, speed, clearAnimation]);

  useEffect(() => {
    return () => timeoutRef.current.forEach(clearTimeout);
  }, []);

  const getCellColor = (index: number) => {
    if (found === index) return "border-primary bg-primary/20 text-primary shadow-[0_0_16px_hsl(152_76%_52%/0.4)] scale-110";
    if (mid === index) return "border-warning bg-warning/10 text-warning scale-105";
    if (left !== null && right !== null && index >= left && index <= right) return "border-primary/30 bg-primary/5 text-foreground";
    if (checked.has(index)) return "border-border bg-secondary/30 text-muted-foreground/50";
    return "border-border bg-secondary text-secondary-foreground";
  };

  const getPointerLabel = (index: number) => {
    const labels: string[] = [];
    if (left === index) labels.push("L");
    if (right === index) labels.push("R");
    if (mid === index) labels.push("M");
    return labels.join(",");
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">Target:</span>
          <input
            type="number"
            value={target}
            onChange={(e) => { clearAnimation(); setTarget(Number(e.target.value)); }}
            className="w-16 rounded-lg border border-border bg-background px-2 py-1.5 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="h-4 w-[1px] bg-border mx-1" />

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={elementInput}
            onChange={(e) => setElementInput(e.target.value)}
            placeholder="Val"
            className="w-16 rounded-lg border border-border bg-background px-2 py-1.5 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={addElement}
            disabled={isPlaying}
            className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-muted transition"
          >
            Add
          </button>
        </div>

        <button
          onClick={removeLast}
          disabled={isPlaying || arr.length === 0}
          className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-muted transition"
        >
          Pop
        </button>

        <button
          onClick={randomize}
          disabled={isPlaying}
          className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-muted transition"
        >
          Random
        </button>

        <div className="h-4 w-[1px] bg-border mx-1" />

        <button
          onClick={playSearch}
          disabled={isPlaying || arr.length === 0}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 transition disabled:opacity-50"
        >
          ▶ {isPlaying ? "Searching..." : "Search"}
        </button>
        <button
          onClick={clearAnimation}
          className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-muted transition"
        >
          Reset
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-muted-foreground">Speed:</span>
          <input
            type="range"
            min={200}
            max={1200}
            step={100}
            value={1400 - speed}
            onChange={(e) => setSpeed(1400 - Number(e.target.value))}
            className="w-16 accent-primary"
          />
        </div>
      </div>

      {/* Array visualization */}
      <div className="rounded-lg border border-border bg-background p-4 overflow-x-auto">
        <div className="flex items-end gap-1.5 justify-center min-w-fit">
          {arr.map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              {/* Pointer labels */}
              <div className="h-5 text-[10px] font-mono font-bold text-primary">
                {getPointerLabel(i)}
              </div>
              {/* Cell */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 font-mono text-sm font-bold transition-all duration-300 ${getCellColor(i)}`}
              >
                {val}
              </div>
              {/* Index */}
              <span className="text-[10px] font-mono text-muted-foreground">{i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-2 border-primary/30 bg-primary/5" />
          <span className="text-muted-foreground">Search range</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-2 border-warning bg-warning/10" />
          <span className="text-muted-foreground">Mid pointer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-2 border-primary bg-primary/20" />
          <span className="text-muted-foreground">Found</span>
        </div>
      </div>

      {/* Step log */}
      <div className="rounded-lg bg-secondary px-4 py-3 max-h-[120px] overflow-y-auto">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">Steps:</span>
        {stepLog.length === 0 ? (
          <span className="text-xs text-muted-foreground italic">Press Search to start</span>
        ) : (
          stepLog.map((log, i) => (
            <p key={i} className="font-mono text-xs text-foreground">{log}</p>
          ))
        )}
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;
