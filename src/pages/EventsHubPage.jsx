import React from 'react';
import { Link } from 'react-router-dom';
import { eventCategories } from '../data/eventsData';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, Users } from 'lucide-react';

export default function EventsHubPage() {
  return (
    <div className="relative pb-20 bg-white">
      
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
        </div>
      </section>

      {/* Subsequent Sections Container */}
      <div className="space-y-16 pt-12">
        {/* 2. Four Master Event Divisions Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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

      {/* 3. The 4-Step Event Planning Roadmap */}
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
