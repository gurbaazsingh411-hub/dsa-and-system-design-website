import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Clock, Code2, BookOpen, ChevronRight, Bookmark, Network, Zap, Globe, Terminal } from "lucide-react";
import Navbar from "@/components/Navbar";
import { dsaRoadmap, systemDesignRoadmap, type RoadmapNode } from "@/lib/roadmapData";
import { useProgress } from "@/contexts/ProgressContext";
import StackVisualizer from "@/components/StackVisualizer";
import TreeTraversalVisualizer from "@/components/TreeTraversalVisualizer";
import BinarySearchVisualizer from "@/components/BinarySearchVisualizer";
import QueueVisualizer from "@/components/QueueVisualizer";
import GraphVisualizer from "@/components/GraphVisualizer";
import SortingVisualizer from "@/components/SortingVisualizer";
import LinkedListVisualizer from "@/components/LinkedListVisualizer";
import HeapVisualizer from "@/components/HeapVisualizer";
import TrieVisualizer from "@/components/TrieVisualizer";
import AlgorithmFlowchart from "@/components/AlgorithmFlowchart";
import SyntaxComparison from "@/components/SyntaxComparison";
import DPVisualizer from "@/components/DPVisualizer";
import { Textarea } from "@/components/ui/textarea";
import { StickyNote, Save, CheckCircle2 } from "lucide-react";

const TopicHeader = ({ node }: { node: RoadmapNode }) => {
  const { isBookmarked, toggleBookmark } = useProgress();
  const bookmarked = isBookmarked(node.id);
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{node.icon}</span>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
              {node.phase} · Section {node.section}
            </span>
          </div>
          <h1 className="text-3xl font-bold">{node.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{node.description}</p>
        </div>
      </div>
      <button
        onClick={() => toggleBookmark(node.id)}
        className={`mt-1 flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
          bookmarked
            ? "border-primary bg-primary/10 text-primary"
            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
        }`}
      >
        <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
      </button>
    </div>
  );
};


const ComplexityGrid = ({ complexity }: { complexity: any }) => {
  if (typeof complexity.time === 'string') {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Time</span>
          <span className="font-mono text-sm text-primary">{complexity.time}</span>
        </div>
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Space</span>
          <span className="font-mono text-sm text-primary">{complexity.space}</span>
        </div>
      </div>
    );
  }

  const cases = [
    { label: "Best Case", data: complexity.time.best, color: "text-emerald-500" },
    { label: "Average Case", data: complexity.time.average, color: "text-amber-500" },
    { label: "Worst Case", data: complexity.time.worst, color: "text-rose-500" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cases.map((c) => (
          <div key={c.label} className="p-4 rounded-xl bg-secondary/30 border border-border group hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{c.label}</span>
              <span className={`font-mono text-sm font-bold ${c.color}`}>{c.data.value}</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
              {c.data.explanation}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">Space Complexity</span>
            <span className="font-mono text-sm font-bold text-primary">{complexity.space.value || complexity.space}</span>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground italic max-w-[250px] text-right">
          {complexity.space.explanation || "Memory used relative to input size."}
        </p>
      </div>
    </div>
  );
};

const CodeSnippet = ({ boilerplates, singleBoilerplate }: { boilerplates?: any[], singleBoilerplate?: string }) => {
  const [activeLang, setActiveLang] = useState(boilerplates?.[0]?.language || "Python");

  if (singleBoilerplate) {
    return (
      <div className="rounded-xl border border-border bg-slate-950 p-6 font-mono text-sm overflow-x-auto shadow-inner">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800/50">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-rose-500/50" />
            <div className="h-3 w-3 rounded-full bg-amber-500/50" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
          </div>
          <span className="text-slate-500 text-[10px] ml-2 uppercase tracking-widest">code_snippet.py</span>
        </div>
        <pre className="text-slate-300 leading-relaxed font-medium">{singleBoilerplate}</pre>
      </div>
    );
  }

  const activeCode = boilerplates?.find(b => b.language === activeLang)?.code || "";

  return (
    <div className="rounded-xl border border-border bg-slate-950 overflow-hidden shadow-2xl">
      <div className="px-4 py-2 bg-slate-900/50 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-4">
          {boilerplates?.map(b => (
            <button
              key={b.language}
              onClick={() => setActiveLang(b.language)}
              className={`text-[11px] font-bold uppercase tracking-widest transition-all py-2 border-b-2 ${
                activeLang === b.language 
                  ? "text-primary border-primary" 
                  : "text-slate-500 border-transparent hover:text-slate-300"
              }`}
            >
              {b.language}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 opacity-30">
          <div className="h-2 w-2 rounded-full bg-white" />
          <div className="h-2 w-2 rounded-full bg-white" />
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>
      </div>
      <div className="p-6 font-mono text-sm overflow-x-auto">
        <pre className="text-slate-300 leading-relaxed font-medium">{activeCode}</pre>
      </div>
    </div>
  );
};

const TopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { notes, updateNote, cloudSyncEnabled } = useProgress();
  const [localNote, setLocalNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const allNodes = [...dsaRoadmap, ...systemDesignRoadmap];
  const node = allNodes.find((n) => n.id === topicId);
  const [activeSubId, setActiveSubId] = useState<string | null>(null);

  useEffect(() => {
    if (node?.subTopics?.length) {
      setActiveSubId(node.subTopics[0].id);
    }
    // Load initial note
    if (topicId && notes[topicId]) {
      setLocalNote(notes[topicId]);
    } else {
      setLocalNote("");
    }
  }, [node, topicId, notes]);

  const handleSaveNote = () => {
    if (!topicId) return;
    setIsSaving(true);
    updateNote(topicId, localNote);
    setTimeout(() => {
      setIsSaving(false);
      setHasSaved(true);
      setTimeout(() => setHasSaved(false), 2000);
    }, 500);
  };

  if (!node) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <Globe className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Node Lost in Space</h1>
          <p className="text-muted-foreground">The resource you're looking for doesn't exist.</p>
          <Link to="/" className="inline-block mt-4 text-primary hover:underline font-medium">Return to coordinates (0,0)</Link>
        </div>
      </div>
    );
  }

  const activeSubTopic = node.subTopics?.find(s => s.id === activeSubId);

  const getVisualizer = () => {
    const vid = activeSubTopic?.visualizationId || topicId;
    switch (vid) {
      case "arrays": return <BinarySearchVisualizer />;
      case "stacks": return <StackVisualizer />;
      case "queues": return <QueueVisualizer />;
      case "linked-list": return <LinkedListVisualizer />;
      case "trees": return <TreeTraversalVisualizer />;
      case "graphs": return <GraphVisualizer />;
      case "sorting": return <SortingVisualizer />;
      case "heaps": return <HeapVisualizer />;
      case "binary-search": return <BinarySearchVisualizer />;
      case "dynamic-programming": return <DPVisualizer />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      <div className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container relative max-w-6xl">
          <Link to={node.category === "dsa" ? "/roadmap" : "/system-design"} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-12 transition-all group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
            Back to <span className="text-foreground">{node.category === "dsa" ? "DSA" : "System Design"}</span> Roadmap
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TopicHeader node={node} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16">
              {/* Sub-Roadmap Sidebar */}
              <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
                <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm">
                  <div className="p-5 border-b border-border bg-secondary/30 flex items-center justify-between">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Sub-Roadmap</h3>
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  </div>
                  <div className="p-2 space-y-1">
                    {node.subTopics?.map((sub, idx) => (
                      <button
                        key={sub.id}
                        onClick={() => setActiveSubId(sub.id)}
                        className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start gap-4 group relative ${
                          activeSubId === sub.id 
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                            : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                        }`}
                      >
                        <div className={`mt-0.5 h-5 w-5 rounded-lg border flex items-center justify-center text-[10px] font-black shrink-0 transition-colors ${
                          activeSubId === sub.id ? "border-white/20 bg-white/10" : "border-border bg-background"
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate leading-tight">
                            {sub.title}
                          </p>
                        </div>
                        {activeSubId === sub.id && (
                          <motion.div layoutId="active-indicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                        )}
                      </button>
                    ))}
                    {!node.subTopics?.length && (
                      <div className="p-8 text-center text-xs italic text-muted-foreground opacity-50">Discovery ongoing...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sub-Topic Content */}
              <div className="lg:col-span-8 space-y-10">
                {!activeSubTopic ? (
                  <div className="rounded-2xl border border-dashed border-border p-20 text-center bg-card/30">
                    <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Initiate Sequencing</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto italic">Select a module from the neural map to process algorithmic protocols.</p>
                  </div>
                ) : (
                  <motion.div
                    key={activeSubTopic.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-12"
                  >
                    {/* Header Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest">
                          Algorithm Focus
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter">{activeSubTopic.title}</h2>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed font-medium pl-1 border-l-2 border-primary/20">
                        {activeSubTopic.definition}
                      </p>
                    </div>

                    {/* Visualization Section */}
                    {getVisualizer() && (
                      <section className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Play className="h-4 w-4 text-primary" />
                            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Interactive Visualization</h2>
                          </div>
                          <div className="h-px flex-1 bg-border ml-6" />
                        </div>
                        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl ring-1 ring-white/5">
                          {getVisualizer()}
                        </div>
                      </section>
                    )}

                    {/* Complexity Section */}
                    <section className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Performance Protocols</h2>
                        </div>
                        <div className="h-px flex-1 bg-border ml-6" />
                      </div>
                      <ComplexityGrid complexity={activeSubTopic.complexity} />
                    </section>

                    {/* Code Section */}
                    <section className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-primary" />
                          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Boilerplate Implementation</h2>
                        </div>
                        <div className="h-px flex-1 bg-border ml-6" />
                      </div>
                      <CodeSnippet 
                        boilerplates={activeSubTopic.boilerplates} 
                      />
                    </section>

                    {/* Context/Strategy Section */}
                    {/* Notes Section */}
                    <section className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <StickyNote className="h-4 w-4 text-primary" />
                          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Personalized Strategy Notes</h2>
                        </div>
                        <div className="h-px flex-1 bg-border ml-6" />
                        <div className="ml-4 flex items-center gap-2">
                          {cloudSyncEnabled && (
                            <span className="text-[10px] text-primary/60 font-medium bg-primary/5 px-2 py-0.5 rounded border border-primary/10">Cloud Sync Active</span>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-primary hover:text-primary hover:bg-primary/10"
                            onClick={handleSaveNote}
                          >
                            {hasSaved ? (
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                            ) : (
                              <Save className="h-4 w-4 mr-2" />
                            )}
                            {hasSaved ? "Saved" : "Save Notes"}
                          </Button>
                        </div>
                      </div>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition-opacity" />
                        <Textarea
                          placeholder="Jot down your own insights, edge cases, or key patterns for this topic..."
                          className="relative min-h-[150px] bg-card/50 backdrop-blur-sm border-border resize-none rounded-2xl p-6 focus:ring-primary/20 transition-all font-medium leading-relaxed"
                          value={localNote}
                          onChange={(e) => setLocalNote(e.target.value)}
                        />
                      </div>
                    </section>
                    <section className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Contextual Deployment</h2>
                        </div>
                        <div className="h-px flex-1 bg-border ml-6" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="group relative">
                           <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl -m-0.5 group-hover:bg-emerald-500/10 transition-colors" />
                           <div className="relative p-6 rounded-2xl border border-emerald-500/20 space-y-3">
                             <div className="flex items-center gap-2 text-emerald-500">
                               <Zap className="h-4 w-4 fill-emerald-500/20" />
                               <span className="text-[10px] font-black uppercase tracking-[0.2em]">When to Use</span>
                             </div>
                             <p className="text-sm text-foreground/80 leading-relaxed font-medium italic">"{activeSubTopic.whenToUse}"</p>
                           </div>
                         </div>
                         <div className="group relative">
                           <div className="absolute inset-0 bg-rose-500/5 rounded-2xl -m-0.5 group-hover:bg-rose-500/10 transition-colors" />
                           <div className="relative p-6 rounded-2xl border border-rose-500/20 space-y-3">
                             <div className="flex items-center gap-2 text-rose-500">
                               <Bookmark className="h-4 w-4" />
                               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Constraints</span>
                             </div>
                             <p className="text-sm text-foreground/80 leading-relaxed font-medium italic">"{activeSubTopic.whenNotToUse}"</p>
                           </div>
                         </div>
                      </div>
                    </section>

                    {/* Practice Section */}
                    {activeSubTopic.leetCodeLinks && activeSubTopic.leetCodeLinks.length > 0 && (
                      <section className="space-y-6 pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-primary" />
                            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Verified Training Modules</h2>
                          </div>
                          <div className="h-px flex-1 bg-border ml-6" />
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {activeSubTopic.leetCodeLinks.map((link) => (
                            <a
                              key={link.title}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-5 rounded-xl border border-border bg-card/50 hover:bg-primary/5 hover:border-primary/50 transition-all group overflow-hidden relative shadow-sm"
                            >
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                  <Code2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div>
                                  <span className="text-sm font-bold group-hover:text-primary transition-colors">{link.title}</span>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-bold uppercase tracking-tighter">
                                      <Globe className="h-3 w-3" /> leetcode.com
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${
                                  link.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                                  link.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                                  "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                                }`}>
                                  {link.difficulty}
                                </span>
                                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </section>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
