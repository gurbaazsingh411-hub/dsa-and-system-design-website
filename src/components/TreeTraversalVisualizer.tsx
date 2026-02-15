import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

const buildSampleTree = (): TreeNode => ({
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null },
  },
  right: {
    val: 3,
    left: { val: 6, left: null, right: null },
    right: { val: 7, left: null, right: null },
  },
});

type TraversalType = "bfs" | "dfs-inorder" | "dfs-preorder" | "dfs-postorder";

const getTraversalOrder = (root: TreeNode, type: TraversalType): number[] => {
  const result: number[] = [];

  if (type === "bfs") {
    const queue: TreeNode[] = [root];
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  } else if (type === "dfs-inorder") {
    const dfs = (node: TreeNode | null) => {
      if (!node) return;
      dfs(node.left);
      result.push(node.val);
      dfs(node.right);
    };
    dfs(root);
  } else if (type === "dfs-preorder") {
    const dfs = (node: TreeNode | null) => {
      if (!node) return;
      result.push(node.val);
      dfs(node.left);
      dfs(node.right);
    };
    dfs(root);
  } else if (type === "dfs-postorder") {
    const dfs = (node: TreeNode | null) => {
      if (!node) return;
      dfs(node.left);
      dfs(node.right);
      result.push(node.val);
    };
    dfs(root);
  }

  return result;
};

const traversalLabels: Record<TraversalType, string> = {
  bfs: "BFS (Level-Order)",
  "dfs-inorder": "DFS In-Order",
  "dfs-preorder": "DFS Pre-Order",
  "dfs-postorder": "DFS Post-Order",
};

// Node positions for a perfect binary tree of depth 3
// Layout: centered, with each level spaced out
const nodePositions: Record<number, { x: number; y: number }> = {
  1: { x: 200, y: 30 },
  2: { x: 110, y: 100 },
  3: { x: 290, y: 100 },
  4: { x: 60, y: 170 },
  5: { x: 155, y: 170 },
  6: { x: 245, y: 170 },
  7: { x: 340, y: 170 },
};

const edges: [number, number][] = [
  [1, 2], [1, 3], [2, 4], [2, 5], [3, 6], [3, 7],
];

const TreeTraversalVisualizer = () => {
  const [traversalType, setTraversalType] = useState<TraversalType>("bfs");
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [orderResult, setOrderResult] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const timeoutRef = useRef<number[]>([]);

  const tree = buildSampleTree();

  const clearAnimation = useCallback(() => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
    setVisitedNodes(new Set());
    setCurrentNode(null);
    setOrderResult([]);
    setIsPlaying(false);
  }, []);

  const playTraversal = useCallback(() => {
    clearAnimation();
    setIsPlaying(true);

    const order = getTraversalOrder(tree, traversalType);
    const visited = new Set<number>();

    order.forEach((val, i) => {
      const t1 = window.setTimeout(() => {
        setCurrentNode(val);
      }, i * speed);

      const t2 = window.setTimeout(() => {
        visited.add(val);
        setVisitedNodes(new Set(visited));
        setOrderResult((prev) => [...prev, val]);
      }, i * speed + speed * 0.6);

      timeoutRef.current.push(t1, t2);
    });

    const tEnd = window.setTimeout(() => {
      setCurrentNode(null);
      setIsPlaying(false);
    }, order.length * speed + 100);
    timeoutRef.current.push(tEnd);
  }, [traversalType, speed, clearAnimation, tree]);

  useEffect(() => {
    return () => timeoutRef.current.forEach(clearTimeout);
  }, []);

  const getNodeColor = (val: number) => {
    if (currentNode === val) return "border-primary bg-primary/20 text-primary scale-110 shadow-[0_0_16px_hsl(152_76%_52%/0.4)]";
    if (visitedNodes.has(val)) return "border-node-completed/50 bg-node-completed/10 text-node-completed";
    return "border-border bg-secondary text-muted-foreground";
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(traversalLabels) as TraversalType[]).map((t) => (
          <button
            key={t}
            onClick={() => { clearAnimation(); setTraversalType(t); }}
            className={`rounded-md border px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
              traversalType === t
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {traversalLabels[t]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={playTraversal}
          disabled={isPlaying}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 transition disabled:opacity-50"
        >
          ▶ {isPlaying ? "Playing..." : "Play"}
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
            className="w-20 accent-primary"
          />
        </div>
      </div>

      {/* Tree SVG */}
      <div className="relative rounded-lg border border-border bg-background p-4 overflow-hidden" style={{ height: 240 }}>
        <svg width="400" height="220" viewBox="0 0 400 220" className="mx-auto block">
          {/* Edges */}
          {edges.map(([from, to]) => {
            const p1 = nodePositions[from];
            const p2 = nodePositions[to];
            const bothVisited = visitedNodes.has(from) && visitedNodes.has(to);
            return (
              <line
                key={`${from}-${to}`}
                x1={p1.x}
                y1={p1.y + 18}
                x2={p2.x}
                y2={p2.y - 2}
                className={`transition-colors duration-300 ${bothVisited ? "stroke-node-completed/50" : "stroke-border"}`}
                strokeWidth={2}
              />
            );
          })}
        </svg>

        {/* Nodes as positioned divs for easier styling */}
        {Object.entries(nodePositions).map(([val, pos]) => {
          const numVal = Number(val);
          return (
            <div
              key={val}
              className={`absolute flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-all duration-300 ${getNodeColor(numVal)}`}
              style={{
                left: `calc(50% - 200px + ${pos.x}px - 18px)`,
                top: `${pos.y + 16 - 2}px`,
              }}
            >
              {val}
            </div>
          );
        })}
      </div>

      {/* Traversal order output */}
      <div className="rounded-lg bg-secondary px-4 py-3">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Traversal Order: </span>
        <span className="font-mono text-sm">
          {orderResult.length > 0 ? (
            orderResult.map((v, i) => (
              <span key={i}>
                <span className="text-primary">{v}</span>
                {i < orderResult.length - 1 && <span className="text-muted-foreground"> → </span>}
              </span>
            ))
          ) : (
            <span className="text-muted-foreground italic">Press Play to start</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default TreeTraversalVisualizer;
