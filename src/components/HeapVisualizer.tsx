import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeapVisualizer = () => {
  const [heap, setHeap] = useState<number[]>([2, 5, 8, 10, 14, 12, 15]);
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const [inputVal, setInputVal] = useState("");
  const [isMinHeap, setIsMinHeap] = useState(true);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [...prev.slice(-9), msg]);

  const shouldSwap = (parentVal: number, childVal: number) =>
    isMinHeap ? childVal < parentVal : childVal > parentVal;

  const insert = async (val: number) => {
    const arr = [...heap, val];
    setHeap([...arr]);
    addLog(`Inserted ${val}`);

    let i = arr.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      setHighlightIdx(i);
      await new Promise((r) => setTimeout(r, 400));
      if (shouldSwap(arr[parent], arr[i])) {
        addLog(`Bubble up: swap ${arr[i]} ↔ ${arr[parent]}`);
        [arr[parent], arr[i]] = [arr[i], arr[parent]];
        setHeap([...arr]);
        i = parent;
      } else {
        break;
      }
    }
    setHighlightIdx(null);
  };

  const extractRoot = async () => {
    if (heap.length === 0) return;
    const arr = [...heap];
    const removed = arr[0];
    addLog(`Extracted root: ${removed}`);

    if (arr.length === 1) {
      setHeap([]);
      return;
    }

    arr[0] = arr[arr.length - 1];
    arr.pop();
    setHeap([...arr]);

    let i = 0;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let target = i;

      if (left < arr.length && shouldSwap(arr[target], arr[left])) target = left;
      if (right < arr.length && shouldSwap(arr[target], arr[right])) target = right;

      if (target === i) break;

      setHighlightIdx(target);
      await new Promise((r) => setTimeout(r, 400));
      addLog(`Bubble down: swap ${arr[i]} ↔ ${arr[target]}`);
      [arr[i], arr[target]] = [arr[target], arr[i]];
      setHeap([...arr]);
      i = target;
    }
    setHighlightIdx(null);
  };

  const handleInsert = () => {
    const val = inputVal ? parseInt(inputVal) : Math.floor(Math.random() * 50) + 1;
    if (isNaN(val)) return;
    setInputVal("");
    insert(val);
  };

  const reset = () => {
    setHeap(isMinHeap ? [2, 5, 8, 10, 14, 12, 15] : [15, 12, 14, 10, 5, 8, 2]);
    setHighlightIdx(null);
    setLog([]);
  };

  // Tree layout
  const getLevel = (i: number) => Math.floor(Math.log2(i + 1));
  const maxLevel = heap.length > 0 ? getLevel(heap.length - 1) : 0;

  const getNodePosition = (index: number) => {
    const level = getLevel(index);
    const levelStart = Math.pow(2, level) - 1;
    const posInLevel = index - levelStart;
    const totalInLevel = Math.pow(2, level);
    const width = 100;
    const spacing = width / (totalInLevel + 1);
    const x = spacing * (posInLevel + 1);
    const y = level * 60 + 30;
    return { x, y };
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => { setIsMinHeap(!isMinHeap); reset(); }}
          className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
        >
          {isMinHeap ? "Min Heap" : "Max Heap"} ⟲
        </button>
        <input
          type="number"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Value"
          className="w-20 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button onClick={handleInsert} disabled={heap.length >= 15} className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
          Insert
        </button>
        <button onClick={extractRoot} disabled={heap.length === 0} className="rounded-lg bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50">
          Extract {isMinHeap ? "Min" : "Max"}
        </button>
        <button onClick={reset} className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">
          Reset
        </button>
      </div>

      {/* Tree visualization */}
      <div className="rounded-lg bg-secondary/50 p-4">
        <svg className="w-full" style={{ height: `${(maxLevel + 1) * 70 + 20}px` }} preserveAspectRatio="xMidYMin meet" viewBox={`0 0 100 ${(maxLevel + 1) * 60 + 40}`}>
          {/* Edges */}
          {heap.map((_, i) => {
            if (i === 0) return null;
            const parent = Math.floor((i - 1) / 2);
            const pPos = getNodePosition(parent);
            const cPos = getNodePosition(i);
            return (
              <line
                key={`edge-${i}`}
                x1={pPos.x}
                y1={pPos.y}
                x2={cPos.x}
                y2={cPos.y}
                className="stroke-muted-foreground/30"
                strokeWidth="0.4"
              />
            );
          })}

          {/* Nodes */}
          <AnimatePresence>
            {heap.map((val, i) => {
              const pos = getNodePosition(i);
              const isHighlighted = highlightIdx === i;
              const isRoot = i === 0;
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="4"
                    className={`transition-colors duration-200 ${
                      isHighlighted
                        ? "fill-primary stroke-primary"
                        : isRoot
                        ? "fill-primary/20 stroke-primary"
                        : "fill-card stroke-border"
                    }`}
                    strokeWidth="0.3"
                  />
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={`text-[3px] font-mono font-bold ${
                      isHighlighted ? "fill-primary-foreground" : "fill-foreground"
                    }`}
                  >
                    {val}
                  </text>
                </motion.g>
              );
            })}
          </AnimatePresence>
        </svg>
      </div>

      {/* Array representation */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        <span className="text-xs text-muted-foreground font-mono mr-2">Array:</span>
        {heap.map((val, i) => (
          <div
            key={i}
            className={`flex flex-col items-center rounded border px-2 py-1 text-xs font-mono transition-colors ${
              highlightIdx === i ? "border-primary bg-primary/20 text-primary" : "border-border bg-card text-foreground"
            }`}
          >
            <span className="font-bold">{val}</span>
            <span className="text-[9px] text-muted-foreground">[{i}]</span>
          </div>
        ))}
      </div>

      {/* Log */}
      {log.length > 0 && (
        <div className="rounded-lg bg-background border border-border p-3 max-h-28 overflow-y-auto">
          <p className="text-xs font-mono text-muted-foreground mb-1">Operations</p>
          {log.map((msg, i) => (
            <p key={i} className="text-xs font-mono text-foreground/80">{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeapVisualizer;
