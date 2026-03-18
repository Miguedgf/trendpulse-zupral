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
    { id: 1, title: "GTA VI: Vice City Live", category: "Gaming", velocity: 98, sentiment: "Euforia", emotionIcon: "🔥", whyViral: "Filtraciones masivas sobre economía real.", keywords: ["GTAVI"], description: "Ecosistema online.", sources: [{title: "IGN", url: "#"}] },
    { id: 2, title: "Apple Vision Air", category: "Tech", velocity: 96, sentiment: "Asombro", emotionIcon: "✨", whyViral: "Precio disruptivo.", keywords: ["VisionAir"], description: "Computación espacial.", sources: [{title: "TechCrunch", url: "#"}] },
    { id: 3, title: "Mundial FIFA '26 Sedes", category: "Deportes", velocity: 92, sentiment: "Orgullo", emotionIcon: "⚽", whyViral: "Logística oficial.", keywords: ["FIFA"], description: "Impacto económico.", sources: [{title: "FIFA", url: "#"}] },
    { id: 4, title: "Dune: Messiah Teaser", category: "Cine", velocity: 89, sentiment: "Solemne", emotionIcon: "🎬", whyViral: "Imágenes de Villeneuve.", keywords: ["Dune"], description: "Épica sci-fi.", sources: [{title: "Variety", url: "#"}] },
    { id: 5, title: "K-Pop Meta-Groups", category: "Cultura", velocity: 88, sentiment: "Curiosidad", emotionIcon: "🎤", whyViral: "Ídolos virtuales.", keywords: ["KPop"], description: "IA en música.", sources: [{title: "Billboard", url: "#"}] },
    { id: 6, title: "Neuralink Streaming", category: "Tech", velocity: 85, sentiment: "Sci-Fi", emotionIcon: "🧠", whyViral: "Música vía BCI.", keywords: ["Neuralink"], description: "Interfaz cerebro.", sources: [{title: "MIT", url: "#"}] },
    { id: 7, title: "Animation Revival", category: "Cultura", velocity: 82, sentiment: "Nostalgia", emotionIcon: "🎨", whyViral: "Éxito 2D clásico.", keywords: ["2D"], description: "Arte tradicional.", sources: [{title: "Variety", url: "#"}] },
    { id: 8, title: "F1 Urban GP", category: "Deportes", velocity: 78, sentiment: "Crítico", emotionIcon: "🏎️", whyViral: "Nuevas sedes urbanas.", keywords: ["F1"], description: "Seguridad vial.", sources: [{title: "F1", url: "#"}] },
    { id: 9, title: "Silent Luxury", category: "Cultura", velocity: 74, sentiment: "Zen", emotionIcon: "🌿", whyViral: "Detox digital.", keywords: ["Luxury"], description: "Minimalismo.", sources: [{title: "AD", url: "#"}] },
    { id: 10, title: "Starship Mars", category: "Tech", velocity: 65, sentiment: "Heroico", emotionIcon: "🚀", whyViral: "Pruebas exitosas.", keywords: ["Mars"], description: "Colonización.", sources: [{title: "Space", url: "#"}] }
  ],
  roadmap: [
    { date: "Mar 18", event: "Actualización ZUPRAL", status: "Hoy", importance: "Alta" },
    { date: "Mar 20", event: "Equinoccio", status: "Próximo", importance: "Baja" },
    { date: "Mar 22", event: "Día del Agua", status: "Próximo", importance: "Media" },
    { date: "Mar 25", event: "Cumbre IA", status: "Planificación", importance: "Alta" },
    { date: "Mar 29", event: "Semana Santa", status: "Planificación", importance: "Alta" },
    { date: "Abr 2", event: "Jueves Santo", status: "Crítico", importance: "Alta" },
    { date: "Abr 3", event: "Viernes Santo", status: "Crítico", importance: "Alta" },
    { date: "Abr 5", event: "Pascua", status: "Ejecución", importance: "Alta" },
    { date: "Abr 7", event: "Día Salud", status: "Próximo", importance: "Media" },
    { date: "Abr 15", event: "Cierre Fiscal", status: "Planificación", importance: "Media" },
    { date: "Abr 22", event: "Día Tierra", status: "Crítico", importance: "Alta" },
    { date: "Abr 23", event: "Día Libro", status: "Próximo", importance: "Media" },
    { date: "May 1", event: "Día Trabajador", status: "Ejecución", importance: "Alta" },
    { date: "May 4", event: "Met Gala 2026", status: "Crítico", importance: "Alta" },
    { date: "May 8", event: "Cruz Roja", status: "Próximo", importance: "Baja" },
    { date: "May 15", event: "IA Fest", status: "Oportunidad", importance: "Media" },
    { date: "May 20", event: "Cannes", status: "Planificación", importance: "Media" },
    { date: "Jun 5", event: "Medio Ambiente", status: "Próximo", importance: "Alta" },
    { date: "Jun 11", event: "Kickoff Mundial", status: "Impacto Máximo", importance: "Alta" },
    { date: "Jun 21", event: "Solsticio", status: "Próximo", importance: "Baja" }
  ]
};

function App() {
  const [trends, setTrends] = useState(FALLBACK_DATA.trends);
  const [roadmap, setRoadmap] = useState(FALLBACK_DATA.roadmap);
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
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans p-6 selection:bg-cyan-500/30">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-16 border-b border-slate-800/50 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"><Target className="text-white" size={28} /></div>
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">TrendPulse <span className="text-[10px] text-slate-500 italic lowercase font-medium">{APP_VERSION}</span></h1>
            <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.2em]">Terminal ZUPRAL</p>
          </div>
        </div>
        <button onClick={syncIntelligence} className="bg-white text-slate-950 px-8 py-3 rounded-full font-black text-sm hover:scale-105 transition-all shadow-xl flex items-center gap-3">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> {loading ? "SINC..." : "SYNC INTELLIGENCE"}
        </button>
      </header>

      <main className="max-w-7xl mx-auto space-y-20">
        <section className="flex gap-3 justify-center flex-wrap">
          {CATEGORIAS.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full text-xs font-black uppercase border transition-all ${filter === cat ? 'bg-cyan-500 border-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'}`}>{cat}</button>
          ))}
        </section>

        <section className="space-y-8">
          <div className="px-4 border-l-4 border-orange-500">
            <h2 className="text-2xl font-black text-white flex items-center gap-3"><Flame className="text-orange-500" size={28}/> WAR ROOM FEED</h2>
            <p className="text-slate-500 text-sm font-medium italic">Monitor dinámico de los 10 temas con mayor tracción digital hoy.</p>
          </div>
          <div className="grid gap-4">
            {sortedTrends.map((t, i) => (
              <div key={t.id} className="bg-[#0f172a]/40 border border-slate-800/50 p-8 rounded-[3rem] flex items-center gap-8 hover:bg-slate-900/60 transition-all group">
                <span className="text-3xl font-black text-slate-800 group-hover:text-cyan-500 transition-colors">0{i+1}</span>
                <div className="flex-1">
                   <h3 className="text-xl font-bold text-white leading-tight mb-1 group-hover:text-cyan-400 transition-colors">{t.title}</h3>
                   <div className="flex gap-3 items-center">
                     <span className="text-[10px] text-cyan-500 font-black uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded">{t.category}</span>
                     <span className="text-[10px] text-slate-500 font-bold uppercase">{t.sentiment}</span>
                   </div>
                </div>
                <div className="text-right flex items-center gap-6">
                  <div className="px-4 py-2 bg-slate-950 rounded-2xl border border-slate-800 text-center min-w-[80px]">
                    <div className="text-lg font-black text-white">{t.velocity}%</div>
                    <div className="text-[8px] text-slate-500 uppercase font-black">Velocity</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 pb-20">
          <div className="px-4 border-l-4 border-emerald-500">
            <h2 className="text-2xl font-black text-white flex items-center gap-3"><Sparkles className="text-emerald-500" size={28}/> PROSPECTIVE HUB</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {roadmap.map((event, idx) => (
              <div key={idx} className="p-6 rounded-[2.5rem] border border-slate-800/60 bg-slate-900/20 hover:bg-slate-800 transition-all group">
                <span className="text-[10px] font-black text-slate-600 mb-2 block">{event.date}</span>
                <h6 className="text-sm font-black text-slate-200 leading-tight mb-4 group-hover:text-emerald-400">{event.event}</h6>
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${event.status === 'Hoy' ? 'bg-cyan-500 shadow-[0_0_8px_cyan]' : 'bg-emerald-500'}`}></div>
                   <p className="text-[9px] font-bold text-slate-500 uppercase">{event.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-20 py-16 border-t border-slate-900 text-center">
        <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.6em]">ZUPRAL © 2026</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('[https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap](https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap)');
        body { font-family: 'Space Grotesk', sans-serif; background-color: #020617; }
      `}} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
