import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  TrendingUp, TrendingDown, MoveRight, Zap, ShieldCheck, RefreshCw, 
  ChevronDown, ChevronUp, CheckCircle2, Instagram, Facebook, Twitter, 
  Youtube, Linkedin, Globe, Flame, ExternalLink, Target, BrainCircuit, 
  MessageSquare, Sparkles, Link2, Info, Hash, Activity 
} from 'lucide-react';

const APP_VERSION = "BETA 2.1.3";
const CATEGORIAS = ["Todos", "Cultura", "Tech", "Cine", "Deportes", "Gaming"];

const FALLBACK_DATA = {
  trends: [
    { id: 1, title: "GTA VI: Vice City Live", category: "Gaming", velocity: 98, sentiment: "Euforia", emotionIcon: "🔥", whyViral: "Filtraciones masivas sobre economía real.", keywords: ["GTAVI"], description: "Ecosistema online persistente.", sources: [{title: "IGN", url: "#"}] },
    { id: 2, title: "Apple Vision Air", category: "Tech", velocity: 96, sentiment: "Asombro", emotionIcon: "✨", whyViral: "Precio disruptivo en computación espacial.", keywords: ["Apple"], description: "Adopción masiva de AR.", sources: [{title: "TechCrunch", url: "#"}] },
    { id: 3, title: "Mundial FIFA '26 Sedes", category: "Deportes", velocity: 92, sentiment: "Orgullo", emotionIcon: "⚽", whyViral: "Confirmación de logística oficial.", keywords: ["FIFA"], description: "Impacto económico histórico.", sources: [{title: "FIFA", url: "#"}] },
    { id: 4, title: "Dune: Messiah Teaser", category: "Cine", velocity: 89, sentiment: "Expectación", emotionIcon: "🎬", whyViral: "Filtración visual de Villeneuve.", keywords: ["Dune"], description: "Épica sci-fi.", sources: [{title: "Variety", url: "#"}] },
    { id: 5, title: "K-Pop Meta-Groups", category: "Cultura", velocity: 88, sentiment: "Curiosidad", emotionIcon: "🎤", whyViral: "Ídolos virtuales en Billboard.", keywords: ["KPop"], description: "Desafío a la autenticidad.", sources: [{title: "Billboard", url: "#"}] }
  ],
  platformInsights: [
    { platform: "Instagram", topTrends: [{ topic: "#ZUPRAL", description: "Iniciando sistema..." }] },
    { platform: "Facebook", topTrends: [{ topic: "#ZUPRAL", description: "Iniciando sistema..." }] },
    { platform: "X", topTrends: [{ topic: "#ZUPRAL", description: "Iniciando sistema..." }] },
    { platform: "YouTube", topTrends: [{ topic: "#ZUPRAL", description: "Iniciando sistema..." }] },
    { platform: "LinkedIn", topTrends: [{ topic: "#ZUPRAL", description: "Iniciando sistema..." }] }
  ]
};

function App() {
  const [trends, setTrends] = useState(FALLBACK_DATA.trends);
  const [filter, setFilter] = useState("Todos");
  const [loading, setLoading] = useState(false);

  const syncIntelligence = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const sortedTrends = useMemo(() => {
    const base = filter === "Todos" ? trends : trends.filter(t => t.category === filter);
    return [...base].sort((a, b) => b.velocity - a.velocity);
  }, [trends, filter]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-6">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">TrendPulse</h1>
          <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest italic">ZUPRAL {APP_VERSION}</p>
        </div>
        <button onClick={syncIntelligence} className="bg-white text-slate-950 px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          {loading ? "SINCRONIZANDO..." : "SYNC INTELLIGENCE"}
        </button>
      </header>

      <main className="max-w-5xl mx-auto space-y-12">
        <div className="flex gap-2 justify-center flex-wrap">
          {CATEGORIAS.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase border transition-all ${filter === cat ? 'bg-cyan-500 border-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}>{cat}</button>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-black text-white flex items-center gap-3"><Flame className="text-orange-500" size={24}/> WAR ROOM FEED</h2>
          <div className="grid gap-4">
            {sortedTrends.map((t, i) => (
              <div key={t.id} className="bg-[#0f172a]/40 border border-slate-800/50 p-6 rounded-[2.5rem] flex items-center gap-6 hover:bg-slate-900/60 transition-colors">
                <span className="text-2xl font-black text-slate-700">0{i+1}</span>
                <div className="flex-1">
                   <h3 className="text-lg font-bold text-white leading-tight">{t.title}</h3>
                   <span className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">{t.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-white">{t.velocity}%</div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">{t.sentiment}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-24 py-12 border-t border-slate-900 text-center opacity-40">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">ZUPRAL INTELLIGENCE SYSTEM © 2026</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('[https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap](https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap)');
        body { font-family: 'Space Grotesk', sans-serif; background-color: #020617; }
      `}} />
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}