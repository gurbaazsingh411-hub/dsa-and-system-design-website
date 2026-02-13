import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

type Algorithm = "bubble" | "merge" | "quick";

const INITIAL_ARRAY = [38, 27, 43, 3, 9, 82, 10, 55, 21, 64];

const SortingVisualizer = () => {
  const [array, setArray] = useState<number[]>([...INITIAL_ARRAY]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<Algorithm>("bubble");
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [log, setLog] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState("");
  const cancelRef = useRef(false);

  const maxVal = array.length > 0 ? Math.max(...INITIAL_ARRAY, ...array) : 100;

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const addLog = (msg: string) => setLog((prev) => [...prev.slice(-14), msg]);

  const reset = () => {
    cancelRef.current = true;
    setTimeout(() => {
      setArray([...INITIAL_ARRAY]);
      setComparing([]);
      setSorted([]);
      setSwapping([]);
      setIsRunning(false);
      setLog([]);
      cancelRef.current = false;
    }, 50);
  };

  const randomize = () => {
    if (isRunning) return;
    const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 5);
    setArray(arr);
    setSorted([]);
    setComparing([]);
    setSwapping([]);
    setLog([]);
  };

  const addElement = () => {
    const val = parseInt(inputVal);
    if (isNaN(val)) return;
    setArray((prev) => [...prev, val]);
    setInputVal("");
    setSorted([]);
  };

  const removeLast = () => {
    setArray((prev) => prev.slice(0, -1));
    setSorted([]);
  };

  const clearArray = () => {
    setArray([]);
    setSorted([]);
    setLog([]);
  };

  const bubbleSort = useCallback(async () => {
    const arr = [...array];
    addLog("Starting Bubble Sort...");
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (cancelRef.current) return;
        setComparing([j, j + 1]);
        await delay(speed);
        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          addLog(`Swap ${arr[j]} ↔ ${arr[j + 1]}`);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await delay(speed);
          setSwapping([]);
        }
      }
      setSorted((prev) => [...prev, arr.length - 1 - i]);
    }
    setComparing([]);
    setSorted(arr.map((_, i) => i));
    addLog("✓ Bubble Sort complete!");
  }, [array, speed]);

  const mergeSort = useCallback(async () => {
    const arr = [...array];
    addLog("Starting Merge Sort...");

    const mergeSortHelper = async (start: number, end: number) => {
      if (cancelRef.current || start >= end) return;
      const mid = Math.floor((start + end) / 2);
      await mergeSortHelper(start, mid);
      await mergeSortHelper(mid + 1, end);
      await mergeHelper(arr, start, mid, end);
    };

    const mergeHelper = async (a: number[], s: number, m: number, e: number) => {
      const left = a.slice(s, m + 1);
      const right = a.slice(m + 1, e + 1);
      let i = 0, j = 0, k = s;
      while (i < left.length && j < right.length) {
        if (cancelRef.current) return;
        setComparing([k]);
        await delay(speed);
        if (left[i] <= right[j]) {
          a[k] = left[i]; i++;
        } else {
          a[k] = right[j]; j++;
        }
        setArray([...a]);
        k++;
      }
      while (i < left.length) { a[k] = left[i]; i++; k++; setArray([...a]); }
      while (j < right.length) { a[k] = right[j]; j++; k++; setArray([...a]); }
      addLog(`Merged [${s}..${e}]`);
    };

    await mergeSortHelper(0, arr.length - 1);
    setComparing([]);
    setSorted(arr.map((_, i) => i));
    addLog("✓ Merge Sort complete!");
  }, [array, speed]);

  const quickSort = useCallback(async () => {
    const arr = [...array];
    addLog("Starting Quick Sort...");

    const partition = async (lo: number, hi: number): Promise<number> => {
      const pivot = arr[hi];
      addLog(`Pivot: ${pivot}`);
      let i = lo;
      for (let j = lo; j < hi; j++) {
        if (cancelRef.current) return lo;
        setComparing([j, hi]);
        await delay(speed);
        if (arr[j] < pivot) {
          setSwapping([i, j]);
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          await delay(speed / 2);
          setSwapping([]);
          i++;
        }
      }
      [arr[i], arr[hi]] = [arr[hi], arr[i]];
      setArray([...arr]);
      setSorted((prev) => [...prev, i]);
      return i;
    };

    const qs = async (lo: number, hi: number) => {
      if (lo >= hi || cancelRef.current) return;
      const p = await partition(lo, hi);
      await qs(lo, p - 1);
      await qs(p + 1, hi);
    };

    await qs(0, arr.length - 1);
    setComparing([]);
    setSorted(arr.map((_, i) => i));
    addLog("✓ Quick Sort complete!");
  }, [array, speed]);

  const run = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setSorted([]);
    setLog([]);
    cancelRef.current = false;
    if (algorithm === "bubble") await bubbleSort();
    else if (algorithm === "merge") await mergeSort();
    else await quickSort();
    setIsRunning(false);
  };

  const getBarColor = (index: number) => {
    if (sorted.includes(index)) return "bg-emerald-500";
    if (swapping.includes(index)) return "bg-destructive";
    if (comparing.includes(index)) return "bg-primary";
    return "bg-muted-foreground/40";
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {(["bubble", "merge", "quick"] as Algorithm[]).map((alg) => (
          <button
            key={alg}
            onClick={() => !isRunning && setAlgorithm(alg)}
            disabled={isRunning}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              algorithm === alg
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            } disabled:opacity-50`}
          >
            {alg === "bubble" ? "Bubble Sort" : alg === "merge" ? "Merge Sort" : "Quick Sort"}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <label className="text-xs text-muted-foreground">Speed</label>
          <input
            type="range"
            min={50}
            max={500}
            step={50}
            value={550 - speed}
            onChange={(e) => setSpeed(550 - Number(e.target.value))}
            className="w-20 accent-primary"
            disabled={isRunning}
          />
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end justify-center gap-1.5 h-48 rounded-lg bg-secondary/50 p-4">
        {array.map((val, i) => (
          <motion.div
            key={i}
            layout
            className={`relative flex-1 max-w-12 rounded-t ${getBarColor(i)} transition-colors duration-150`}
            style={{ height: `${(val / maxVal) * 100}%` }}
          >
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground">
              {val}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Val"
            className="w-16 rounded-lg border border-border bg-background px-2 py-1.5 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={isRunning}
          />
          <button
            onClick={addElement}
            disabled={isRunning}
            className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-muted transition disabled:opacity-50"
          >
            Add
          </button>
        </div>

        <button
          onClick={removeLast}
          disabled={isRunning || array.length === 0}
          className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-muted transition disabled:opacity-50"
        >
          Pop
        </button>

        <button
          onClick={clearArray}
          disabled={isRunning || array.length === 0}
          className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-muted transition disabled:opacity-50"
        >
          Clear
        </button>

        <div className="h-4 w-[1px] bg-border mx-1" />

        <button
          onClick={run}
          disabled={isRunning || array.length === 0}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "▶ Sort"}
        </button>
        <button
          onClick={reset}
          className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
        >
          Reset
        </button>
        <button
          onClick={randomize}
          disabled={isRunning}
          className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50"
        >
          Random
        </button>
      </div>

      {/* Log */}
      {log.length > 0 && (
        <div className="rounded-lg bg-background border border-border p-3 max-h-32 overflow-y-auto">
          <p className="text-xs font-mono text-muted-foreground mb-1">Execution Log</p>
          {log.map((msg, i) => (
            <p key={i} className="text-xs font-mono text-foreground/80">{msg}</p>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-primary" /> Comparing</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-destructive" /> Swapping</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-emerald-500" /> Sorted</span>
      </div>
    </div>
  );
};

export default SortingVisualizer;
