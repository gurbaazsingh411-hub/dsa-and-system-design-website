import { useState, useCallback, useRef, useEffect } from "react";

// Sample undirected graph
//     0
//    / \
//   1   2
//  / \   \
// 3   4   5
//      \ /
//       6

interface GraphNode {
  id: number;
  x: number;
  y: number;
}

const nodes: GraphNode[] = [
  { id: 0, x: 200, y: 20 },
  { id: 1, x: 100, y: 90 },
  { id: 2, x: 300, y: 90 },
  { id: 3, x: 40, y: 170 },
  { id: 4, x: 160, y: 170 },
  { id: 5, x: 340, y: 170 },
  { id: 6, x: 250, y: 240 },
];

const adjacency: Record<number, number[]> = {
  0: [1, 2],
  1: [0, 3, 4],
  2: [0, 5],
  3: [1],
  4: [1, 6],
  5: [2, 6],
  6: [4, 5],
};

const edges: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [4, 6], [5, 6],
];

type TraversalType = "bfs" | "dfs";

const getTraversalOrder = (start: number, type: TraversalType): number[] => {
  const visited = new Set<number>();
  const result: number[] = [];

  if (type === "bfs") {
    const queue = [start];
    visited.add(start);
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node);
      for (const neighbor of adjacency[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  } else {
    const dfs = (node: number) => {
      visited.add(node);
      result.push(node);
      for (const neighbor of adjacency[node]) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    };
    dfs(start);
  }

  return result;
};

const GraphVisualizer = () => {
  const [traversalType, setTraversalType] = useState<TraversalType>("bfs");
  const [startNode, setStartNode] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [visitedEdges, setVisitedEdges] = useState<Set<string>>(new Set());
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [orderResult, setOrderResult] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const timeoutRef = useRef<number[]>([]);

  const clearAnimation = useCallback(() => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
    setVisitedNodes(new Set());
    setVisitedEdges(new Set());
    setCurrentNode(null);
    setOrderResult([]);
    setIsPlaying(false);
  }, []);

  const playTraversal = useCallback(() => {
    clearAnimation();
    setIsPlaying(true);

    const order = getTraversalOrder(startNode, traversalType);
    const visited = new Set<number>();
    const edgesVisited = new Set<string>();

    order.forEach((val, i) => {
      const t1 = window.setTimeout(() => {
        setCurrentNode(val);
      }, i * speed);

      const t2 = window.setTimeout(() => {
        // Find edge from previously visited to this node
        if (i > 0) {
          for (const prev of visited) {
            if (adjacency[prev].includes(val)) {
              const edgeKey = [Math.min(prev, val), Math.max(prev, val)].join("-");
              edgesVisited.add(edgeKey);
              break;
            }
          }
          setVisitedEdges(new Set(edgesVisited));
        }
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
  }, [traversalType, startNode, speed, clearAnimation]);

  useEffect(() => {
    return () => timeoutRef.current.forEach(clearTimeout);
  }, []);

  const getNodeColor = (id: number) => {
    if (currentNode === id) return "border-primary bg-primary/20 text-primary scale-110 shadow-[0_0_16px_hsl(152_76%_52%/0.4)]";
    if (visitedNodes.has(id)) return "border-node-completed/50 bg-node-completed/10 text-node-completed";
    return "border-border bg-secondary text-muted-foreground";
  };

  const getEdgeColor = (from: number, to: number) => {
    const key = [Math.min(from, to), Math.max(from, to)].join("-");
    if (visitedEdges.has(key)) return "stroke-primary/60";
    return "stroke-border";
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => { clearAnimation(); setTraversalType("bfs"); }}
          className={`rounded-md border px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
            traversalType === "bfs" ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          BFS
        </button>
        <button
          onClick={() => { clearAnimation(); setTraversalType("dfs"); }}
          className={`rounded-md border px-3 py-1.5 text-xs font-mono font-medium transition-colors ${
            traversalType === "dfs" ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          DFS
        </button>
        <div className="h-4 w-px bg-border" />
        <span className="text-xs text-muted-foreground font-mono">Start:</span>
        {[0, 1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => { clearAnimation(); setStartNode(n); }}
            className={`h-7 w-7 rounded-full border text-xs font-mono font-bold transition-colors ${
              startNode === n ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {n}
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

      {/* Graph SVG */}
      <div className="relative rounded-lg border border-border bg-background p-4 overflow-hidden" style={{ height: 300 }}>
        <svg width="400" height="280" viewBox="0 0 400 280" className="mx-auto block">
          {edges.map(([from, to]) => {
            const p1 = nodes[from];
            const p2 = nodes[to];
            return (
              <line
                key={`${from}-${to}`}
                x1={p1.x}
                y1={p1.y + 18}
                x2={p2.x}
                y2={p2.y + 18}
                className={`transition-colors duration-300 ${getEdgeColor(from, to)}`}
                strokeWidth={2}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((n) => (
          <div
            key={n.id}
            className={`absolute flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-all duration-300 ${getNodeColor(n.id)}`}
            style={{
              left: `calc(50% - 200px + ${n.x}px - 20px)`,
              top: `${n.y + 16 - 2}px`,
            }}
          >
            {n.id}
          </div>
        ))}
      </div>

      {/* Adjacency list */}
      <details className="rounded-lg bg-secondary px-4 py-2">
        <summary className="text-xs font-mono uppercase tracking-wider text-muted-foreground cursor-pointer">
          Adjacency List
        </summary>
        <div className="mt-2 font-mono text-xs text-foreground space-y-0.5">
          {Object.entries(adjacency).map(([node, neighbors]) => (
            <p key={node}>
              <span className="text-primary">{node}</span>
              <span className="text-muted-foreground"> → </span>
              [{neighbors.join(", ")}]
            </p>
          ))}
        </div>
      </details>

      {/* Traversal order */}
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

export default GraphVisualizer;
