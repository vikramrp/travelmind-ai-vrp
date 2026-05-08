import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Compass, 
  DollarSign, 
  Info, 
  Clock, 
  Wind,
  Globe,
  Loader2,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Star,
  Users,
  Layers
} from 'lucide-react';
import { generateTravelPlan, TravelPlan } from './services/gemini';
import { MapView } from './components/MapView';

export default function App() {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(3);
  const [travelType, setTravelType] = useState('Leisure');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;

    setLoading(true);
    setError(null);
    try {
      const data = await generateTravelPlan(destination, duration, travelType);
      setPlan(data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate travel plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-orange-500/30 overflow-x-hidden">
      {/* Background Aura */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-serif italic font-bold tracking-tight">TravelMind</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Destinations</a>
          <a href="#" className="hover:text-white transition-colors">AI Engine</a>
          <a href="#" className="hover:text-white transition-colors">Community</a>
          <button className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-full text-white hover:bg-zinc-800 transition-all">
            Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-8">
              <Sparkles className="w-3 h-3 text-orange-500" />
              Next-Gen Itinerary Engine
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight text-white mb-8 leading-[0.9]">
              Travel <span className="italic font-normal">Smarter</span>. <br />
              Generated with <span className="relative inline-block">
                Intuition
                <div className="absolute bottom-2 left-0 w-full h-1 bg-orange-500/50 blur-sm" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Ditch the spreadsheets. Our AI architect constructs hyper-personalized 
              journeys based on your vibe, budget, and real-time cultural shifts.
            </p>
          </motion.div>

          {/* Search Bar - Glassmorphism */}
          <motion.form 
            onSubmit={handleGenerate}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-3 p-3 bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 rounded-[2rem] shadow-2xl max-w-4xl mx-auto group ring-1 ring-white/5"
          >
            <div className="flex-1 relative flex items-center pl-4">
              <span className="w-5 h-5 flex items-center justify-center">
                <MapPin className="text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
              </span>
              <input 
                type="text" 
                placeholder="Where is your heart taking you?" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-4 bg-transparent outline-none text-white placeholder:text-zinc-600 font-medium text-lg"
              />
            </div>
            
            <div className="h-10 w-[1px] bg-zinc-800 hidden md:block self-center mx-2" />
            
            <div className="flex items-center gap-2 px-6">
              <Calendar className="w-5 h-5 text-zinc-500" />
              <select 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="bg-transparent outline-none text-white font-medium cursor-pointer py-4 appearance-none hover:text-orange-500 transition-colors"
              >
                {[1,2,3,4,5,7,10,14].map(d => (
                  <option key={d} value={d} className="bg-zinc-950">{d} Days</option>
                ))}
              </select>
            </div>

            <button 
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-10 py-4 rounded-[1.5rem] font-bold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              Create My Journey
            </button>
          </motion.form>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl mb-12 flex items-center justify-center gap-2 font-medium"
            >
               <Info className="w-4 h-4" />
               {error}
            </motion.div>
          )}

          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="relative mb-12 scale-150">
                <div className="w-24 h-24 rounded-full border-2 border-zinc-800 border-t-orange-500 animate-[spin_3s_linear_infinite]" />
                <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-transparent border-b-blue-500 animate-[spin_2s_linear_infinite_reverse]" />
                <Globe className="absolute inset-0 m-auto w-10 h-10 text-white animate-pulse" />
              </div>
              <h3 className="text-3xl font-serif italic text-white mb-4">Architecting your experience...</h3>
              <p className="text-zinc-500 max-w-sm tracking-wide">Synthesizing local insights, logistics, and atmospheric details.</p>
            </motion.div>
          ) : plan ? (
            <motion.div 
              key="plan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-16"
            >
              {/* Plan Result View */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-widest border border-orange-500/20">
                        Generated Itinerary
                      </span>
                    </div>
                    <h2 className="text-6xl font-serif text-white mb-6 leading-tight">
                      {plan.destination}, <br />
                      <span className="italic font-light opacity-40">{plan.country}</span>
                    </h2>
                    <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl border-l border-zinc-800 pl-8">
                      {plan.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <StatCard icon={<DollarSign className="text-green-500" />} label="Budget Range" value={`${plan.estimatedBudget.currency} ${plan.estimatedBudget.low} - ${plan.estimatedBudget.high}`} />
                    <StatCard icon={<Compass className="text-orange-500" />} label="Experience" value={travelType} />
                    <StatCard icon={<Clock className="text-blue-500" />} label="Duration" value={`${duration} Days`} />
                  </div>
                </div>

                <div className="space-y-6">
                   <MapView destination={plan.destination} />
                </div>
              </div>

              {/* Bento Grid - Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cultural Box */}
                <div className="md:col-span-2 bg-zinc-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-zinc-800/50 hover:border-zinc-700 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                        <Info className="w-6 h-6 text-orange-500" />
                      </div>
                      <h3 className="text-2xl font-serif text-white italic">Cultural Etiquette</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                      {plan.culturalTips.map((tip, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-orange-500 font-mono text-sm opacity-50 mt-1">0{i+1}</span>
                          <p className="text-zinc-400 text-sm leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price Breakdown Box */}
                <div className="bg-zinc-900 group p-10 rounded-[2.5rem] border border-zinc-800 shadow-xl overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
                      <DollarSign className="w-32 h-32" />
                   </div>
                   <h3 className="text-2xl font-serif text-white italic mb-10 flex items-center gap-3">
                     <Zap className="w-5 h-5 text-green-500" />
                     Cost Insights
                   </h3>
                   <div className="space-y-6">
                    {plan.estimatedBudget.breakdown.map((item, i) => (
                      <div key={i} className="flex flex-col border-b border-zinc-800/50 pb-4">
                        <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mb-1">{item.category}</span>
                        <span className="text-white font-mono text-lg">{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Itinerary Timeline */}
              <div className="pt-20">
                <h3 className="text-4xl font-serif text-white italic mb-16 text-center">The Journey <span className="opacity-40">Unfolds</span></h3>
                <div className="space-y-24">
                  {plan.itinerary.map((day, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="relative md:grid md:grid-cols-4 gap-12"
                    >
                      <div className="md:col-span-1 mb-8 md:mb-0">
                         <div className="sticky top-12">
                            <span className="text-[10rem] font-serif font-black text-zinc-900 leading-none select-none -ml-4">
                              {day.day}
                            </span>
                            <div className="mt-[-2rem] space-y-1">
                               <p className="text-orange-500 font-mono text-xs uppercase tracking-widest pl-2">Timeline</p>
                               <h4 className="text-2xl font-serif italic text-white pl-2">{day.title}</h4>
                            </div>
                         </div>
                      </div>

                      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {day.activities.map((act, i) => (
                          <div key={i} className="bg-zinc-900/50 p-8 rounded-[2rem] border border-zinc-800/50 hover:bg-zinc-800/50 transition-all flex flex-col justify-between group">
                            <div>
                               <div className="flex items-center justify-between mb-6">
                                  <span className="px-3 py-1 bg-zinc-950 rounded-full text-zinc-500 text-[10px] font-mono tracking-widest uppercase border border-zinc-800">
                                    {act.time}
                                  </span>
                                  <MapPin className="w-4 h-4 text-zinc-700 group-hover:text-orange-500 transition-colors" />
                               </div>
                               <h5 className="text-lg font-bold text-white mb-4 leading-snug">
                                 {act.location}
                               </h5>
                               <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                                 {act.description}
                               </p>
                            </div>
                            <button className="text-orange-500 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                              See Details <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12"
            >
              {/* Bento Grid Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard 
                  className="md:col-span-2 md:h-80"
                  icon={<Compass className="w-6 h-6" />}
                  title="Atmospheric Accuracy"
                  desc="Using advanced LLMs to calculate the perfect 'vibe' for your trip, from rainy cobblestone walks to neon-lit nights."
                  accent="orange"
                />
                <FeatureCard 
                  className="md:h-80"
                  icon={<Users className="w-6 h-6" />}
                  title="Social Pulse"
                  desc="Localized trends and current hotspots updated in real-time."
                  accent="blue"
                />
                <FeatureCard 
                  className="md:h-80"
                  icon={<Shield className="w-6 h-6" />}
                  title="Logistics Proof"
                  desc="Every route is stress-tested against typical traffic and seasonality."
                  accent="green"
                />
                <FeatureCard 
                  className="md:col-span-2 md:h-80"
                  icon={<Layers className="w-6 h-6" />}
                  title="Multi-Dimensional Planning"
                  desc="It's not just a list of places. It's a cohesive narrative that builds day over day, ensuring your story is worth telling."
                  accent="purple"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 mt-40 pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Globe className="w-5 h-5 text-orange-500" />
                <span className="text-xl font-serif italic text-white">TravelMind AI</span>
              </div>
              <p className="text-zinc-600 text-sm max-w-sm">Designing experiences for the adventurous, the curious, and the bold. Powered by Gemini Intelligence.</p>
           </div>
           
           <div className="flex gap-12 text-sm font-medium text-zinc-500">
              <div className="flex flex-col gap-3">
                 <span className="text-zinc-300">Product</span>
                 <a href="#" className="hover:text-white">AI Engine</a>
                 <a href="#" className="hover:text-white">API Access</a>
              </div>
              <div className="flex flex-col gap-3">
                 <span className="text-zinc-300">Legal</span>
                 <a href="#" className="hover:text-white">Privacy</a>
                 <a href="#" className="hover:text-white">Terms</a>
              </div>
           </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900 text-center">
           <p className="text-zinc-700 text-[10px] uppercase tracking-[0.3em] font-mono">
             © 2026 TravelMind Engine · Tokyo · New York · Paris
           </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-3xl hover:bg-zinc-800 transition-all">
      <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-0.5">{label}</p>
        <p className="text-white font-medium text-sm">{value}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, className, accent }: { icon: React.ReactNode, title: string, desc: string, className?: string, accent: string }) {
  const accentColors = {
    orange: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    green: "text-green-500 bg-green-500/10 border-green-500/20",
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  }[accent as 'orange' | 'blue' | 'green' | 'purple'];

  return (
    <div className={`group p-8 bg-zinc-900/30 rounded-[2.5rem] border border-zinc-800/50 hover:bg-zinc-900/60 transition-all cursor-default ${className}`}>
      <div className={`p-4 rounded-2xl mb-6 inline-block transition-transform group-hover:scale-110 duration-500 ${accentColors}`}>
        {icon}
      </div>
      <h4 className="text-2xl font-serif italic text-white mb-4 group-hover:translate-x-1 transition-transform duration-500">{title}</h4>
      <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">{desc}</p>
    </div>
  );
}
