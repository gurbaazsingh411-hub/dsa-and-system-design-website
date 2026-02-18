import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import RoadmapNodeCard from "@/components/RoadmapNodeCard";
import { dsaRoadmap } from "@/lib/roadmapData";
import { useProgress } from "@/contexts/ProgressContext";

const Roadmap = () => {
  const { isTopicCompleted } = useProgress();

  const getStatus = (index: number): "locked" | "active" | "completed" => {
    const node = dsaRoadmap[index];
    if (isTopicCompleted(node.id)) return "completed";
    return "active";
  };

  const phases = Array.from(new Set(dsaRoadmap.map(n => n.phase)));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative pt-24 pb-20">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold">
              DSA <span className="text-primary text-glow">Roadmap</span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Follow the path from fundamentals to interview mastery
            </p>
          </motion.div>

          <div className="space-y-20">
            {phases.map((phase) => (
              <div key={phase} className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <h2 className="text-2xl font-bold text-primary tracking-tight whitespace-nowrap px-4 py-1 rounded-full border border-primary/20 bg-primary/5 uppercase text-sm">
                    {phase}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
                
                <div className="flex flex-col items-center">
                  {dsaRoadmap
                    .filter((n) => n.phase === phase)
                    .map((node, i) => {
                      const globalIndex = dsaRoadmap.findIndex(rn => rn.id === node.id);
                      return (
                        <RoadmapNodeCard
                          key={node.id}
                          node={node}
                          index={globalIndex}
                          status={getStatus(globalIndex)}
                          isLast={i === dsaRoadmap.filter(n => n.phase === phase).length - 1}
                        />
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
