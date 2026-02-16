import { motion } from "framer-motion";
import { Lock, Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { RoadmapNode } from "@/lib/roadmapData";

interface Props {
  node: RoadmapNode;
  index: number;
  status: "locked" | "active" | "completed";
  isLast: boolean;
}

const difficultyColors = {
  beginner: "text-primary",
  intermediate: "text-warning",
  advanced: "text-destructive",
};

const RoadmapNodeCard = ({ node, index, status, isLast }: Props) => {
  const isAccessible = status !== "locked";

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.4 }}
        className="relative"
      >
        {isAccessible ? (
          <Link to={`/topic/${node.id}`} className="block">
            <div
              className={`group relative w-72 rounded-xl border p-5 transition-all duration-300 ${
                status === "completed"
                  ? "border-node-completed/40 bg-node-completed/5"
                  : "border-primary/30 bg-primary/5 glow-border hover:border-primary/60"
              }`}
            >
              {status === "active" && (
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary node-pulse" />
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{node.icon}</span>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {node.title}
                    </h3>
                    <span className={`text-xs font-mono uppercase tracking-wider ${difficultyColors[node.difficulty]}`}>
                      {node.difficulty}
                    </span>
                  </div>
                </div>
                {status === "completed" ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-node-completed/20">
                    <Check className="h-4 w-4 text-node-completed" />
                  </div>
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>

              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {node.description}
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono">{node.problemCount} problems</span>
                <span>·</span>
                <span>{node.topics.length} concepts</span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="relative w-72 rounded-xl border border-border bg-secondary/30 p-5 opacity-50">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl grayscale">{node.icon}</span>
                <div>
                  <h3 className="font-semibold text-muted-foreground">{node.title}</h3>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {node.difficulty}
                  </span>
                </div>
              </div>
              <Lock className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground/60 line-clamp-2">
              Complete previous topics to unlock.
            </p>
          </div>
        )}
      </motion.div>

      {/* Connector line */}
      {!isLast && (
        <div className="flex flex-col items-center py-2">
          <div className={`h-8 w-0.5 ${status === "completed" ? "bg-node-completed/40" : isAccessible ? "bg-primary/30" : "bg-border"}`} />
          <div className={`h-2 w-2 rounded-full ${status === "completed" ? "bg-node-completed/40" : isAccessible ? "bg-primary/30" : "bg-border"}`} />
        </div>
      )}
    </div>
  );
};

export default RoadmapNodeCard;
