export const eventCategories = [
  {
    id: "weddings",
    slug: "weddings",
    name: "Weddings & Nuptials",
    tagline: "Sacred vows, editorial florals & unforgettable receptions",
    heroImage: "/images/events/wedding-hero.jpg",
    accentColor: "rose",
    description: "From intimate candlelit vow renewals to grand estate celebrations, our floral architects and event producers curate immersive botanical landscapes that celebrate your unique love story.",
    stats: [
      { value: "350+", label: "Weddings Styled" },
      { value: "100%", label: "Custom Floral Architecture" },
      { value: "12-Month", label: "Dedicated Concierge" }
    ],
    services: [
      {
        id: "engagement-parties",
        title: "Engagement Parties",
        description: "Intimate garden soirees, rooftop cocktail evenings, and romantic floral backdrops to announce your union in bespoke elegance.",
        image: "/images/events/wedding-intimate.jpg",
        stems: "Garden Roses, Ranunculus, Trailing Ivy",
        guestCapacity: "20 - 150 guests",
        planningTime: "2 to 4 months",
        features: ["Custom floral arches", "Signature cocktail flower garnishes", "Table landscape styling"]
      },
      {
        id: "bridal-showers",
        title: "Bridal Showers",
        description: "Refined afternoon tea setups, blush flower walls, and petal-strewn tables celebrating the bride-to-be with close friends and family.",
        image: "/images/events/wedding-ceremony.jpg",
        stems: "Blush Peonies, Sweet Peas, French Lavender",
        guestCapacity: "15 - 80 guests",
        planningTime: "1 to 3 months",
        features: ["Flower crown crafting bar", "Mimosa cart floral installations", "Hand-tied favor bouquets"]
      },
      {
        id: "bachelor-bachelorette",
        title: "Bachelor & Bachelorette Parties",
        description: "Vibrant weekend celebration decor, ambient dinner table curations, and celebratory welcome gifts tailored to your bridal party style.",
        image: "/images/events/wedding-reception.jpg",
        stems: "Sunflowers, Eucalyptus, Exotic Greenery",
        guestCapacity: "8 - 40 guests",
        planningTime: "1 to 2 months",
        features: ["Custom suite floral styling", "Welcome gift hampers", "Lounge accent pieces"]
      },
      {
        id: "rehearsal-dinners",
        title: "Rehearsal Dinners",
        description: "Warm, ambient pre-wedding dinners featuring taper candles, low-profile botanical runners, and personalized place-setting blooms.",
        image: "/images/events/wedding-intimate.jpg",
        stems: "Saffron Lilies, White Hydrangeas, Olive Branches",
        guestCapacity: "20 - 100 guests",
        planningTime: "2 to 4 months",
        features: ["Taper candlescapes", "Linen & stoneware integration", "Acoustic atmosphere styling"]
      },
      {
        id: "ceremonies-receptions",
        title: "Wedding Ceremonies & Receptions",
        description: "Grand aisle floral meadows, magnificent altar chuppahs/arches, ceiling hanging chandeliers, and breathtaking banquet centerpieces.",
        image: "/images/events/wedding-ceremony.jpg",
        stems: "Alabaster Roses, Imperial Hydrangeas, Larkspur",
        guestCapacity: "50 - 600+ guests",
        planningTime: "6 to 14 months",
        features: ["3D floorplan & floral mockups", "Day-of production crew", "Ceremony-to-reception flip"]
      },
      {
        id: "intimate-micro-weddings",
        title: "Intimate & Micro-Weddings",
        description: "Ultra-luxury, highly detailed floral curations for boutique guest lists where every stem and place setting is an artisanal work of art.",
        image: "/images/events/wedding-intimate.jpg",
        stems: "Delicate Sweet Peas, Juliet Roses, Aromatic Herbs",
        guestCapacity: "10 - 50 guests",
        planningTime: "2 to 6 months",
        features: ["Private chef table styling", "Bespoke ceremony vignette", "Luxury keepsake bouquets"]
      },
      {
        id: "cultural-traditional",
        title: "Cultural & Traditional Weddings",
        description: "Honoring time-tested heritage traditions, sacred floral garlands, Mandap designs, tea ceremonies, and multi-day celebrations.",
        image: "/images/events/wedding-vow.jpg",
        stems: "Marigolds, Crimson Roses, Jasmine, Gold Chrysanthemums",
        guestCapacity: "100 - 1,000+ guests",
        planningTime: "6 to 18 months",
        features: ["Sacred ritual floral prep", "Multi-day setup management", "Heritage color harmonization"]
      },
      {
        id: "vow-renewals",
        title: "Vow Renewals",
        description: "Heartfelt milestone recommitments with organic floral backdrops, acoustic sunset settings, and intimate celebratory dinners.",
        image: "/images/events/wedding-vow.jpg",
        stems: "White Carnations, Olive Branches, French Lavender",
        guestCapacity: "10 - 100 guests",
        planningTime: "2 to 5 months",
        features: ["Recommitment floral arbor", "Repurposed anniversary motifs", "Sunset champagne toast"]
      },
      {
        id: "anniversary-celebrations",
        title: "Anniversary Celebrations",
        description: "Silver, golden, and milestone anniversary galas filled with memory lane floral installations, decadent tablescapes, and live music setups.",
        image: "/images/events/wedding-reception.jpg",
        stems: "Two-Dozen Crimson Roses, Gold Foliage, White Hydrangeas",
        guestCapacity: "30 - 300 guests",
        planningTime: "3 to 6 months",
        features: ["Anniversary year flower lore", "Lounge furniture rentals", "Custom memory photo flower wall"]
      }
    ]
  },
  {
    id: "birthdays",
    slug: "birthdays",
    name: "Birthday & Family Celebrations",
    tagline: "Milestone birthdays, baby showers & heartwarming family gatherings",
    heroImage: "/images/events/birthday-hero.jpg",
    accentColor: "gold",
    description: "Life's most precious milestones deserve extraordinary settings. We curate joyful, vibrant, and deeply personalized family celebrations designed to bring generations together.",
    stats: [
      { value: "500+", label: "Family Milestones" },
      { value: "All Ages", label: "Custom Party Concepts" },
      { value: "48h", label: "Fast-Track Planning Option" }
    ],
    services: [
      {
        id: "childrens-birthdays",
        title: "Children’s Birthday Parties",
        description: "Whimsical floral wonderlands, interactive flower crown stations, organic balloon-botanical installations, and themed dessert tables.",
        image: "/images/events/birthday-party.jpg",
        stems: "Sunflowers, Pastel Carnations, Wild Daisies",
        guestCapacity: "15 - 80 guests",
        planningTime: "1 to 2 months",
        features: ["Interactive sensory floral bar", "Kid-safe organic blooms", "Themed photo backdrops"]
      },
      {
        id: "milestone-birthdays",
        title: "Milestone Birthdays (21st, 30th, 50th, 80th)",
        description: "Glamorous bespoke birthday galas, cocktail lounges, dramatic entryway floral arches, and personalized birth month flower motifs.",
        image: "/images/events/birthday-milestone.jpg",
        stems: "Peach Roses, Peonies, Golden Chrysanthemums",
        guestCapacity: "30 - 250 guests",
        planningTime: "2 to 4 months",
        features: ["Birth month flower homage", "Custom marquee letters & blooms", "Live DJ & lighting integration"]
      },
      {
        id: "baby-showers",
        title: "Baby Showers",
        description: "Soft cloud-like floral clouds, neutral botanical greenery, sweet pastel floral arrangements, and welcoming guest seating.",
        image: "/images/events/baby-shower.jpg",
        stems: "Imperial White Hydrangea, Sweet Peas, Dusty Miller",
        guestCapacity: "20 - 90 guests",
        planningTime: "1 to 3 months",
        features: ["Nestling floral crib feature", "Botanical tea & mocktail bar", "Gift table floral framing"]
      },
      {
        id: "gender-reveal-parties",
        title: "Gender-Reveal Parties",
        description: "Suspenseful, joyful reveal moments with color-blooming floral boxes, mystery smoke & petals, and dual-tone tablescapes.",
        image: "/images/events/baby-shower.jpg",
        stems: "Pink Peonies, Blue Hydrangeas, White Roses",
        guestCapacity: "20 - 100 guests",
        planningTime: "1 to 2 months",
        features: ["Petal cannon coordination", "Dual-palette floral split arch", "Custom reveal countdown"]
      },
      {
        id: "naming-ceremonies",
        title: "Naming Ceremonies",
        description: "Sacred, serene botanical altars, flower blessing bowls, and peaceful ambient environments celebrating new life.",
        image: "/images/events/baby-shower.jpg",
        stems: "Olive Branches, White Carnations, Lavender",
        guestCapacity: "15 - 75 guests",
        planningTime: "1 to 2 months",
        features: ["Flower petal blessing vessel", "Aromatic sage & lavender scenting", "Keepsake botanical certificate"]
      },
      {
        id: "graduation-parties",
        title: "Graduation Parties",
        description: "Proud celebratory gatherings with university color-matched florals, photo wall displays, and festive outdoor tent decor.",
        image: "/images/events/birthday-milestone.jpg",
        stems: "Sunflowers, Blue Irises, Crimson Roses",
        guestCapacity: "30 - 150 guests",
        planningTime: "1 to 3 months",
        features: ["Alma mater color pairing", "Memory photo garland", "Buffet & cocktail styling"]
      },
      {
        id: "retirement-parties",
        title: "Retirement Parties",
        description: "Honoring lifetime achievements with refined dinner centerpieces, toast stations, and commemorative botanical gifts.",
        image: "/images/events/family-reunion.jpg",
        stems: "Terracotta Ranunculus, English Cream Roses, Salal Leaves",
        guestCapacity: "25 - 200 guests",
        planningTime: "2 to 4 months",
        features: ["Career retrospective decor", "Retirement memory guestbook bar", "Orchid plant keepsakes"]
      },
      {
        id: "family-reunions",
        title: "Family Reunions",
        description: "Multi-generational park or estate gatherings with expansive picnic tables, weather-proof floral decor, and interactive lawn games.",
        image: "/images/events/family-reunion.jpg",
        stems: "Wildflowers, Field Oats, Bright Sunflowers",
        guestCapacity: "40 - 300 guests",
        planningTime: "3 to 6 months",
        features: ["Long-table family dining runners", "Shaded pergola floral greenery", "Family tree photo showcase"]
      },
      {
        id: "holiday-celebrations",
        title: "Holiday Celebrations (Thanksgiving, Christmas, Easter)",
        description: "Seasonal feasts adorned with festive evergreen boughs, berry-laden table runners, glowing candlelight, and spring bulb bowls.",
        image: "/images/events/birthday-hero.jpg",
        stems: "Crimson Velvet Roses, Pine Cones, Winter Narcissus, Saffron Lilies",
        guestCapacity: "10 - 120 guests",
        planningTime: "1 to 3 months",
        features: ["Fireplace mantle botanical styling", "Gourmet dining placecards", "Festive entryway wreaths"]
      },
      {
        id: "celebration-of-life",
        title: "Celebration-of-Life & Memorial Services",
        description: "Dignified, peaceful tributes honoring beloved memories with serene white floral cascades, memory tables, and gentle acoustic environments.",
        image: "/images/events/wedding-vow.jpg",
        stems: "Alabaster Garden Roses, White Carnations, French Lavender",
        guestCapacity: "20 - 400 guests",
        planningTime: "Fast-track 24h to 1 week",
        features: ["Memory photo floral frame", "Seed packet memorial favors", "Quiet reflection ambient spaces"]
      }
    ]
  },
  {
    id: "corporate",
    slug: "corporate",
    name: "Corporate & Grand Openings",
    tagline: "Grand ribbon-cuttings, executive galas & high-impact product launches",
    heroImage: "/images/events/corporate-hero.jpg",
    accentColor: "slate",
    description: "Elevate your enterprise brand with world-class floral engineering, VIP hospitality environments, and flawless logistical execution for global brands and local founders alike.",
    stats: [
      { value: "180+", label: "Corporate Galas" },
      { value: "Fortune 500", label: "Trusted Partners" },
      { value: "Zero Downtime", label: "Precision Timing" }
    ],
    services: [
      {
        id: "grand-openings",
        title: "Grand Openings & Ribbon-Cutting Ceremonies",
        description: "Dramatic storefront floral garlands, ceremonial oversized scissors, branded floral step-and-repeats, and VIP welcome champagne carts.",
        image: "/images/events/grand-opening.jpg",
        stems: "Golden Lilies, Royal Anthuriums, Saffron Blooms",
        guestCapacity: "50 - 500+ attendees",
        planningTime: "1 to 3 months",
        features: ["Brand color flower walls", "Ceremonial ribbon & stanchions", "Media check-in floral styling"]
      },
      {
        id: "product-launches",
        title: "Product Launches",
        description: "High-concept sensory installations that integrate your product seamlessly into sculptural living botanicals for maximum press impact.",
        image: "/images/events/product-launch.jpg",
        stems: "White Hydrangea Sculptures, Ruscus, Minimalist Orchids",
        guestCapacity: "40 - 400 attendees",
        planningTime: "2 to 5 months",
        features: ["Product pedestal floral framing", "Press photo experiential zones", "Influencer gift botanicals"]
      },
      {
        id: "company-meetings-conferences",
        title: "Company Meetings & Conferences",
        description: "Clean, architectural stage florals, registration desk centerpieces, and executive boardroom botanical accents that promote focus and calm.",
        image: "/images/events/conference.jpg",
        stems: "Travertine Orchids, Monochromatic Hydrangeas, Snake Plants",
        guestCapacity: "50 - 2,000 attendees",
        planningTime: "2 to 6 months",
        features: ["Podium & keynote stage greenery", "Green breakout lounge zones", "Directional signage flower boxes"]
      },
      {
        id: "employee-appreciation",
        title: "Employee Appreciation Events",
        description: "Lively corporate banquets, individual hand-tied desk bouquets for team members, and relaxing garden party environments.",
        image: "/images/events/corporate-hero.jpg",
        stems: "Sunflowers, Peonies, Lavender Stems",
        guestCapacity: "30 - 800 employees",
        planningTime: "1 to 3 months",
        features: ["Bespoke employee gift bouquets", "Buffet & cocktail bar styling", "Team photo zone"]
      },
      {
        id: "corporate-holiday-parties",
        title: "Corporate Holiday Parties",
        description: "Opulent end-of-year galas, winter wonderland themed ballrooms, hanging botanical chandeliers, and festive dancefloor surroundings.",
        image: "/images/events/gala-awards.jpg",
        stems: "Velvet Red Roses, Frosted Evergreen, White Hydrangeas",
        guestCapacity: "75 - 1,200 attendees",
        planningTime: "3 to 8 months",
        features: ["Grand entrance archway", "Seated gala tablescapes", "Illuminated ice & flower bars"]
      },
      {
        id: "networking-events",
        title: "Networking Events & Mixers",
        description: "High-top cocktail floral accents, acoustic ambient soundscapes, and strategic conversation zones that foster organic connection.",
        image: "/images/events/conference.jpg",
        stems: "Monstera Leaves, Terracotta Ranunculus, Succulents",
        guestCapacity: "40 - 300 professionals",
        planningTime: "1 to 2 months",
        features: ["Low-profile bar floral pieces", "Subtle organic room scenting", "Sponsor booth greenery"]
      },
      {
        id: "award-ceremonies",
        title: "Award Ceremonies & Honors",
        description: "Prestigious stage backdrop designs, winner floral bouquets, VIP dinner table curations, and black-tie elegance.",
        image: "/images/events/gala-awards.jpg",
        stems: "English Cream Roses, Golden Chrysanthemums, Callas",
        guestCapacity: "100 - 1,500 attendees",
        planningTime: "3 to 8 months",
        features: ["Stage floral columns", "Winner presentation bouquets", "Red carpet floral border"]
      },
      {
        id: "fundraisers-galas",
        title: "Fundraisers & Charity Galas",
        description: "Philanthropic high-stakes galas designed to inspire generosity, featuring dramatic auction display framing and breathtaking centerpieces.",
        image: "/images/events/gala-awards.jpg",
        stems: "Midnight Violets, White Garden Roses, Trailing Jasmine",
        guestCapacity: "100 - 800 patrons",
        planningTime: "4 to 10 months",
        features: ["Silent auction table floral styling", "Donation podium accent", "Donor thank-you floral gifts"]
      },
      {
        id: "business-anniversaries",
        title: "Business Anniversaries",
        description: "Celebrating enterprise longevity and milestone years with company heritage retrospective displays and celebration dinners.",
        image: "/images/events/grand-opening.jpg",
        stems: "Yellow Trumpet Lilies, Golden Wheat, Dark Greenery",
        guestCapacity: "50 - 600 attendees",
        planningTime: "2 to 5 months",
        features: ["Milestone timeline floral accents", "Executive VIP toast bar", "Custom branded planter gifts"]
      },
      {
        id: "team-building-events",
        title: "Team-Building Floral Workshops",
        description: "Hands-on botanical design masterclasses led by master florists for executive retreats, fostering mindfulness, creativity, and bonding.",
        image: "/images/events/corporate-hero.jpg",
        stems: "Eucalyptus, Lavender, Seasonal Field Blooms",
        guestCapacity: "10 - 60 team members",
        planningTime: "2 weeks to 2 months",
        features: ["Individual masterclass toolkits", "Take-home bespoke arrangements", "Wine & floral pairing"]
      }
    ]
  },
  {
    id: "festivals",
    slug: "festivals",
    name: "Community, Festivals & Cultural Events",
    tagline: "Vibrant cultural fairs, public festivals & charitable gatherings",
    heroImage: "/images/events/festival-hero.jpg",
    accentColor: "emerald",
    description: "Transforming public plazas, parks, and community centers into lively, welcoming hubs of culture, celebration, and philanthropic fellowship.",
    stats: [
      { value: "40k+", label: "Festival Attendees" },
      { value: "City-Wide", label: "Public Permitting & Logistics" },
      { value: "Zero Waste", label: "Eco-Friendly Cleanup" }
    ],
    services: [
      {
        id: "festivals-and-fairs",
        title: "Festivals & Street Fairs",
        description: "Grand entryway floral gates, shaded community rest tents, botanical photo hotspots, and vibrant mainstage backdrop framing.",
        image: "/images/events/festival-hero.jpg",
        stems: "Giant Sunflowers, Wild Marigolds, Meadow Grasses",
        guestCapacity: "500 - 20,000+ visitors",
        planningTime: "4 to 12 months",
        features: ["Weather-hardy installations", "Large-scale crowd flow design", "Main stage greenery"]
      },
      {
        id: "school-church-events",
        title: "School & Church Events",
        description: "Annual galas, milestone convocations, sacred sanctuary decor for holy days, and community harvest celebrations.",
        image: "/images/events/cultural-fair.jpg",
        stems: "White Lilies, Blue Delphinium, Golden Wheat",
        guestCapacity: "100 - 1,500 attendees",
        planningTime: "1 to 4 months",
        features: ["Altar & auditorium floral design", "Youth celebration stage decor", "Family photo booths"]
      },
      {
        id: "nonprofit-events",
        title: "Nonprofit & NGO Gatherings",
        description: "Cost-effective, highly impactful botanical design that communicates mission values, sustainability, and community hope.",
        image: "/images/events/charity-gala.jpg",
        stems: "Organic Rosemary, Olive Branches, Lavender",
        guestCapacity: "50 - 800 guests",
        planningTime: "2 to 6 months",
        features: ["Sustainable upcycled planters", "Mission storytelling floral stations", "Volunteer appreciation flowers"]
      },
      {
        id: "cultural-celebrations",
        title: "Cultural Celebrations & Heritage Days",
        description: "Authentic, colorful floral traditions celebrating cultural identity, traditional folklore, harvest festivals, and ceremonial dances.",
        image: "/images/events/cultural-fair.jpg",
        stems: "Marigolds, Lotus Motifs, Carnation Garlands, Bright Dahlias",
        guestCapacity: "200 - 10,000 attendees",
        planningTime: "3 to 9 months",
        features: ["Heritage color symbolism", "Traditional flower garland crafting", "Ceremonial archways"]
      },
      {
        id: "religious-ceremonies",
        title: "Religious & Sacred Ceremonies",
        description: "Respectful, reverent floral altars, baptismal fonts, temple ornamentation, and sacred milestone celebrations.",
        image: "/images/events/charity-gala.jpg",
        stems: "White Narcissus, Porcelain Lilies, Salal Leaves",
        guestCapacity: "50 - 1,000 attendees",
        planningTime: "1 to 4 months",
        features: ["Sanctuary floral architecture", "Ceremonial flower bowls", "Quiet contemplative aesthetic"]
      },
      {
        id: "charity-events",
        title: "Charity Runs & Benefit Luncheons",
        description: "Energizing finish line floral banners, luncheon table centerpieces, and memorable donor recognition areas.",
        image: "/images/events/charity-gala.jpg",
        stems: "Peach Roses, Sunflowers, Eucalyptus",
        guestCapacity: "100 - 3,000 participants",
        planningTime: "2 to 6 months",
        features: ["Finish-line champion bouquets", "Outdoor registration floral desks", "Donor VIP tent styling"]
      },
      {
        id: "vendor-markets",
        title: "Artisan & Vendor Markets",
        description: "Cohesive market curation, organic booth dividers, central botanical seating hubs, and welcoming perimeter decor.",
        image: "/images/events/community-market.jpg",
        stems: "Potted Herbs, Lavender, Wildflower Bundles",
        guestCapacity: "300 - 5,000 shoppers",
        planningTime: "2 to 5 months",
        features: ["Artisan booth floral guidelines", "Central market gazebo styling", "Live botanical demonstration area"]
      },
      {
        id: "community-gatherings",
        title: "Community Townhalls & Gatherings",
        description: "Welcoming, inclusive community townhall environments, neighbor day celebrations, and local public park gatherings.",
        image: "/images/events/festival-booth.jpg",
        stems: "Mixed Seasonal Blooms, Aromatic Eucalyptus, Field Oats",
        guestCapacity: "50 - 1,000 residents",
        planningTime: "1 to 3 months",
        features: ["Community welcome arches", "Modular movable planter boxes", "Zero-waste composting plan"]
      }
    ]
  }
];
