import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LLNode {
  id: number;
  value: number;
}

let nextId = 5;

const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState<LLNode[]>([
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [searching, setSearching] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [...prev.slice(-9), msg]);

  const insertAtHead = () => {
    const val = inputVal ? parseInt(inputVal) : Math.floor(Math.random() * 90) + 1;
    if (isNaN(val)) return;
    const newNode: LLNode = { id: nextId++, value: val };
    setNodes((prev) => [newNode, ...prev]);
    setInputVal("");
    addLog(`Inserted ${val} at head`);
  };

  const insertAtTail = () => {
    const val = inputVal ? parseInt(inputVal) : Math.floor(Math.random() * 90) + 1;
    if (isNaN(val)) return;
    const newNode: LLNode = { id: nextId++, value: val };
    setNodes((prev) => [...prev, newNode]);
    setInputVal("");
    addLog(`Inserted ${val} at tail`);
  };

  const deleteHead = () => {
    if (nodes.length === 0) return;
    addLog(`Deleted head (${nodes[0].value})`);
    setNodes((prev) => prev.slice(1));
  };

  const deleteTail = () => {
    if (nodes.length === 0) return;
    addLog(`Deleted tail (${nodes[nodes.length - 1].value})`);
    setNodes((prev) => prev.slice(0, -1));
  };

  const reverseList = () => {
    setNodes((prev) => [...prev].reverse());
    addLog("Reversed the linked list");
  };

  const searchValue = async () => {
    const val = parseInt(inputVal);
    if (isNaN(val)) return;
    setSearching(true);
    addLog(`Searching for ${val}...`);
    for (let i = 0; i < nodes.length; i++) {
      setHighlightId(nodes[i].id);
      await new Promise((r) => setTimeout(r, 400));
      if (nodes[i].value === val) {
        addLog(`✓ Found ${val} at index ${i}`);
        setTimeout(() => setHighlightId(null), 800);
        setSearching(false);
        return;
      }
    }
    addLog(`✗ ${val} not found`);
    setHighlightId(null);
    setSearching(false);
  };

  const clearList = () => {
    setNodes([]);
    addLog("Cleared the list");
  };

  const randomizeList = () => {
    const newNodes = Array.from({ length: 4 }, (_, i) => ({
      id: nextId++,
      value: Math.floor(Math.random() * 90) + 10,
    }));
    setNodes(newNodes);
    addLog("Generated random list");
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
        <button onClick={insertAtHead} disabled={searching} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110 transition">
          + Head
        </button>
        <button onClick={insertAtTail} disabled={searching} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110 transition">
          + Tail
        </button>
        <button onClick={deleteHead} disabled={searching || nodes.length === 0} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-muted transition disabled:opacity-50">
          − Head
        </button>
        <button onClick={deleteTail} disabled={searching || nodes.length === 0} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-muted transition disabled:opacity-50">
          − Tail
        </button>
        <button onClick={reverseList} disabled={searching || nodes.length < 2} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-muted transition disabled:opacity-50">
          Reverse
        </button>
        <button onClick={clearList} disabled={searching || nodes.length === 0} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-muted transition disabled:opacity-50">
          Clear
        </button>
        <button onClick={randomizeList} disabled={searching} className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-muted transition">
          Random
        </button>
        <button onClick={searchValue} disabled={searching || !inputVal} className="rounded-lg bg-primary/10 border border-primary/20 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition disabled:opacity-50">
          Search
        </button>
      </div>

      {/* Linked list visualization */}
      <div className="rounded-lg bg-secondary/50 p-6 overflow-x-auto">
        <div className="flex items-center gap-0 min-w-max">
          {/* Head label */}
          {nodes.length > 0 && (
            <div className="text-xs font-mono text-primary mr-2 flex flex-col items-center">
              <span>HEAD</span>
              <span>↓</span>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {nodes.map((node, i) => (
              <motion.div
                key={node.id}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="flex items-center"
              >
                {/* Node */}
                <div
                  className={`flex rounded-lg border-2 transition-colors duration-200 ${
                    highlightId === node.id
                      ? "border-primary bg-primary/20 ring-2 ring-primary/30"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="px-4 py-3 text-center min-w-[3rem]">
                    <span className="font-mono text-sm font-bold text-foreground">{node.value}</span>
                  </div>
                  <div className="border-l border-border px-2 py-3 flex items-center">
                    <span className="text-xs text-muted-foreground font-mono">
                      {i < nodes.length - 1 ? "→" : "∅"}
                    </span>
                  </div>
                </div>

                {/* Arrow to next */}
                {i < nodes.length - 1 && (
                  <div className="flex items-center px-1">
                    <div className="w-6 h-0.5 bg-muted-foreground/40" />
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-muted-foreground/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {nodes.length === 0 && (
            <div className="text-sm text-muted-foreground font-mono py-6 px-4">Empty list — add a node to begin</div>
          )}
        </div>
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

export default LinkedListVisualizer;
