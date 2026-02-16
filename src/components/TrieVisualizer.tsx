import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface TrieNodeData {
  char: string;
  children: Map<string, TrieNodeData>;
  isEnd: boolean;
  id: string;
}

const createNode = (char: string, parentId: string): TrieNodeData => ({
  char,
  children: new Map(),
  isEnd: false,
  id: `${parentId}-${char}`,
});

const TrieVisualizer = () => {
  const [root] = useState<TrieNodeData>(() => {
    const r: TrieNodeData = { char: "", children: new Map(), isEnd: false, id: "root" };
    // Pre-insert some words
    for (const word of ["cat", "car", "card", "care", "do", "dog"]) {
      let node = r;
      for (const ch of word) {
        if (!node.children.has(ch)) {
          node.children.set(ch, createNode(ch, node.id));
        }
        node = node.children.get(ch)!;
      }
      node.isEnd = true;
    }
    return r;
  });

  const [, setTick] = useState(0);
  const rerender = () => setTick((t) => t + 1);

  const [inputVal, setInputVal] = useState("");
  const [highlightIds, setHighlightIds] = useState<Set<string>>(new Set());
  const [matchIds, setMatchIds] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [mode, setMode] = useState<"insert" | "search">("insert");

  const addLog = (msg: string) => setLog((prev) => [...prev.slice(-9), msg]);

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const insertWord = useCallback(async () => {
    const word = inputVal.trim().toLowerCase();
    if (!word || !/^[a-z]+$/.test(word)) return;
    setIsAnimating(true);
    setHighlightIds(new Set());
    setMatchIds(new Set());
    addLog(`Inserting "${word}"...`);

    let node = root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, createNode(ch, node.id));
        rerender();
      }
      node = node.children.get(ch)!;
      setHighlightIds((prev) => new Set([...prev, node.id]));
      await delay(400);
    }
    node.isEnd = true;
    rerender();
    addLog(`✓ "${word}" inserted`);
    setInputVal("");
    setTimeout(() => setHighlightIds(new Set()), 600);
    setIsAnimating(false);
  }, [inputVal, root]);

  const searchPrefix = useCallback(async () => {
    const prefix = inputVal.trim().toLowerCase();
    if (!prefix || !/^[a-z]+$/.test(prefix)) return;
    setIsAnimating(true);
    setHighlightIds(new Set());
    setMatchIds(new Set());
    addLog(`Searching prefix "${prefix}"...`);

    let node = root;
    const path = new Set<string>();
    for (const ch of prefix) {
      if (!node.children.has(ch)) {
        addLog(`✗ Prefix "${prefix}" not found`);
        setIsAnimating(false);
        return;
      }
      node = node.children.get(ch)!;
      path.add(node.id);
      setHighlightIds(new Set(path));
      await delay(400);
    }

    // Highlight all descendants
    const collectIds = (n: TrieNodeData, ids: Set<string>) => {
      ids.add(n.id);
      for (const child of n.children.values()) collectIds(child, ids);
    };
    const allIds = new Set<string>();
    collectIds(node, allIds);
    setMatchIds(allIds);
    setHighlightIds(new Set(path));

    // Count words
    let wordCount = 0;
    const countWords = (n: TrieNodeData) => {
      if (n.isEnd) wordCount++;
      for (const child of n.children.values()) countWords(child);
    };
    countWords(node);
    addLog(`✓ Found ${wordCount} word(s) with prefix "${prefix}"`);
    setIsAnimating(false);
  }, [inputVal, root]);

  const handleAction = () => {
    if (mode === "insert") insertWord();
    else searchPrefix();
  };

  // Flatten trie into renderable tree structure
  type RenderNode = { node: TrieNodeData; x: number; y: number; parentX?: number; parentY?: number };

  const flattenTrie = (): RenderNode[] => {
    const nodes: RenderNode[] = [];
    const layoutLevel = (node: TrieNodeData, depth: number, left: number, right: number, parentX?: number, parentY?: number) => {
      const x = (left + right) / 2;
      const y = depth * 60 + 25;
      nodes.push({ node, x, y, parentX, parentY });
      const children = Array.from(node.children.values());
      if (children.length === 0) return;
      const step = (right - left) / children.length;
      children.forEach((child, i) => {
        layoutLevel(child, depth + 1, left + i * step, left + (i + 1) * step, x, y);
      });
    };
    layoutLevel(root, 0, 0, 100);
    return nodes;
  };

  const svgWidth = 600;
  const renderNodes = flattenTrie().map((rn) => ({
    ...rn,
    x: (rn.x / 100) * svgWidth,
    y: rn.y,
    parentX: rn.parentX !== undefined ? (rn.parentX / 100) * svgWidth : undefined,
    parentY: rn.parentY,
  }));
  const maxDepth = renderNodes.reduce((max, n) => Math.max(max, n.y), 0);
  const svgHeight = maxDepth + 50;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setMode("insert")}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === "insert" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Insert
        </button>
        <button
          onClick={() => setMode("search")}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === "search" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Prefix Search
        </button>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value.replace(/[^a-zA-Z]/g, ""))}
          onKeyDown={(e) => e.key === "Enter" && !isAnimating && handleAction()}
          placeholder={mode === "insert" ? "Word to insert" : "Prefix to search"}
          className="w-32 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          disabled={isAnimating}
        />
        <button
          onClick={handleAction}
          disabled={isAnimating || !inputVal.trim()}
          className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isAnimating ? "..." : mode === "insert" ? "▶ Insert" : "🔍 Search"}
        </button>
      </div>

      {/* Pre-loaded words hint */}
      <p className="text-xs text-muted-foreground">
        Pre-loaded: <span className="font-mono">cat, car, card, care, do, dog</span> — try inserting or searching!
      </p>

      {/* Tree visualization */}
      <div className="rounded-lg bg-secondary/50 p-4 overflow-auto" style={{ minHeight: "300px" }}>
        <svg
          width={svgWidth}
          height={Math.max(svgHeight, 250)}
          viewBox={`0 0 ${svgWidth} ${Math.max(svgHeight, 250)}`}
          style={{ display: "block", maxWidth: "100%" }}
        >
          {/* Edges */}
          {renderNodes.map((rn) =>
            rn.parentX !== undefined && rn.parentY !== undefined ? (
              <line
                key={`edge-${rn.node.id}`}
                x1={rn.parentX}
                y1={rn.parentY}
                x2={rn.x}
                y2={rn.y}
                stroke={
                  highlightIds.has(rn.node.id) || matchIds.has(rn.node.id)
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground) / 0.25)"
                }
                strokeWidth={highlightIds.has(rn.node.id) ? 2 : 1}
              />
            ) : null
          )}

          {/* Nodes */}
          {renderNodes.map((rn) => {
            const isRoot = rn.node.id === "root";
            const isHighlighted = highlightIds.has(rn.node.id);
            const isMatch = matchIds.has(rn.node.id);
            const isEndWord = rn.node.isEnd;

            const fillColor = isHighlighted
              ? "hsl(var(--primary))"
              : isMatch
              ? "hsl(var(--primary) / 0.3)"
              : isEndWord
              ? "hsl(var(--accent))"
              : "hsl(var(--card))";

            const strokeColor = isHighlighted
              ? "hsl(var(--primary))"
              : isMatch
              ? "hsl(var(--primary) / 0.6)"
              : isEndWord
              ? "hsl(var(--accent-foreground) / 0.3)"
              : "hsl(var(--border))";

            const textColor = isHighlighted
              ? "hsl(var(--primary-foreground))"
              : "hsl(var(--foreground))";

            return (
              <g key={rn.node.id}>
                <circle
                  cx={rn.x}
                  cy={rn.y}
                  r={isRoot ? 14 : 12}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={isEndWord ? 2 : 1}
                />
                {isEndWord && !isRoot && (
                  <circle
                    cx={rn.x}
                    cy={rn.y}
                    r={16}
                    fill="none"
                    stroke="hsl(var(--primary) / 0.4)"
                    strokeWidth={1}
                    strokeDasharray="4 2"
                  />
                )}
                <text
                  x={rn.x}
                  y={rn.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={textColor}
                  fontFamily="monospace"
                  fontWeight="bold"
                  fontSize={isRoot ? 10 : 14}
                >
                  {isRoot ? "⊙" : rn.node.char}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> Active path</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary/30 ring-1 ring-primary/60" /> Match subtree</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-accent ring-1 ring-dashed ring-primary/40" /> End of word</span>
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

export default TrieVisualizer;
