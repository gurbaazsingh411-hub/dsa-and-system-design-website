import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StackVisualizer = () => {
  const [stack, setStack] = useState<number[]>([3, 7, 1]);
  const [inputVal, setInputVal] = useState("");
  const [lastAction, setLastAction] = useState("");

  const push = () => {
    const val = inputVal.trim() ? parseInt(inputVal) : Math.floor(Math.random() * 99) + 1;
    if (isNaN(val)) return;
    setStack((prev) => [...prev, val]);
    setInputVal("");
    setLastAction(`push(${val})`);
  };

  const pop = () => {
    if (stack.length === 0) return;
    const val = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, -1));
    setLastAction(`pop() → ${val}`);
  };

  const peek = () => {
    if (stack.length === 0) return;
    setLastAction(`peek() → ${stack[stack.length - 1]}`);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="number"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Val"
          className="w-16 rounded-lg border border-border bg-background px-2 py-1.5 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button onClick={push} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 transition">
          Push
        </button>
        <button onClick={pop} disabled={stack.length === 0} className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-muted transition disabled:opacity-50">
          Pop
        </button>
        <button onClick={peek} disabled={stack.length === 0} className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-muted transition disabled:opacity-50">
          Peek
        </button>
        <button onClick={() => setStack([Math.floor(Math.random()*90)+10, Math.floor(Math.random()*90)+10, Math.floor(Math.random()*90)+10])} className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-muted transition ml-auto">
          Random
        </button>
      </div>

      {/* Action log */}
      {lastAction && (
        <div className="rounded-lg bg-secondary px-3 py-2 font-mono text-sm text-primary">
          → {lastAction}
        </div>
      )}

      {/* Stack visualization */}
      <div className="flex flex-col-reverse items-center gap-1 min-h-[200px] rounded-lg border border-border bg-background p-4">
        {stack.length === 0 && (
          <span className="text-sm text-muted-foreground italic">Stack is empty</span>
        )}
        <AnimatePresence>
          {stack.map((val, i) => (
            <motion.div
              key={`${val}-${i}`}
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -20 }}
              className={`flex h-12 w-32 items-center justify-center rounded-lg border font-mono text-lg font-bold transition-colors ${
                i === stack.length - 1
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-secondary text-secondary-foreground"
              }`}
            >
              {val}
              {i === stack.length - 1 && (
                <span className="ml-2 text-xs text-primary/70">← top</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        LIFO — Last In, First Out
      </p>
    </div>
  );
};

export default StackVisualizer;
