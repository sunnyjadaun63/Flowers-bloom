import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Sprout, Heart, Eye, Trees } from 'lucide-react';

const pillars = [
  {
    icon: Sprout,
    title: "Editorial Restraint",
    description: "We follow Scandinavian minimalist principles. Rather than crowding arrangements, we use structural branches, negative space, and natural stem curvature to let each bloom speak for itself."
  },
  {
    icon: Eye,
    title: "Radical Traceability",
    description: "Every stem in your arrangement can be traced back to its soil. We only work with boutique growers who verify water conservation systems and fair wages for field workers."
  },
  {
    icon: Trees,
    title: "Sensory Curation",
    description: "A bouquet is a living sculpture. We curate our stems for visual weight, double-petal textures, and organic notes—blending garden rose damask with fresh field rosemary."
  }
];

const timelineSteps = [
  {
    year: "2019",
    title: "Copenhagen Roots",
    description: "Handal Flowers & Events was born in a small studio in Denmark out of a desire to create a modern, minimalist alternative to traditional commercial floristry."
  },
  {
    year: "2021",
    title: "The Direct Trade Alliance",
    description: "We bypassed central flower auctions entirely, partnering directly with 12 organic flower growers to cut transit times and emissions in half."
  },
  {
    year: "2024",
    title: "New York Studio Opening",
    description: "We opened our design studio in New York's Greenhouse District, introducing local hand-couriers and our carbon-neutral delivery guarantee."
  },
  {
    year: "2026",
    title: "100% Zero Single-Use Plastics",
    description: "Achieved complete elimination of plastic wraps, synthetic tapes, and floral foam in favor of biodegradable kraft wrappers, natural jute twine, and organic hydration packs."
  }
];

export default function About() {
  return (
    <div className="space-y-20 pb-20 animate-in fade-in duration-300 text-left">
      
      {/* 1. Header Navigation & Editorial Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-botanical hover:text-terracotta transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Home</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold text-terracotta bg-stone-50 border border-stone-line px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-terracotta" />
              <span>Our Heritage & Sourcing</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl tracking-tight leading-none text-charcoal font-bold">
              The Art of <br />
              <span className="italic font-normal text-botanical">Floristry</span>, Redefined.
            </h1>
            
            <p className="font-sans text-xs sm:text-sm text-warm-neutral leading-relaxed">
              Founded on the principles of Danish minimalism and sustainable direct trade, Handal Flowers & Events creates botanical art for modern spaces. We believe that flowers should bring sensory joy without compromising the environment.
            </p>

            <blockquote className="border-l-2 border-stone-line pl-4 italic text-xs text-warm-neutral font-serif">
              "We don't wrap flowers. We frame nature." — Sarah Jenkins, Creative Director
            </blockquote>
          </div>

          {/* Hero Image - Florist workshop */}
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] bg-stone-100 border border-stone-line rounded-sm overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=1200" 
                alt="Florist hands arranging luxury stems in workshop" 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=1200";
                }}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Pillars */}
      <section className="bg-white border-y border-stone-line py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-md mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-botanical">Our Philosophy</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold">The Three Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, idx) => (
              <div key={idx} className="bg-canvas border border-stone-line p-6 rounded-sm space-y-4 shadow-xs">
                <div className="w-10 h-10 bg-white border border-stone-line rounded-full flex items-center justify-center text-botanical">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base text-charcoal font-semibold">{p.title}</h3>
                <p className="font-sans text-xs text-warm-neutral leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Minimalist History Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-md mx-auto space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-terracotta">Our Journey</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold">Milestones & Growth</h2>
        </div>

        <div className="relative border-l border-stone-line/75 ml-4 md:ml-0 md:grid md:grid-cols-4 md:border-l-0 md:border-t md:pt-8 md:gap-6">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="relative pl-6 pb-8 md:pl-0 md:pb-0 text-left space-y-2">
              {/* Timeline marker */}
              <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-botanical rounded-full md:left-0 md:-top-[37px] md:w-3.5 md:h-3.5 md:border-2 md:border-canvas" />
              
              <span className="font-serif text-lg font-bold text-botanical block md:text-xl">
                {step.year}
              </span>
              <h4 className="font-serif text-xs uppercase tracking-wider font-bold text-charcoal">
                {step.title}
              </h4>
              <p className="font-sans text-xs text-warm-neutral leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Ecological Direct Trade Sourcing Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-stone-line p-8 sm:p-12 rounded-sm items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="block text-[10px] uppercase tracking-widest font-semibold text-botanical">Sustainable Curation</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-bold leading-tight">
              Bypassing Auctions, <br />
              Supporting Direct Soil Growers.
            </h2>
            <p className="font-sans text-xs text-warm-neutral leading-relaxed">
              Standard commercial florists import stems that sit in wholesale cold warehouses for weeks. Our pipeline takes blooms straight from local organic greenhouse beds to our wrapping bench in under 36 hours. Every worker on our grower partners' teams receives certified living wages and health coverage.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-botanical" />
                <span className="font-sans text-[10px] uppercase tracking-wider font-semibold text-charcoal">FSI-Certified Farms</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-botanical" />
                <span className="font-sans text-[10px] uppercase tracking-wider font-semibold text-charcoal">Carbon-Offset Delivery</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 aspect-[16/10] bg-stone-100 rounded-sm overflow-hidden border border-stone-line/75">
            <img 
              src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&q=80&w=600" 
              alt="Sustainable pink flower buds" 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=600";
              }}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
