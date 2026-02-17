import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Map, Cpu, Layers, Zap, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: Map,
    title: "Visual Roadmaps",
    description: "Follow a structured path from basics to advanced topics with clear progression.",
  },
  {
    icon: Cpu,
    title: "Interactive Visualizations",
    description: "Watch algorithms come alive with step-by-step animations.",
  },
  {
    icon: Code2,
    title: "Built-in Practice",
    description: "Solve problems directly in the browser with instant feedback.",
  },
  {
    icon: Layers,
    title: "System Design",
    description: "Parallel track for learning architecture and distributed systems.",
  },
];

const roadmapPreview = [
  { label: "Arrays", done: true },
  { label: "Strings", done: true },
  { label: "Hash Maps", done: false },
  { label: "Two Pointers", done: false },
  { label: "Trees", done: false },
  { label: "Graphs", done: false },
  { label: "Dynamic Programming", done: false },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
              <Zap className="h-3.5 w-3.5" />
              <span>From zero to interview-ready</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Master DSA &<br />
              <span className="text-primary text-glow">System Design</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              A visual roadmap platform that takes you from zero knowledge to expert level. 
              Learn through structured paths, interactive visualizations, and hands-on practice.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/roadmap"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-border"
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/system-design"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:bg-muted"
              >
                <BookOpen className="h-4 w-4" />
                System Design
              </Link>
            </div>
          </motion.div>

          {/* Roadmap preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-20 mx-auto max-w-md"
          >
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                DSA Roadmap Preview
              </h3>
              <div className="space-y-0">
                {roadmapPreview.map((item, i) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-3 w-3 rounded-full border-2 ${
                          item.done
                            ? "border-primary bg-primary"
                            : i === 2
                            ? "border-primary bg-transparent node-pulse"
                            : "border-muted-foreground/30 bg-transparent"
                        }`}
                      />
                      {i < roadmapPreview.length - 1 && (
                        <div className={`h-6 w-0.5 ${item.done ? "bg-primary/40" : "bg-border"}`} />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        item.done
                          ? "text-primary font-medium"
                          : i === 2
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 hover:border-primary/20 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            © 2026. Made with ❤️ by <span className="font-bold text-foreground">DevX</span>.
          </span>
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">
              Algo<span className="text-primary">Architect</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
