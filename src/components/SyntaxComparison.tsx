import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Terminal, Cpu, Globe } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const languages: Language[] = [
  { id: 'python', name: 'Python', icon: <Terminal className="h-4 w-4" />, color: '#3776AB' },
  { id: 'cpp', name: 'C++', icon: <Cpu className="h-4 w-4" />, color: '#00599C' },
  { id: 'java', name: 'Java', icon: <Globe className="h-4 w-4" />, color: '#007396' },
  { id: 'js', name: 'JavaScript', icon: <Terminal className="h-4 w-4" />, color: '#F7DF1E' },
];

const syntaxData: Record<string, Record<string, string>> = {
  variables: {
    python: 'x = 10\nname = "Alice"',
    cpp: 'int x = 10;\nstring name = "Alice";',
    java: 'int x = 10;\nString name = "Alice";',
    js: 'let x = 10;\nconst name = "Alice";',
  },
  loops: {
    python: 'for i in range(5):\n    print(i)',
    cpp: 'for(int i=0; i<5; i++) {\n    cout << i << endl;\n}',
    java: 'for(int i=0; i<5; i++) {\n    System.out.println(i);\n}',
    js: 'for(let i=0; i<5; i++) {\n    console.log(i);\n}',
  },
  functions: {
    python: 'def add(a, b):\n    return a + b',
    cpp: 'int add(int a, int b) {\n    return a + b;\n}',
    java: 'public int add(int a, int b) {\n    return a + b;\n}',
    js: 'function add(a, b) {\n    return a + b;\n}',
  },
  arrays: {
    python: 'arr = [1, 2, 3]\narr.append(4)',
    cpp: 'vector<int> arr = {1, 2, 3};\narr.push_back(4);',
    java: 'ArrayList<Integer> arr = new ArrayList<>();\narr.add(1);',
    js: 'const arr = [1, 2, 3];\narr.push(4);',
  },
};

const SyntaxComparison = () => {
  const [activeTab, setActiveTab] = useState('variables');
  const [activeLang, setActiveLang] = useState('python');

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex flex-wrap gap-2 mb-4">
          {['variables', 'loops', 'functions', 'arrays'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-background hover:bg-muted text-muted-foreground border border-border'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLang(lang.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLang === lang.id
                  ? 'bg-secondary text-secondary-foreground border border-primary/20'
                  : 'bg-transparent text-muted-foreground hover:bg-muted'
              }`}
            >
              <span style={{ color: activeLang === lang.id ? lang.color : 'inherit' }}>
                {lang.icon}
              </span>
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 bg-slate-950 font-mono text-sm leading-relaxed min-h-[160px] relative">
        <div className="absolute top-4 right-4 text-[10px] text-slate-500 font-bold tracking-widest uppercase opacity-30 select-none">
          {languages.find(l => l.id === activeLang)?.name} / {activeTab}
        </div>
        <AnimatePresence mode="wait">
          <motion.pre
            key={`syntax-${activeTab}-${activeLang}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-slate-300"
          >
            {syntaxData[activeTab]?.[activeLang] || "// Code not available"}
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SyntaxComparison;
