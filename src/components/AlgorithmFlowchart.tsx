import React from 'react';
import { motion } from 'framer-motion';
import { Network, Search, ArrowRight, Layers, Zap } from 'lucide-react';

interface AlgorithmNodeProps {
  title: string;
  icon: React.ReactNode;
  delay: number;
}

const AlgorithmNode = ({ title, icon, delay }: AlgorithmNodeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    className="flex flex-col items-center gap-3 relative z-10"
  >
    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-lg shadow-primary/5 hover:scale-110 transition-transform cursor-default group">
      <div className="group-hover:animate-pulse">
        {icon}
      </div>
    </div>
    <span className="text-sm font-semibold text-foreground text-center max-w-[100px]">{title}</span>
  </motion.div>
);

const Connector = ({ delay }: { delay: number }) => (
  <div className="flex-1 h-[2px] mb-12 relative flex items-center justify-center">
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay, duration: 0.8 }}
      className="w-full h-full bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 origin-left"
    />
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay + 0.5, duration: 0.3 }}
      className="absolute right-0"
    >
      <ArrowRight className="h-4 w-4 text-primary/50" />
    </motion.div>
  </div>
);

const AlgorithmFlowchart = () => {
  const algorithms = [
    { title: "Basic Ops", icon: <Layers className="h-8 w-8" />, type: 'base' },
    { title: "Searching", icon: <Search className="h-8 w-8" />, type: 'step' },
    { title: "Sorting", icon: <Network className="h-8 w-8" />, type: 'step' },
    { title: "Optimizations", icon: <Zap className="h-8 w-8" />, type: 'step' },
  ];

  return (
    <div className="py-12 px-4 overflow-x-auto">
      <div className="min-w-[700px] flex items-center justify-between relative">
        {/* Connection Background Line */}
        <div className="absolute top-8 left-0 right-0 h-[2px] bg-border/30 -z-0" />
        
        {algorithms.map((algo, index) => (
          <React.Fragment key={algo.title}>
            <AlgorithmNode 
              title={algo.title} 
              icon={algo.icon} 
              delay={index * 0.2} 
            />
            {index < algorithms.length - 1 && (
              <Connector delay={index * 0.2 + 0.1} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Detail Tooltips or floating notes could go here for "WOW" effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 grid grid-cols-4 gap-4"
      >
        <div className="text-[10px] text-muted-foreground text-center px-2">Traversal, Insertion, Deletion</div>
        <div className="text-[10px] text-muted-foreground text-center px-2">Linear, Binary Search</div>
        <div className="text-[10px] text-muted-foreground text-center px-2">Bubble, Merge, Quick Sort</div>
        <div className="text-[10px] text-muted-foreground text-center px-2">Two Pointers, Sliding Window</div>
      </motion.div>
    </div>
  );
};

export default AlgorithmFlowchart;
