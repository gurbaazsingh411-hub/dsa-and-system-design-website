import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState<number[]>([5, 12, 8]);
  const [inputVal, setInputVal] = useState("");
  const [lastAction, setLastAction] = useState("");
  const [highlightFront, setHighlightFront] = useState(false);

  const enqueue = () => {
    const val = inputVal.trim() ? parseInt(inputVal) : Math.floor(Math.random() * 99) + 1;
    if (isNaN(val)) return;
    setQueue((prev) => [...prev, val]);
    setInputVal("");
    setLastAction(`enqueue(${val})`);
    setHighlightFront(false);
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    const val = queue[0];
    setQueue((prev) => prev.slice(1));
    setLastAction(`dequeue() → ${val}`);
    setHighlightFront(false);
  };

  const peek = () => {
    if (queue.length === 0) return;
    setHighlightFront(true);
    setLastAction(`peek() → ${queue[0]}`);
    setTimeout(() => setHighlightFront(false), 1500);
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
        <button onClick={enqueue} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 transition">
          Enqueue
        </button>
        <button onClick={dequeue} disabled={queue.length === 0} className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-muted transition disabled:opacity-50">
          Dequeue
        </button>
        <button onClick={peek} disabled={queue.length === 0} className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-muted transition disabled:opacity-50">
          Peek
        </button>
        <button onClick={() => setQueue([Math.floor(Math.random()*90)+10, Math.floor(Math.random()*90)+10, Math.floor(Math.random()*90)+10])} className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-muted transition ml-auto">
          Random
        </button>
      </div>

      {/* Action log */}
      {lastAction && (
        <div className="rounded-lg bg-secondary px-3 py-2 font-mono text-sm text-primary">
          → {lastAction}
        </div>
      )}

      {/* Queue visualization - horizontal */}
      <div className="rounded-lg border border-border bg-background p-4 min-h-[100px] flex items-center">
        {queue.length === 0 ? (
          <span className="text-sm text-muted-foreground italic mx-auto">Queue is empty</span>
        ) : (
          <div className="flex items-center gap-0 w-full overflow-x-auto">
            {/* Dequeue arrow */}
            <div className="flex flex-col items-center mr-2 shrink-0">
              <span className="text-[10px] font-mono text-muted-foreground">OUT</span>
              <span className="text-primary">←</span>
            </div>

            <AnimatePresence>
              {queue.map((val, i) => (
                <motion.div
                  key={`${val}-${i}-${queue.length}`}
                  initial={{ opacity: 0, scale: 0.5, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5, x: -30 }}
                  className={`flex h-14 w-14 items-center justify-center border-r font-mono text-lg font-bold transition-all duration-300 shrink-0 ${
                    i === 0
                      ? highlightFront
                        ? "border-primary bg-primary/20 text-primary shadow-[0_0_16px_hsl(152_76%_52%/0.3)]"
                        : "border-primary/40 bg-primary/5 text-primary"
                      : "border-border bg-secondary text-secondary-foreground"
                  } ${i === 0 ? "rounded-l-lg border-l" : ""} ${i === queue.length - 1 ? "rounded-r-lg" : ""}`}
                >
                  <div className="flex flex-col items-center">
                    <span>{val}</span>
                    {i === 0 && <span className="text-[9px] text-primary/70">front</span>}
                    {i === queue.length - 1 && i !== 0 && <span className="text-[9px] text-muted-foreground">rear</span>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Enqueue arrow */}
            <div className="flex flex-col items-center ml-2 shrink-0">
              <span className="text-[10px] font-mono text-muted-foreground">IN</span>
              <span className="text-primary">→</span>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        FIFO — First In, First Out
      </p>
    </div>
  );
};

export default QueueVisualizer;
