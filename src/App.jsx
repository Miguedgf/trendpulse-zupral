import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  MoveRight,
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Calendar, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Linkedin, 
  Globe, 
  Cpu, 
  Flame, 
  AlertTriangle, 
  Lightbulb, 
  ExternalLink, 
  Target, 
  BrainCircuit, 
  Lock, 
  Eye, 
  MessageSquare, 
  Sparkles,
  Link2,
  Info,
  Hash,
  Activity,
  Award
} from 'lucide-react';

// --- CONFIGURACIÓN DE ÉLITE ---
// El entorno de ejecución proporciona la clave automáticamente; se debe inicializar como cadena vacía.
const apiKey = "";
const APP_ID = typeof __app_id !== 'undefined' ? __app_id : 'trend-pulse-beta-2-1-3';
const APP_VERSION = "BETA 2.1.3";

// Generador de fecha dinámica para la terminal
const getFormattedDate = () => {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());
};

const CATEGORIAS = ["Todos", "Cultura", "Tech", "Cine", "Deportes", "Gaming"];

// --- DATOS DE RESPALDO (FALLBACK) ---
const FALLBACK_DATA = {
  trends: [
    { id: 1, title: "GTA VI: 'Vice City' Online Ecosystem", category: "Gaming", momentum: "rising", velocity: 98, confidence: 97, sentiment: "Euforia", emotionIcon: "🔥", whyViral: "Filtraciones masivas sobre el sistema de economía real y persistencia.", keywords: ["#GTAVI", "ViceCityLive"], description: "Teorías sobre mapas y funciones de interacción social.", bias: "Sesgo de Disponibilidad", sources: [{title: "IGN News", url: "https://www.ign.com"}] },
    { id: 2, title: "Lanzamiento Apple 'Vision Air'", category: "Tech", momentum: "rising", velocity: 96, confidence: 94, sentiment: "Asombro", emotionIcon: "✨", whyViral: "Precio disruptivo y adopción masiva de computación espacial.", keywords: ["VisionAir", "AppleEvent"], description: "El fin de los teléfonos tal como los conocemos.", bias: "Efecto Veblen", sources: [{title: "TechCrunch", url: "https://techcrunch.com"}] },
    { id: 3, title: "Mundial FIFA '26: Sedes Finales", category: "Deportes", momentum: "stable", velocity: 92, confidence: 99, sentiment: "Orgullo Tribal", emotionIcon: "⚽", whyViral: "Confirmación de logística en Norteamérica.", keywords: ["WorldCup2026", "FIFA"], description: "Impacto económico histórico en preventas.", bias: "Sesgo de Endogrupo", sources: [{title: "FIFA Official", url: "https://www.fifa.com"}] },
    { id: 4, title: "Dune: Messiah Teaser", category: "Cine", momentum: "rising", velocity: 89, confidence: 95, sentiment: "Solemne", emotionIcon: "🎬", whyViral: "Filtro visual de Denis Villeneuve rompiendo récords.", keywords: ["DuneMessiah", "SciFi"], description: "El regreso triunfal de la épica a la gran pantalla.", bias: "Efecto Halo", sources: [{title: "Variety", url: "https://variety.com"}] },
    { id: 5, title: "K-Pop Meta-Groups", category: "Cultura", momentum: "rising", velocity: 88, confidence: 90, sentiment: "Curiosidad", emotionIcon: "🎤", whyViral: "Ídolos virtuales liderando Billboard Global.", keywords: ["MetaIdols", "KPopFuture"], description: "Avatares ultra-realistas desafiando la autenticidad.", bias: "Antropomorfismo", sources: [{title: "Billboard", url: "https://www.billboard.com"}] },
    { id: 6, title: "Neural Interfaces", category: "Tech", momentum: "stable", velocity: 85, confidence: 82, sentiment: "Sci-Fi", emotionIcon: "🧠", whyViral: "Debate ético sobre la conexión directa cerebro-música.", keywords: ["Neuralink", "BCI"], description: "Avances en BCI permiten nuevas formas de interacción.", bias: "Efecto de Novedad", sources: [{title: "MIT Tech Review", url: "https://www.technologyreview.com/"}] },
    { id: 7, title: "Animation Revival", category: "Cultura", momentum: "falling", velocity: 82, confidence: 91, sentiment: "Nostalgia", emotionIcon: "🎨", whyViral: "Éxito de reboots clásicos en 2D.", keywords: ["IndieAnimation", "2DRevival"], description: "Regreso de franquicias clásicas en animación 2D.", bias: "Efecto Arrastre", sources: [{title: "Rolling Stone", url: "https://www.rollingstone.com"}] },
    { id: 8, title: "F1: Expansion Controversy", category: "Deportes", momentum: "stable", velocity: 78, confidence: 88, sentiment: "Crítico", emotionIcon: "🏎️", whyViral: "Polarización sobre la seguridad de nuevos circuitos.", keywords: ["F1Saudi", "SafetyFirst"], description: "Circuitos urbanos generan tensión entre sostenibilidad y espectáculo.", bias: "Disonancia Cognitiva", sources: [{title: "F1 News", url: "https://www.formula1.com"}] },
    { id: 9, title: "Silent Luxury Homes", category: "Cultura", momentum: "falling", velocity: 74, confidence: 93, sentiment: "Zen", emotionIcon: "🌿", whyViral: "Tendencia de 'Detox Digital' en interiores.", keywords: ["SilentLuxury", "AnalogLiving"], description: "Espacios habitacionales libres de tecnología visible.", bias: "Contracultura", sources: [{title: "AD Magazine", url: "https://www.admagazine.com/"}] },
    { id: 10, title: "SpaceX: Starship Milestones", category: "Tech", momentum: "rising", velocity: 65, confidence: 79, sentiment: "Heroico", emotionIcon: "🚀", whyViral: "Pruebas de reentrada atmosférica exitosas.", keywords: ["Starship", "Mars2026"], description: "Nuevas pruebas para la flota Starship.", bias: "Optimismo Ciego", sources: [{title: "Space.com", url: "https://www.space.com"}] }
  ],
  platformInsights: [
    { platform: "Instagram", topTrends: [{ topic: "#SpatialAvatars", description: "Filtros AR 3D liderando el contenido." }, { topic: "#GenAlphaCore", description: "Estética visual de la nueva generación." }, { topic: "#SlowLiving", description: "Minimalismo extremo en Reels." }] },
    { platform: "Facebook", topTrends: [{ topic: "#VintageSwap", description: "Intercambio de objetos físicos en grupos." }, { topic: "#SilverIA", description: "Usuarios +65 adoptando tecnología." }, { topic: "#LocalEconomy", description: "Apoyo a mercados de barrio." }] },
    { platform: "X", topTrends: [{ topic: "#FactCheckAI", description: "Debates verificados por blockchain." }, { topic: "#GTAVILive", description: "Trending topic por filtraciones." }, { topic: "#MarsStarship", description: "Hilos sobre el descenso en Marte." }] },
    { platform: "YouTube", topTrends: [{ topic: "#MultiCamExperience", description: "Documentales con cámara libre." }, { topic: "#AIDisruption", description: "Vídeos ensayo sobre arte e IA." }, { topic: "#WorldCupTactics", description: "Previas de las sedes 2026." }] },
    { platform: "LinkedIn", topTrends: [{ topic: "#FractionalTalent", description: "Auge de directivos independientes." }, { topic: "#WorkAutomation", description: "Nuevos flujos con IA operativa." }, { topic: "#NoDegreeHiring", description: "Contratación basada en retos." }] }
  ],
  roadmap: [
    { date: "Mar 18", event: "Actualización Inteligencia", status: "Hoy", importance: "Alta" },
    { date: "Mar 20", event: "Equinoccio Primavera", status: "Próximo", importance: "Baja" },
    { date: "Mar 22", event: "Día Mundial del Agua", status: "Próximo", importance: "Media" },
    { date: "Mar 25", event: "Cumbre IA Silicon Valley", status: "Planificación", importance: "Alta" },
    { date: "Mar 29", event: "Semana Santa: D. Ramos", status: "Planificación", importance: "Alta" },
    { date: "Abr 2", event: "Jueves Santo", status: "Crítico", importance: "Alta" },
    { date: "Abr 3", event: "Viernes Santo", status: "Crítico", importance: "Alta" },
    { date: "Abr 5", event: "Pascua de Resurrección", status: "Ejecución", importance: "Alta" },
    { date: "Abr 7", event: "Día Mundial de la Salud", status: "Próximo", importance: "Media" },
    { date: "Abr 15", event: "Cierre Fiscal Global", status: "Planificación", importance: "Media" },
    { date: "Abr 22", event: "Día de la Tierra", status: "Crítico", importance: "Alta" },
    { date: "Abr 23", event: "Día del Libro", status: "Próximo", importance: "Media" },
    { date: "May 1", event: "Día del Trabajador", status: "Ejecución", importance: "Alta" },
    { date: "May 4", event: "Met Gala 2026", status: "Crítico", importance: "Alta" },
    { date: "May 8", event: "Día Cruz Roja", status: "Próximo", importance: "Baja" },
    { date: "May 15", event: "Festival IA Europa", status: "Oportunidad", importance: "Media" },
    { date: "May 20", event: "Cannes Festival (Inicio)", status: "Planificación", importance: "Media" },
    { date: "Jun 5", event: "Día Medio Ambiente", status: "Próximo", importance: "Alta" },
    { date: "Jun 11", event: "Kickoff Mundial FIFA", status: "Impacto Máximo", importance: "Alta" },
    { date: "Jun 21", event: "Solsticio Verano", status: "Próximo", importance: "Baja" }
  ]
};

/**
 * Componente Principal: App
 * Gestiona el panel de control ZUPRAL con sincronización Gemini 2.5 Flash.
 */
export default function App() {
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState(FALLBACK_DATA.trends);
  const [insights, setInsights] = useState(FALLBACK_DATA.platformInsights);
  const [roadmap, setRoadmap] = useState(FALLBACK_DATA.roadmap);
  const [filter, setFilter] = useState("Todos");
  const [expandedId, setExpandedId] = useState(null);
  const [toast, setToast] = useState(null);
  const [currentDynamicDate, setCurrentDynamicDate] = useState(getFormattedDate());

  // Limpieza de JSON para manejar respuestas de IA con formato Markdown o texto extra
  const safeJsonParse = (str) => {
    if (!str) return null;
    try {
      const cleaned = str.replace(/```json|```/g, '').trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch (e) { 
      return null; 
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const syncIntelligence = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    
    const today = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    
    const systemPrompt = `ACTÚA COMO UN ANALISTA DE MARKETING DE ÉLITE. HOY ES ${today}.
    IDENTIFICA EXACTAMENTE LAS 10 TENDENCIAS MÁS VIRALES Y UN TOP 3 DE TRENDING TOPICS PARA LAS 5 REDES.
    IDENTIFICA LOS PRÓXIMOS 20 HITOS DEL ROADMAP CULTURAL DESDE HOY.
    DEVOLVER JSON: trends (10 items), platformInsights (5), roadmap (20).
    REGLA DE ORO: Solo responde con JSON puro.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Analiza el pulso viral global de hoy ${today}.` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          tools: [{ "google_search": {} }]
        })
      });

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      const data = safeJsonParse(text);
      
      if (data && data.trends) {
        setTrends(data.trends.map(t => ({
          ...t,
          sources: t.sources && t.sources.length > 0 ? t.sources : [{title: "Referencia", url: "https://www.google.com/search?q=" + encodeURIComponent(t.title)}]
        })));
        setInsights(data.platformInsights || FALLBACK_DATA.platformInsights);
        setRoadmap(data.roadmap || FALLBACK_DATA.roadmap);
        if (!isSilent) showToast("Inteligencia Sincronizada con éxito");
      }
    } catch (e) {
      if (!isSilent) showToast("API en espera. Datos locales activos.");
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, []);

  useEffect(() => { 
    syncIntelligence(true);
    const timer = setInterval(() => setCurrentDynamicDate(getFormattedDate()), 60000);
    return () => clearInterval(timer);
  }, [syncIntelligence]);

  const sortedTrends = useMemo(() => {
    const base = filter === "Todos" ? trends : trends.filter(t => t.category === filter);
    return [...base].sort((a, b) => b.velocity - a.velocity);
  }, [trends, filter]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- SISTEMA DE TOASTS --- */}
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in zoom-in duration-300">
          <div className="bg-cyan-500 text-slate-950 px-8 py-4 rounded-full font-black shadow-[0_0_40px_rgba(34,211,238,0.4)] flex items-center gap-3 text-sm border-2 border-white/20">
            <CheckCircle2 size={18} /> {toast}
          </div>
        </div>
      )}

      {/* --- CABECERA --- */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#020617]/80 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
              <Target className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-white uppercase flex items-center gap-2">
                TrendPulse <span className="text-[10px] font-medium text-slate-500 italic tracking-normal lowercase">{APP_VERSION}</span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Terminal Activa • {currentDynamicDate}</p>
              </div>
            </div>
          </div>
          <button onClick={() => syncIntelligence(false)} disabled={loading} className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${loading ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-white text-slate-950 hover:scale-105 active:scale-95'}`}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? 'SINCRONIZANDO...' : 'SYNC INTELLIGENCE'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        
        {/* --- FILTROS --- */}
        <section className="flex flex-wrap items-center justify-center gap-2 pb-4">
          {CATEGORIAS.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full text-xs font-black uppercase transition-all border ${filter === cat ? 'bg-cyan-500 text-slate-950 border-cyan-500 shadow-lg shadow-cyan-500/20' : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'}`}>{cat}</button>
          ))}
        </section>

        {/* --- WAR ROOM FEED --- */}
        <section className="grid gap-6">
          <div className="px-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-3"><Flame className="text-orange-500" size={24} /> WAR ROOM FEED</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium italic">Monitor dinámico de los 10 temas con mayor tracción digital. Analiza la velocidad de propagación y el sentimiento para detectar oportunidades estratégicas en tiempo real.</p>
          </div>

          <div className="grid gap-4">
            {sortedTrends.map((trend, index) => (
              <div key={trend.id} className={`group border transition-all duration-300 ${expandedId === trend.id ? 'bg-slate-900 border-cyan-500/30 rounded-[2rem] shadow-2xl' : 'bg-[#0f172a]/40 border-slate-800/50 rounded-[3rem] hover:bg-slate-900/50'}`}>
                <div className="p-6 cursor-pointer flex items-center justify-between" onClick={() => setExpandedId(expandedId === trend.id ? null : trend.id)}>
                  <div className="flex items-center gap-6 flex-1">
                    <div className="flex flex-col items-center justify-center border-r border-slate-800 pr-6 min-w-[70px]">
                      <span className="text-2xl font-black text-slate-600 group-hover:text-cyan-500 transition-colors">{String(index + 1).padStart(2, '0')}</span>
                      <div className="mt-1">
                        {trend.momentum === 'rising' ? <TrendingUp size={16} className="text-emerald-500" /> : 
                         trend.momentum === 'falling' ? <TrendingDown size={16} className="text-red-500" /> : 
                         <MoveRight size={16} className="text-yellow-500" />}
                      </div>
                    </div>
                    <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-800" />
                        <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={150.8} strokeDashoffset={150.8 - (150.8 * trend.velocity / 100)} className={trend.velocity > 85 ? 'text-red-500' : 'text-cyan-500'} />
                      </svg>
                      <span className="text-[10px] font-black">{trend.velocity}%</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[9px] font-black uppercase text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">{trend.category}</span>
                        <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1">{trend.emotionIcon} {trend.sentiment}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{trend.title}</h4>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-slate-800/50 text-slate-400 group-hover:text-white transition-colors">{expandedId === trend.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
                </div>

                {expandedId === trend.id && (
                  <div className="px-8 pb-8 animate-in slide-in-from-top-2 duration-300">
                    <div className="h-px bg-slate-800/50 mb-8" />
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Evidencia de Autoridad</h5>
                          <div className="flex flex-wrap gap-3">
                            {trend.sources.map((s, i) => (
                              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-3 p-4 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/50 transition-all flex-1 min-w-[200px]">
                                <Link2 size={14} className="text-slate-500 group-hover/link:text-cyan-400" />
                                <div className="flex flex-col"><span className="text-xs font-bold text-slate-200 group-hover/link:text-white line-clamp-1">{s.title}</span><span className="text-[8px] text-slate-500 uppercase tracking-tighter">Verified Link</span></div>
                                <ExternalLink size={12} className="ml-auto text-slate-600 group-hover/link:text-cyan-400" />
                              </a>
                            ))}
                          </div>
                        </div>
                        <div className="p-5 bg-slate-950/50 rounded-3xl border border-slate-800 shadow-inner">
                          <h5 className="text-[10px] font-black text-indigo-400 uppercase mb-3 flex items-center gap-2"><BrainCircuit size={14}/> Sesgo Conductual</h5>
                          <p className="text-slate-300 text-sm font-medium leading-relaxed">{trend.description}</p>
                        </div>
                      </div>

                      <div className="bg-[#020617] rounded-[2.5rem] border border-slate-800 p-8 space-y-8 relative overflow-hidden shadow-inner">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><Activity size={80} /></div>
                        <div className="relative z-10">
                          <h5 className="text-cyan-400 font-black text-xs uppercase mb-3 flex items-center gap-2"><Zap size={16} /> Viral Trigger Analysis</h5>
                          <p className="text-slate-200 text-sm leading-relaxed font-semibold">{trend.whyViral}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 relative z-10">
                           <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                              <h6 className="text-[10px] font-black text-slate-500 uppercase mb-2">Clima Emocional</h6>
                              <span className="text-3xl mb-1">{trend.emotionIcon}</span>
                              <span className="text-[10px] font-black text-slate-200 uppercase">{trend.sentiment}</span>
                           </div>
                           <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                              <h6 className="text-[10px] font-black text-slate-500 uppercase mb-2">Data Confidence</h6>
                              <ShieldCheck className="text-emerald-500 mb-1" size={24} />
                              <span className="text-sm font-black text-white">{trend.confidence}%</span>
                           </div>
                        </div>
                        <div className="relative z-10">
                          <h6 className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2"><Hash size={14}/> Keywords & Social SEO</h6>
                          <div className="flex flex-wrap gap-2">
                            {trend.keywords.map(word => (
                              <span key={word} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-black rounded-lg transition-all hover:bg-indigo-500 hover:text-white cursor-default">#{word}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- SOCIAL ECOSYSTEM: PLATFORM COMMAND --- */}
        <section className="space-y-6">
          <div className="px-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-3"><MessageSquare className="text-indigo-500" size={24} /> PLATFORM COMMAND</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium italic">Matriz de Micro-Tendencias. Desglose Top 3 del pulso algorítmico por red social.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {insights.map((item, idx) => {
              const Icon = { Instagram, Facebook, X: Twitter, YouTube: Youtube, LinkedIn: Linkedin }[item.platform] || Globe;
              return (
                <div key={idx} className="bg-slate-900/30 border border-slate-800 p-6 rounded-[2.5rem] relative group hover:border-cyan-500/30 transition-all overflow-hidden flex flex-col shadow-lg min-h-[320px]">
                  <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-opacity"><Icon size={60} /></div>
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                      <Icon className="text-cyan-500" size={20} />
                      <h6 className="font-black text-xs text-white uppercase tracking-tighter">{item.platform}</h6>
                    </div>
                    
                    <div className="space-y-4">
                      {item.topTrends && item.topTrends.map((trend, tIdx) => (
                        <div key={tIdx} className="space-y-1 group/item">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-600 group-hover/item:text-cyan-400 transition-colors">0{tIdx + 1}</span>
                            <span className="text-[11px] font-black text-indigo-400 uppercase tracking-tighter truncate">{trend.topic}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight line-clamp-2 font-medium group-hover/item:text-slate-300 transition-colors">
                            {trend.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- ROADMAP CULTURAL --- */}
        <section className="space-y-6 pb-12">
          <div className="px-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-3"><Sparkles className="text-emerald-500" size={24} /> PROSPECTIVE HUB</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium italic">Calendario táctico global 2026. Hitos confirmados para Real-Time Marketing.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {roadmap.map((event, idx) => (
              <div key={idx} className={`p-5 rounded-[2.5rem] border transition-all ${event.status === 'Hoy' || event.status === 'Impacto Máximo' ? 'bg-emerald-500/5 border-emerald-500/20 shadow-lg' : 'bg-slate-900/20 border-slate-800/60 hover:bg-slate-800'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-slate-500 tracking-tighter">{event.date}</span>
                  <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${event.importance === 'Alta' ? 'bg-red-500/10 text-red-500' : 'bg-slate-800 text-slate-400'}`}>{event.importance}</div>
                </div>
                <h6 className="text-sm font-black text-slate-200 leading-tight mb-2 group-hover:text-emerald-400 transition-colors">{event.event}</h6>
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${event.status === 'Hoy' ? 'bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]' : event.status === 'Impacto Máximo' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                   <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{event.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 border-t border-slate-800/50 py-16 text-center">
        <Target className="text-cyan-500 mx-auto mb-4" size={28} />
        <h3 className="text-xl font-black text-white tracking-tighter uppercase">TrendPulse {APP_VERSION}</h3>
        <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em] mt-8 italic">ZUPRAL © 2026 • Real-Time Multi-Platform Sync</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; background-color: #020617; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}} />
    </div>
  );
}