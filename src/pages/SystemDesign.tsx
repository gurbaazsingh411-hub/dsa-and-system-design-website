import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import RoadmapNodeCard from "@/components/RoadmapNodeCard";
import { systemDesignRoadmap } from "@/lib/roadmapData";
import { useProgress } from "@/contexts/ProgressContext";

const SystemDesign = () => {
  const { isTopicCompleted } = useProgress();

  const getStatus = (index: number): "locked" | "active" | "completed" => {
    const node = systemDesignRoadmap[index];
    if (isTopicCompleted(node.id)) return "completed";
    return "active";
  };

  const phases = Array.from(new Set(systemDesignRoadmap.map(n => n.phase)));

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
              System Design <span className="text-primary text-glow">Roadmap</span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Learn architecture patterns from networking to distributed systems
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
                  {systemDesignRoadmap
                    .filter((n) => n.phase === phase)
                    .map((node, i) => {
                      const globalIndex = systemDesignRoadmap.findIndex(rn => rn.id === node.id);
                      return (
                        <RoadmapNodeCard
                          key={node.id}
                          node={node}
                          index={globalIndex}
                          status={getStatus(globalIndex)}
                          isLast={i === systemDesignRoadmap.filter(n => n.phase === phase).length - 1}
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

export default SystemDesign;
