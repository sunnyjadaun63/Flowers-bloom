import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { eventCategories } from '../data/eventsData';
import { SideRibbons } from '../components/DecorativeRibbon';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Award, 
  Users, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Layers, 
  Camera, 
  Calendar,
  ChevronRight
} from 'lucide-react';

export default function EventsHubPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative pb-20 bg-white">
      {/* Decorative Side Ribbons */}
      <SideRibbons />
      
      {/* 1. Hub Hero Banner (Flush directly under Navbar) */}
      <section className="relative min-h-[55vh] lg:min-h-[65vh] w-full overflow-hidden flex items-center justify-center text-center px-6 bg-stone-900 border-b border-stone-line m-0">
        <img
          src="/images/events/wedding-hero.jpg"
          alt="Luxury Event Planning"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-white space-y-6 py-16">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-widest font-semibold bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-stone-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Full-Service Event Planning & Floral Architecture</span>
          </div>

          <h1 className="font-instrument text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-white">
            Events We Plan & Manage
          </h1>

          <p className="font-sans text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
            From intimate ceremonies to grand festivals and enterprise product launches, we bring botanical mastery, bespoke production, and seamless execution to every milestone.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#live-experience-reel"
              className="rounded-full px-7 py-3 text-xs bg-white text-black font-semibold uppercase tracking-widest hover:bg-stone-200 transition-colors shadow-lg"
            >
              Watch Event Reel
            </a>
            <a
              href="#divisions-grid"
              className="rounded-full px-7 py-3 text-xs bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold uppercase tracking-widest hover:bg-white/20 transition-colors"
            >
              View All Divisions
            </a>
          </div>
        </div>
      </section>

      <div className="space-y-20 pt-12">

        {/* <section id="live-experience-reel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-950 text-white rounded-2xl overflow-hidden border border-stone-800 shadow-2xl relative">
            
            <div className="p-6 sm:p-10 border-b border-stone-800 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2 text-left">
                <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full">
                  <Camera className="w-3 h-3 text-amber-400" />
                  <span>Live Production Film & Scenography</span>
                </div>
                <h2 className="font-instrument text-3xl sm:text-5xl font-normal text-white leading-tight">
                  Atmosphere in Motion: <span className="italic text-stone-400">Floral Architecture & Staging</span>
                </h2>
                <p className="font-sans text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
                  Watch our on-site team transform historic venues and modern ballrooms with structural floral chandeliers, luxury aisle runners, and bespoke lighting design.
                </p>
              </div>

              <div className="flex items-center space-x-3 self-start lg:self-end">
                <Link
                  to="/contact"
                  className="rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-stone-200 transition-colors flex items-center space-x-1.5 shadow-md"
                >
                  <span>Book Atelier Consultation</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-stone-900/50">
              
              <div className="lg:col-span-8 relative aspect-[16/9] lg:aspect-auto min-h-[360px] sm:min-h-[460px] overflow-hidden bg-black flex items-center justify-center group">
                <video
                  ref={videoRef}
                  src="/images/events-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-stone-200">
                    4K Live Event Highlight
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-2">
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-full bg-black/70 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md transition-all duration-200"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-black/70 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md transition-all duration-200"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-800 text-left space-y-6 bg-stone-950/80">
                
                <div className="space-y-5">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block border-b border-stone-800 pb-2">
                    Production Capabilities Featured
                  </span>

                  {[
                    {
                      title: "Suspended Floral Ceiling Canopies",
                      desc: "Engineered overhead structures holding 2,000+ organic double-petal stems and lush green foliage."
                    },
                    {
                      title: "Bespoke Grand Entrance Arches",
                      desc: "Custom timber and metal framing wrapped in cascading florals tailored to venue dimensions."
                    },
                    {
                      title: "Synchronized Mood & Candle Styling",
                      desc: "Multi-height glass hurricane cylinders with scented botanical candles for immersive dining ambiance."
                    },
                    {
                      title: "White-Glove Day-Of Coordination",
                      desc: "Dedicated on-site floral engineers managing temperature, misting, and midnight breakdown."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="p-1 rounded-full bg-stone-900 border border-stone-700 text-amber-300 mt-0.5 flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-instrument text-base font-bold text-white leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-stone-400 mt-0.5 leading-relaxed font-sans">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-stone-900/90 border border-stone-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="block font-instrument text-2xl font-bold text-white">500+</span>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400">Events Executed</span>
                  </div>
                  <div className="border-l border-stone-800 pl-4">
                    <span className="block font-instrument text-2xl font-bold text-white">100%</span>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400">Fresh Guarantee</span>
                  </div>
                  <div className="border-l border-stone-800 pl-4">
                    <span className="block font-instrument text-2xl font-bold text-white">Zero</span>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400">Floral Foam</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section> */}

        {/* 3. Four Master Event Divisions Grid */}
        <section id="divisions-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">Our 4 Core Divisions</span>
            <h2 className="font-instrument text-3xl sm:text-4xl text-charcoal font-bold mt-1">
              Choose Your Event Department
            </h2>
            <p className="font-sans text-xs text-warm-neutral mt-2">
              Explore dedicated services, planning lead times, guest capacities, and instant budget estimators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventCategories.map((category) => (
              <Link
                key={category.id}
                to={`/events/${category.slug}`}
                className="group bg-white border border-stone-line rounded-sm overflow-hidden flex flex-col justify-between hover:border-black hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[16/9] bg-stone-100 overflow-hidden relative">
                  <img
                    src={category.heroImage}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-black uppercase tracking-wider">
                    {category.services.length} Specialized Services
                  </div>
                </div>

                <div className="p-8 space-y-4 text-left">
                  <h3 className="font-instrument text-3xl font-bold text-charcoal group-hover:opacity-85 transition-opacity">
                    {category.name}
                  </h3>
                  <p className="text-xs font-medium text-botanical italic">
                    {category.tagline}
                  </p>
                  <p className="font-sans text-xs text-warm-neutral leading-relaxed">
                    {category.description}
                  </p>

                  <div className="pt-2">
                    <span className="block text-[10px] uppercase tracking-widest font-semibold text-warm-neutral mb-2">Featured Services:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {category.services.slice(0, 4).map((s) => (
                        <span key={s.id} className="text-[11px] bg-stone-50 border border-stone-line px-2.5 py-1 rounded-full text-charcoal">
                          {s.title}
                        </span>
                      ))}
                      {category.services.length > 4 && (
                        <span className="text-[11px] bg-stone-100 px-2.5 py-1 rounded-full text-warm-neutral font-medium">
                          +{category.services.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-line/50 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-black">
                    <span>Explore {category.name.split('&')[0]} Division</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. The 4-Step Event Planning Roadmap */}
        <section className="bg-stone-50 border-y border-stone-line py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-warm-neutral">The Atelier Standard</span>
              <h2 className="font-instrument text-3xl sm:text-4xl text-charcoal font-bold mt-1">
                How We Plan & Execute
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Vision & Consultation",
                  desc: "We align on guest numbers, aesthetic palette, venue architecture, and budget parameters."
                },
                {
                  step: "02",
                  title: "3D Floral Concept",
                  desc: "Our architects generate bespoke visual moodboards and sample mockups of key installations."
                },
                {
                  step: "03",
                  title: "Farm Cold-Chain Sourcing",
                  desc: "Stems are cut to order from certified organic growers and transported in climate-controlled transit."
                },
                {
                  step: "04",
                  title: "White-Glove Production",
                  desc: "Our on-site floral crew manages setup, day-of maintenance, and clean zero-waste breakdown."
                }
              ].map((s, idx) => (
                <div key={idx} className="bg-white border border-stone-line p-6 rounded-sm space-y-3 text-left">
                  <span className="font-instrument text-3xl font-bold text-botanical block">{s.step}</span>
                  <h3 className="font-instrument text-xl font-bold text-charcoal">{s.title}</h3>
                  <p className="font-sans text-xs text-warm-neutral leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
