// Comprehensive step-by-step crop cultivation guide data for Krishi platform

export const CROP_GROWTH_GUIDES = [
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    family: 'Poaceae',
    season: 'Kharif (Monsoon) / Rabi',
    durationDays: '120 – 150 days',
    averageYield: '20 – 25 Quintals/Acre',
    marketCategory: 'Cereal / Food Grain',
    waterRequirement: '1,200 – 1,500 mm (Standing water 3-5 cm)',
    idealSoil: 'Clayey loam to heavy clay, pH 5.5 – 7.0',
    temperatureRange: '22°C – 32°C',
    image: '🌾',
    steps: [
      {
        stepNumber: 1,
        title: 'Land Preparation & Puddling',
        duration: 'Day -20 to -1',
        icon: 'Tractor',
        summary: 'Deep summer ploughing followed by puddling to reduce water percolation.',
        details: [
          'Plough the land 2–3 times using a mouldboard plough followed by cultivator.',
          'Puddle the soil twice with standing water (5–10 cm) to create an impervious subsoil layer that holds water.',
          'Level the field evenly using a wooden or laser leveller for uniform water distribution.',
          'Apply 5–10 tonnes of well-decomposed Farm Yard Manure (FYM) or compost per acre during final ploughing.'
        ],
        tips: 'Proper levelling saves up to 20% irrigation water and prevents weed hotspots.',
        stageCostPerAcre: 3500
      },
      {
        stepNumber: 2,
        title: 'Nursery Raising & Seed Treatment',
        duration: 'Day 1 to 25',
        icon: 'Sprout',
        summary: 'Select high-yielding certified seeds, treat with bio-fungicides, and raise seedlings.',
        details: [
          'Seed Rate: 12–15 kg/acre for transplanted rice; 20–25 kg/acre for direct seeded rice (DSR).',
          'Salt Water Test: Immerse seeds in 10% brine solution; discard floating chaffy seeds and wash sunken seeds thoroughly.',
          'Seed Treatment: Treat with Carbendazim (2g/kg) or Trichoderma viride (10g/kg) + Azospirillum (10g/kg) before sowing.',
          'Nursery Area: Prepare 400 sq. meters nursery bed per acre of main field.',
          'Maintain 2–3 cm water level in nursery after seedlings emerge. Spray urea (0.5%) if seedlings look pale at 15 days.'
        ],
        tips: 'Healthy 21–25 day old seedlings establish vigorous tillers and resist stem rot.',
        stageCostPerAcre: 2200
      },
      {
        stepNumber: 3,
        title: 'Transplanting & Spacing',
        duration: 'Day 25 to 30',
        icon: 'MoveRight',
        summary: 'Transplant 21–25 day old seedlings at precise spacing for optimal tillering.',
        details: [
          'Transplant 2–3 seedlings per hill at a shallow depth of 2–3 cm.',
          'Recommended spacing: 20 cm × 15 cm (Medium duration varieties) or 15 cm × 15 cm (Short duration varieties).',
          'Maintain a shallow water layer (2 cm) during the first 7–10 days to facilitate root anchoring.',
          'Perform gap filling within 7–10 days of transplanting to ensure uniform plant population.'
        ],
        tips: 'Shallow planting (2-3 cm) encourages early tillering. Deep planting delays tillering by 10-14 days.',
        stageCostPerAcre: 4000
      },
      {
        stepNumber: 4,
        title: 'Water Management & Alternate Wetting and Drying (AWD)',
        duration: 'Day 30 to 110',
        icon: 'Droplets',
        summary: 'Adopt AWD technique to save 25-30% water without reducing grain yield.',
        details: [
          'Keep shallow water (2–3 cm) until 7 days after transplanting for root establishment.',
          'Practice Alternate Wetting and Drying (AWD) using a field water tube: re-irrigate when water drops 15 cm below soil surface.',
          'Critical moisture stages: Panicle initiation (Day 45-55) and Flowering/Grain Filling (Day 75-90) require continuous 3-5 cm standing water.',
          'Drain field completely 10–12 days prior to expected harvest date to hasten uniform ripening.'
        ],
        tips: 'AWD saves up to 30% water and significantly reduces methane emissions from paddy fields.',
        stageCostPerAcre: 2500
      },
      {
        stepNumber: 5,
        title: 'Fertilizer & Nutrient Schedule',
        duration: 'Day 1 to 75',
        icon: 'FlaskConical',
        summary: 'Apply balanced NPK (120:60:60 kg/ha or 48:24:24 kg/acre) + Zinc Sulphate.',
        details: [
          'Basal Dose: Full dose of P (SSP or DAP), 50% Potash (MOP), 25% Nitrogen (Urea), and 10 kg Zinc Sulphate (21%) per acre at final land prep.',
          '1st Top Dressing (Active Tillering, Day 20-25): 50% remaining Nitrogen (Urea 30 kg/acre).',
          '2nd Top Dressing (Panicle Initiation, Day 45-50): Remaining 25% Nitrogen (Urea 15 kg/acre) + 50% remaining Potash (MOP 15 kg/acre).',
          'Foliar spray: 19:19:19 (10g/L) during panicle emergence if nutrient deficiency is noticed.'
        ],
        tips: 'Never apply Zinc Sulphate and DAP together in the same mix as they form insoluble zinc phosphate.',
        stageCostPerAcre: 3800
      },
      {
        stepNumber: 6,
        title: 'Weed Management & Inter-cultivation',
        duration: 'Day 10 to 45',
        icon: 'Scissors',
        summary: 'Pre-emergence herbicide followed by mechanical cono-weeder or manual weeding.',
        details: [
          'Pre-emergence: Apply Pretilachlor 50% EC @ 600 ml/acre or Pyrazosulfuron-ethyl 10% WP @ 80 g/acre at 3-5 days after transplanting in standing water.',
          'Mechanical Weeding: Run Cono-weeder at 15 and 30 days after transplanting to incorporate weeds and aerate roots.',
          'One hand weeding at 35–40 days to eliminate stubborn escaped weeds like Echinochloa (barnyard grass).'
        ],
        tips: 'Cono-weeder not only eliminates weeds but also churns soil, promoting deeper root growth and higher tiller count.',
        stageCostPerAcre: 2000
      },
      {
        stepNumber: 7,
        title: 'Pest & Disease Integrated Protection',
        duration: 'Day 30 to 100',
        icon: 'ShieldAlert',
        summary: 'Proactively scout for Stem Borer, Brown Planthopper (BPH), Blast, and Sheath Blight.',
        details: [
          'Yellow Stem Borer: Install pheromone traps @ 5/acre. Apply Chlorantraniliprole 18.5% SC @ 60 ml/acre or Cartap Hydrochloride 4G granules.',
          'Brown Planthopper (BPH): Create alleyways (passages) every 2 meters for aeration. Spray Pymetrozine 50% WDG @ 120 g/acre if nymph count > 5-10/hill.',
          'Rice Blast (Pyricularia oryzae): Spray Tricyclazole 75% WP @ 120 g/acre at first appearance of spindle-shaped lesions.',
          'Sheath Blight: Spray Hexaconazole 5% SC @ 400 ml/acre or Azoxystrobin 23% SC.'
        ],
        tips: 'Drain standing water for 2-3 days if BPH attack starts, as dry micro-climate arrests BPH multiplication.',
        stageCostPerAcre: 2800
      },
      {
        stepNumber: 8,
        title: 'Harvesting, Threshing & Storage',
        duration: 'Day 120 to 140',
        icon: 'BadgePercent',
        summary: 'Harvest when 85% of grains in panicle turn golden straw color.',
        details: [
          'Harvest when grain moisture is around 20–22%. Avoid delayed harvest to prevent grain shattering and bird damage.',
          'Use combine harvester or manual sickle cutting followed by mechanical thresher.',
          'Sun dry harvested grain for 2–3 days until moisture drops to 12–14% for safe storage.',
          'Store in airtight bags (PICS bags) or clean bins treated with neem leaf powder to prevent rice weevil (Sitophilus oryzae).'
        ],
        tips: 'Grain moisture below 14% prevents aflatoxin and fungal spoilage during prolonged storage.',
        stageCostPerAcre: 3500
      }
    ]
  },
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    family: 'Poaceae',
    season: 'Rabi (Winter)',
    durationDays: '110 – 135 days',
    averageYield: '18 – 22 Quintals/Acre',
    marketCategory: 'Cereal / Food Grain',
    waterRequirement: '350 – 500 mm (4-6 critical irrigations)',
    idealSoil: 'Well-drained loam or clay-loam, pH 6.0 – 7.5',
    temperatureRange: '15°C – 25°C',
    image: '🌾',
    steps: [
      {
        stepNumber: 1,
        title: 'Field Preparation & Residual Moisture',
        duration: 'Day -15 to -1',
        icon: 'Tractor',
        summary: 'Pre-sowing irrigation (Paleva) followed by disc harrow and cultivator ploughing.',
        details: [
          'Give pre-sowing irrigation (Paleva) to ensure uniform germination.',
          'Plough once with disc harrow followed by 2–3 cultivator passes to obtain fine pulverised tilth.',
          'Plank the soil after each ploughing to conserve moisture and ensure uniform seedbed.',
          'Incorporate 4–6 tonnes FYM/acre 3 weeks prior to sowing.'
        ],
        tips: 'Firm, fine seedbed ensures good soil-seed contact and rapid root anchoring.',
        stageCostPerAcre: 3000
      },
      {
        stepNumber: 2,
        title: 'Seed Selection & Fungicidal Treatment',
        duration: 'Day 1',
        icon: 'Sprout',
        summary: 'Certified seed treated with Carboxin + Thiram and Azotobacter bio-fertilizer.',
        details: [
          'Seed Rate: 40 kg/acre for timely sowing; 50 kg/acre for late sowing (after Nov 25).',
          'Varieties: HD-2967, HD-3086, PBW-550, DBW-187, DBW-303 (high yielding & rust resistant).',
          'Fungicidal Treatment: Treat seed with Carboxin 37.5% + Thiram 37.5% (Vitavax Power) @ 2.5 g/kg seed to prevent loose smut and flag smut.',
          'Bio-fertilizer inoculation: Coat seed with Azotobacter and PSB culture (500g each per 40kg seed) in jaggery water.'
        ],
        tips: 'Vitavax treatment eliminates loose smut which can otherwise ruin 15% of wheat heads.',
        stageCostPerAcre: 2000
      },
      {
        stepNumber: 3,
        title: 'Sowing Timing & Precision Line Seeding',
        duration: 'Day 1 to 5',
        icon: 'MoveRight',
        summary: 'Sow between Nov 5 – Nov 25 using Seed-cum-Fertilizer Drill at 5 cm depth.',
        details: [
          'Optimum sowing window: First fortnight of November (10–25 Nov) for peak yields.',
          'Row-to-row spacing: 20–22.5 cm; Plant depth: 4–5 cm. Avoid sowing deeper than 6 cm.',
          'Use Happy Seeder or Zero-Till drill if sowing directly into paddy stubble (conserves moisture and saves ₹1500/acre).'
        ],
        tips: 'Every week delay in sowing after Nov 25 reduces yield by 1.5 Quintals/Acre due to terminal heat stress.',
        stageCostPerAcre: 1800
      },
      {
        stepNumber: 4,
        title: 'Critical Irrigation Schedule (CRI Stage)',
        duration: 'Day 21 to 105',
        icon: 'Droplets',
        summary: 'Crown Root Initiation (CRI) at 21 days is the most sensitive irrigation stage.',
        details: [
          '1st Irrigation (CRI Stage, Day 20-22): Absolutely mandatory; missing this drops yield by 30%.',
          '2nd Irrigation (Tillering Stage, Day 40-45).',
          '3rd Irrigation (Late Jointing Stage, Day 60-65).',
          '4th Irrigation (Flowering Stage, Day 80-85).',
          '5th Irrigation (Milking / Grain Filling, Day 100-105): Use light irrigation during low wind hours to prevent crop lodging.'
        ],
        tips: 'Never irrigate on windy days during grain filling to prevent lodging (plants falling flat).',
        stageCostPerAcre: 2500
      },
      {
        stepNumber: 5,
        title: 'Fertilizer Application (NPK + Zinc)',
        duration: 'Day 1 to 45',
        icon: 'FlaskConical',
        summary: 'Apply 50 kg N + 25 kg P2O5 + 15 kg K2O per acre in split doses.',
        details: [
          'Basal Dose: Full P (DAP 55 kg/acre), full K (MOP 25 kg/acre), and 1/3rd Urea (30 kg/acre) placed below seed.',
          '1st Top Dressing: 1/3rd Urea (30 kg/acre) along with 1st irrigation at CRI stage (Day 21).',
          '2nd Top Dressing: Remaining 1/3rd Urea (30 kg/acre) before 2nd irrigation (Day 40-45).',
          'Micronutrients: Spray 0.5% Zinc Sulphate + 2.5% Urea solution at 45 and 60 days if leaves show yellow striping.'
        ],
        tips: 'Applying nitrogen after flowering causes late vegetative growth without increasing grain yield.',
        stageCostPerAcre: 3400
      },
      {
        stepNumber: 6,
        title: 'Weed Control (Phalaris minor & Broadleaf)',
        duration: 'Day 25 to 35',
        icon: 'Scissors',
        summary: 'Spray clodinafop / sulfosulfuron at 30-35 days after sowing.',
        details: [
          'For Canary Grass (Gulli danda / Phalaris minor): Spray Clodinafop-propargyl 15% WP @ 160 g/acre or Pinoxaden 5.1% EC @ 400 ml/acre in 150L water.',
          'For Broadleaf weeds (Bathua, Chenopodium): Spray 2,4-D amine salt 58% SL @ 400 ml/acre or Metsulfuron-methyl 20% WP @ 8 g/acre.',
          'Apply herbicide 30–35 days after sowing when weeds are at 2–3 leaf stage and soil has sufficient moisture.'
        ],
        tips: 'Use flat fan nozzle and spray when wind is calm for uniform canopy coverage.',
        stageCostPerAcre: 1500
      },
      {
        stepNumber: 7,
        title: 'Disease & Aphid Scouting (Rust Prevention)',
        duration: 'Day 50 to 95',
        icon: 'ShieldAlert',
        summary: 'Scout for Yellow/Brown Rust pustules and wheat aphids.',
        details: [
          'Yellow Rust (Puccinia striiformis): Check leaves for bright yellow stripes with powdery spore pustules. Spray Propiconazole 25% EC (Tilt) @ 200 ml/acre in 200L water at first notice.',
          'Wheat Aphid (Mahua): Spray Thiamethoxam 25% WG @ 40 g/acre or Imidacloprid 17.8% SL @ 50 ml/acre if aphid population exceeds 10–15 per earhead.'
        ],
        tips: 'Early morning scouting during fog helps spot yellow rust before it spreads across whole plots.',
        stageCostPerAcre: 1800
      },
      {
        stepNumber: 8,
        title: 'Harvesting & Safe Grain Storage',
        duration: 'Day 115 to 135',
        icon: 'BadgePercent',
        summary: 'Harvest when grains become hard and golden yellow with moisture < 12%.',
        details: [
          'Harvest when ears turn yellow, straw turns dry brittle, and grain cannot be dented with fingernail.',
          'Combine harvesting is cost-effective (₹1500-2000/acre) and separates grain from straw (bhusa).',
          'Dry grain under sunlight to 10–12% moisture.',
          'Store in moisture-proof containers or metal bins. Mix with 1 Celphos tablet (Aluminium phosphide 3g) per tonne for hermetic storage.'
        ],
        tips: 'Harvest during cool morning hours to minimize grain shattering losses.',
        stageCostPerAcre: 3000
      }
    ]
  },
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    family: 'Solanaceae',
    season: 'Year round (Kharif, Rabi, Zaid)',
    durationDays: '110 – 140 days',
    averageYield: '150 – 250 Quintals/Acre (15-25 Tonnes)',
    marketCategory: 'Vegetable / Commercial Cash Crop',
    waterRequirement: '600 – 800 mm (Drip irrigation highly recommended)',
    idealSoil: 'Rich sandy loam to red loam, pH 6.0 – 6.8',
    temperatureRange: '20°C – 30°C',
    image: '🍅',
    steps: [
      {
        stepNumber: 1,
        title: 'Bed Preparation & Mulching',
        duration: 'Day -15 to -1',
        icon: 'Tractor',
        summary: 'Raised beds with silver-black plastic mulch and inline drip irrigation pipes.',
        details: [
          'Prepare raised beds: 90 cm top width, 30 cm height, 30 cm furrows (120 cm center-to-center).',
          'Apply 10 tonnes decomposed FYM + 250 kg Neem cake + 2 kg Trichoderma per acre.',
          'Lay 16 mm inline drip lateral tubing with 40 cm dripper spacing.',
          'Cover beds with 25-30 micron silver-black reflective mulch sheet. Punch holes at 45–50 cm plant spacing.'
        ],
        tips: 'Plastic mulching controls weeds by 95%, retains soil moisture, and increases yield by 35%.',
        stageCostPerAcre: 8500
      },
      {
        stepNumber: 2,
        title: 'Pro-tray Seedling Raising',
        duration: 'Day 1 to 28',
        icon: 'Sprout',
        summary: 'Raise F1 hybrid seedlings in 98-cell pro-trays with sterilized coco-peat in shade net.',
        details: [
          'Seed Rate: 50–60 grams F1 hybrid seeds per acre (e.g., US-440, Arka Rakshak, Abhinav).',
          'Use 98-cavity plastic seedling trays filled with sterilized coco-peat enriched with Trichoderma.',
          'Sow 1 seed per cavity at 0.5 cm depth. Cover trays with black polythene sheet until germination (3-4 days).',
          'Harden seedlings 3-4 days before field transplanting by reducing watering and exposing to mild sunlight.'
        ],
        tips: 'Pro-tray raised seedlings have 100% intact root ball, zero transplant shock, and 98% field survival.',
        stageCostPerAcre: 4500
      },
      {
        stepNumber: 3,
        title: 'Field Transplanting & Drenching',
        duration: 'Day 28 to 30',
        icon: 'MoveRight',
        summary: 'Transplant 25-28 day old seedlings in evening hours and drench with humic acid + bio-fungicide.',
        details: [
          'Transplant in evening hours to prevent sun wilting.',
          'Spacing: Single row: 120 cm × 45 cm (7,400 plants/acre) or Zig-Zag paired row on bed: 50 cm × 50 cm (8,500 plants/acre).',
          'Immediate drenching: Apply Carbendazim (1g/L) + Humic acid (2ml/L) @ 50 ml per plant hole to protect from root rot and promote quick root flush.'
        ],
        tips: 'Dip root plug in Trichoderma viride suspension for 5 minutes before planting.',
        stageCostPerAcre: 3500
      },
      {
        stepNumber: 4,
        title: 'Staking & Trellising Support',
        duration: 'Day 20 to 35',
        icon: 'Tractor',
        summary: 'Erect bamboo or GI pipe trellising with nylon twine to support heavy fruiting branches.',
        details: [
          'Install 6-8 feet bamboo poles or GI pipes every 10–12 feet along each bed.',
          'Run 12-gauge GI wire at 3 feet and 5 feet heights.',
          'Tie plants with UV-stabilized nylon twine (tutoring) and prune secondary suckers up to 30 cm from ground.',
          'Keeps fruits away from wet soil, preventing fruit rot, slug damage, and allowing 3x better spray penetration.'
        ],
        tips: 'Trellised tomatoes yield 40% higher grade-A unblemished market fruits compared to un-staked bush crops.',
        stageCostPerAcre: 9000
      },
      {
        stepNumber: 5,
        title: 'Drip Fertigation Schedule',
        duration: 'Day 10 to 110',
        icon: 'FlaskConical',
        summary: 'Water-soluble fertilizers (WSF) injected weekly via Venturi drip system.',
        details: [
          'Vegetative Stage (Day 10-35): 19:19:19 @ 3 kg/acre every 3 days + Magnesium Sulphate 1 kg/acre.',
          'Flowering Stage (Day 36-60): 12:61:00 (MAP) @ 3 kg/acre + 13:00:45 @ 2 kg/acre + Boron 20% foliar spray (1g/L) for fruit set.',
          'Fruiting & Sizing Stage (Day 61-100): 00:00:50 (SOP) @ 4 kg/acre + Calcium Nitrate @ 3 kg/acre (never mix Calcium with Sulphate or Phosphate in same tank).',
          'Calcium prevents Blossom End Rot (black sunken patch at fruit base).'
        ],
        tips: 'Fertigate in morning hours. Flush drip lines with clean water for 15 minutes after each fertigation.',
        stageCostPerAcre: 8500
      },
      {
        stepNumber: 6,
        title: 'Disease Scouting & Treatment',
        duration: 'Day 20 to 110',
        icon: 'ShieldAlert',
        summary: 'Control Early Blight, Late Blight, Bacterial Wilt, and Leaf Curl Virus.',
        details: [
          'Early Blight (target board spots): Spray Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin + Difenoconazole @ 1 ml/L.',
          'Late Blight (water soaked rot in cloudy/rainy weather): Spray Metalaxyl-M + Mancozeb (Ridomil Gold) @ 2.5 g/L or Cymoxanil.',
          'Tomato Leaf Curl Virus (transmitted by Whiteflies): Install yellow sticky traps @ 25/acre. Spray Spiromesifen 22.9% SC @ 1 ml/L or Diafenthiuron @ 1.2 g/L.',
          'Fruit Borer (Helicoverpa armigera): Install pheromone traps @ 5/acre. Spray Emamectin Benzoate 5% SG @ 0.5 g/L or Flubendiamide @ 0.3 ml/L.'
        ],
        tips: 'Rotate chemical groups with different modes of action every 15 days to prevent insect resistance.',
        stageCostPerAcre: 6000
      },
      {
        stepNumber: 7,
        title: 'Harvesting, Grading & Crating',
        duration: 'Day 65 to 125',
        icon: 'BadgePercent',
        summary: 'Harvest at breaker/turning stage for distance markets or pink/red ripe stage for local retail.',
        details: [
          'Harvest stages: Green Mature (long distance transit 4-6 days), Breaker/Turning stage (2-3 days transit), Pink/Red Ripe (local mandi/supermarket sale within 24h).',
          'Harvest every 3–4 days in early morning or late afternoon with calyx attached.',
          'Grading: Grade into Grade-A (120-150g uniform red), Grade-B (80-120g), and Processing grade.',
          'Pack in 20–25 kg plastic crates. Avoid rough gunny bags which cause bruising and 20% transport loss.'
        ],
        tips: 'Harvesting with pedicel (green cap) attached extends fruit shelf life by 4-5 days.',
        stageCostPerAcre: 7000
      }
    ]
  },
  {
    id: 'mango',
    name: 'Mango (Orchard)',
    scientificName: 'Mangifera indica',
    family: 'Anacardiaceae',
    season: 'Perennial (Flowering Dec-Jan, Harvest Apr-Jun)',
    durationDays: '3 – 4 years to first crop; 30+ years lifespan',
    averageYield: '4 – 8 Tonnes/Acre (mature orchard 7+ years)',
    marketCategory: 'Horticulture / Fruit Tree',
    waterRequirement: '40 – 60 Litres/plant/day (flowering to fruit maturity)',
    idealSoil: 'Deep, well-drained alluvial or red loamy soil, pH 5.5 – 7.5',
    temperatureRange: '24°C – 35°C',
    image: '🥭',
    steps: [
      {
        stepNumber: 1,
        title: 'Pit Digging & Solarization',
        duration: 'May – June (Pre-monsoon)',
        icon: 'Tractor',
        summary: 'Dig 1m × 1m × 1m pits and allow them to solarize under summer heat for 1 month.',
        details: [
          'Layout: Ultra-High Density (UHDP) at 3m × 2m (674 plants/acre) or High Density at 5m × 5m (160 plants/acre) or Traditional at 10m × 10m (40 plants/acre).',
          'Dig pits of 1m × 1m × 1m in May. Leave open for 3-4 weeks to destroy soil-borne fungi and grubs through solarization.',
          'Refill pit mixture: 50% topsoil + 25 kg well-rotted FYM + 2 kg Single Super Phosphate (SSP) + 1 kg Neem cake + 50g Chlorpyrifos dust (against termites).'
        ],
        tips: 'UHDP (Ultra High Density) with drip irrigation delivers commercial yields from Year 3 compared to Year 7 in traditional spacing.',
        stageCostPerAcre: 12000
      },
      {
        stepNumber: 2,
        title: 'Graft Selection & Planting',
        duration: 'July – August (Monsoon)',
        icon: 'Sprout',
        summary: 'Plant genuine epicotyl / veneer grafted varieties (Alphonso, Banganapalli, Kesar, Dasheri, Amrapali).',
        details: [
          'Procure genuine certified disease-free grafts from ICAR/State Agriculture University accredited nurseries.',
          'Plant at the center of the pit such that the graft union stays 15–20 cm above soil level (never bury graft union).',
          'Provide a sturdy bamboo stake to prevent wind breakage of graft joint.',
          'Water immediately after planting and maintain moist soil around root basin.'
        ],
        tips: 'Keep graft union above soil level to prevent scion rooting and collar rot disease.',
        stageCostPerAcre: 9500
      },
      {
        stepNumber: 3,
        title: 'Pruning & Canopy Architecture',
        duration: 'Years 1 to 3 (Post-harvest)',
        icon: 'Scissors',
        summary: 'Train to modified central leader system for maximum sunlight penetration.',
        details: [
          'De-capitate main stem at 60–70 cm height to stimulate 3–4 primary scaffold branches in different directions.',
          'Cut primary branches at 40 cm to encourage secondary shoots; repeat to build a dome canopy.',
          'Remove all flower panicles during first 2 years to direct all plant energy into strong vegetative framework.',
          'Annual maintenance pruning: Remove dead wood, criss-cross branches, and water sprouts immediately after fruit harvest.'
        ],
        tips: 'Open center canopy allows sunlight into tree interior, reducing powdery mildew and anthracnose by 60%.',
        stageCostPerAcre: 4000
      },
      {
        stepNumber: 4,
        title: 'Flowering Induction & Paclobutrazol (Cultar)',
        duration: 'September – October',
        icon: 'FlaskConical',
        summary: 'Regulate alternate bearing and induce uniform profuse flowering.',
        details: [
          'Withhold irrigation from October to December to induce mild water stress which triggers flower bud differentiation.',
          'For commercial orchards (above 5 years): Apply Paclobutrazol (Cultar 23% SC) @ 3–5 ml per meter canopy diameter as collar soil drench in September.',
          'Cultar suppresses gibberellin, stops unwanted vegetative flushes, and ensures 90%+ uniform flowering in December.'
        ],
        tips: 'Paclobutrazol transforms alternate-bearing varieties like Alphonso into annual high yielders.',
        stageCostPerAcre: 3500
      },
      {
        stepNumber: 5,
        title: 'Orchard Irrigation & Drip Management',
        duration: 'January – May',
        icon: 'Droplets',
        summary: 'Resume drip irrigation when pea-sized fruits form to prevent fruit drop.',
        details: [
          'Stop irrigation during full bloom to ensure active bee pollination and prevent panicle drop.',
          'Resume irrigation once fruit set reaches pea-size (5–8 mm).',
          'Apply 30–50 litres per tree per day for adult trees, increasing to 60-80L during hot dry April-May.',
          'Mulch tree basins with dry paddy straw or sugarcane trash (10 cm thick) to conserve soil moisture.'
        ],
        tips: 'Water stress during fruit enlargement causes heavy fruit dropping and small fruit size.',
        stageCostPerAcre: 3000
      },
      {
        stepNumber: 6,
        title: 'Pest & Hopper Management',
        duration: 'December – March',
        icon: 'ShieldAlert',
        summary: 'Control Mango Hoppers, Powdery Mildew, and Fruit Fly.',
        details: [
          'Mango Hopper (Amritodus atkinsoni): Attack during panicle emergence, secreting honeydew causing sooty mold. Spray Thiamethoxam 25% WG (0.3g/L) or Imidacloprid (0.3ml/L) before flower opening.',
          'Powdery Mildew (Oidium mangiferae): Spray Wettable Sulphur 80% WP (2g/L) or Hexaconazole 5% EC (1ml/L) during panicle emergence.',
          'Fruit Fly (Bactrocera dorsalis): Install Methyl Eugenol pheromone lures (Phero-traps) @ 10 traps/acre 45 days before harvest.'
        ],
        tips: 'Do not spray chemical insecticides during peak flower opening hours (10am - 3pm) to save honeybee pollinators.',
        stageCostPerAcre: 5500
      },
      {
        stepNumber: 7,
        title: 'Harvesting with Pedicel & De-sapping',
        duration: 'April – June',
        icon: 'BadgePercent',
        summary: 'Harvest at 80% maturity with 8-10 mm stalk using mechanical mango harvester.',
        details: [
          'Maturity sign: Shoulders rise above stem attachment, pit forms around stalk, skin color changes from dark olive green to lighter green with white bloom.',
          'Harvest fruit with 1–2 cm stalk attached using ICAR pole harvester fitted with nylon net and cutter.',
          'De-sapping: Place fruits upside down in de-sapping racks for 4 hours to drain milky sap. Direct sap contact causes black skin burn and rot.',
          'Hot water treatment: Dip fruits at 48°C for 5 minutes to eliminate anthracnose spores and fruit fly eggs for export quality.'
        ],
        tips: 'Proper de-sapping prevents sap-burn skin spots that discount market value by 40%.',
        stageCostPerAcre: 6000
      }
    ]
  },
  {
    id: 'cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    family: 'Malvaceae',
    season: 'Kharif',
    durationDays: '150 – 180 days',
    averageYield: '10 – 14 Quintals/Acre (Kapas)',
    marketCategory: 'Cash Crop / Commercial Fiber',
    waterRequirement: '700 – 1,000 mm',
    idealSoil: 'Deep black cotton soil (Regur), pH 7.0 – 8.5',
    temperatureRange: '25°C – 35°C',
    image: '☁️',
    steps: [
      {
        stepNumber: 1,
        title: 'Deep Summer Ploughing & Residue Removal',
        duration: 'May – June',
        icon: 'Tractor',
        summary: 'Deep summer ploughing to expose pupae of Pink Bollworm to scorching sun.',
        details: [
          'Plough with subsoiler or deep MB plough to break hard subsoil pan and expose resting Pink Bollworm pupae.',
          'Destroy previous year stubbles and volunteer cotton plants.',
          'Apply 5 tonnes FYM per acre + 250 kg gypsum in saline-alkali soils.'
        ],
        tips: 'Deep ploughing destroys resting Pink Bollworm pupae in soil, preventing early-season infestation.',
        stageCostPerAcre: 3200
      },
      {
        stepNumber: 2,
        title: 'Bt Cotton Seed Treatment & Spacing',
        duration: 'June (onset of monsoon)',
        icon: 'Sprout',
        summary: 'Sow BG-II Bt hybrid seeds treated with Imidacloprid and Trichoderma.',
        details: [
          'Seed Rate: 2 packets (450g Bt + 120g non-Bt refuge) per acre.',
          'Sow 2–3 rows of non-Bt pigeon pea or non-Bt cotton around perimeter as refuge crop.',
          'Spacing: 90 cm × 60 cm (Heavy black soils) or 90 cm × 45 cm (Medium soils). Sowing depth: 3–4 cm.',
          'Seed treatment with Imidacloprid 70% WS @ 5 g/kg seed protects from sucking pests for 30-40 days.'
        ],
        tips: 'Planting non-Bt refuge rows is mandatory to prevent Pink Bollworm from developing resistance.',
        stageCostPerAcre: 2400
      },
      {
        stepNumber: 3,
        title: 'Nutrient & Split Nitrogen Schedule',
        duration: 'Day 15 to 90',
        icon: 'FlaskConical',
        summary: 'Apply NPK 100:50:50 kg/ha in 3 split doses + 1% Magnesium Sulphate.',
        details: [
          'Basal: Full P (DAP 50 kg/acre) + 20 kg Potash at sowing.',
          'Top dressing 1 (Square formation, Day 35-40): 40 kg Urea + 15 kg Potash per acre.',
          'Top dressing 2 (Peak flowering, Day 60-70): 30 kg Urea per acre.',
          'Foliar spray: 1% 13:00:45 (Potassium Nitrate) + 1% Magnesium Sulphate at 70 and 90 days to prevent leaf reddening (Lalya).'
        ],
        tips: 'Magnesium sulphate foliar spray prevents reddening of leaves which drastically reduces boll weight.',
        stageCostPerAcre: 4200
      },
      {
        stepNumber: 4,
        title: 'Sucking Pest & Pink Bollworm Defense',
        duration: 'Day 30 to 140',
        icon: 'ShieldAlert',
        summary: 'Scout for whiteflies, thrips, jassids, and install pink bollworm pheromone traps.',
        details: [
          'Install Pheromone traps @ 8 traps/acre for Pink Bollworm (Pectinophora gossypiella) monitoring from Day 45.',
          'ETL for Pink Bollworm: 8 moths/trap/night for 3 consecutive days or 10% rosette flowers.',
          'Spray Profenofos 50% EC @ 400 ml/acre or Spinetoram 11.7% SC @ 170 ml/acre when ETL is crossed.',
          'For Whitefly / Leafhopper: Spray Flonicamid 50% WG @ 80 g/acre or Dinotefuran 20% SG @ 60 g/acre.'
        ],
        tips: 'Install yellow sticky traps (15/acre) and blue sticky traps (10/acre) for thrips and whiteflies.',
        stageCostPerAcre: 4800
      },
      {
        stepNumber: 5,
        title: 'Defoliation & Clean Cotton Picking',
        duration: 'Day 130 to 175',
        icon: 'BadgePercent',
        summary: 'Pick clean, dry, leaf-free cotton in sunny afternoon hours in multiple pickings.',
        details: [
          'Pick when bolls open fully and fluff dry under sunlight.',
          'Pick in 3–4 pickings at 15–20 day intervals. Always pick clean cotton free from bracts, dried leaves, and dust.',
          'Store in clean cotton cloth bags, never in synthetic plastic fertilizer sacks (synthetic fibers severely downgrade lint grade at ginning mills).',
          'Keep moisture below 8% to prevent discoloration of lint in storage.'
        ],
        tips: 'Moisture above 9% in stored cotton causes yellowing and heat damage, reducing auction price by ₹400-600/Quintal.',
        stageCostPerAcre: 5000
      }
    ]
  },
  {
    id: 'chilli',
    name: 'Chilli',
    scientificName: 'Capsicum annuum',
    family: 'Solanaceae',
    season: 'Kharif / Rabi',
    durationDays: '140 – 180 days',
    averageYield: '15 – 25 Quintals/Acre (Dry) / 80 – 120 Quintals (Green)',
    marketCategory: 'Spices / Cash Crop',
    waterRequirement: '600 – 750 mm (Drip recommended)',
    idealSoil: 'Well drained black soil or sandy loam, pH 6.5 – 7.5',
    temperatureRange: '20°C – 32°C',
    image: '🌶️',
    steps: [
      {
        stepNumber: 1,
        title: 'Nursery & Pro-tray Raising',
        duration: 'Day 1 to 35',
        icon: 'Sprout',
        summary: 'Raise in insect-proof 40-mesh net nursery to protect from thrips and Gemini virus.',
        details: [
          'Seed Rate: 80–100 grams F1 hybrid seeds/acre (e.g., Guntur Sannam, Byadagi, Teja, Armoor).',
          'Sow in 98-cavity pro-trays with coco-peat + Trichoderma under 40-mesh insect-proof net house.',
          'Seed treatment with Imidacloprid 70% WS @ 5 g/kg seed prevents early thrips attack.',
          'Transplant 30–35 day old sturdy seedlings.'
        ],
        tips: 'Insect-proof net house prevents early Thrips infestation which transmits deadly Chilli Leaf Curl Virus.',
        stageCostPerAcre: 4800
      },
      {
        stepNumber: 2,
        title: 'Raised Bed & Black-Silver Mulch Transplanting',
        duration: 'Day 35 to 40',
        icon: 'MoveRight',
        summary: 'Pair row planting on raised beds with drip laterals and 25-micron mulch.',
        details: [
          'Make raised beds: 90 cm width, 30 cm height, 120 cm row-to-row spacing.',
          'Install inline drip laterals and lay 25-micron silver-black reflective mulch sheet.',
          'Plant in zigzag pattern at 45 cm × 45 cm spacing (approximately 7,000–8,000 plants/acre).',
          'Drench root zone with Carbendazim + Mancozeb (2g/L) to prevent collar rot/damping off.'
        ],
        tips: 'Silver mulch reflects sunlight into lower leaves, repelling thrips and aphids naturally.',
        stageCostPerAcre: 8000
      },
      {
        stepNumber: 3,
        title: 'Nutrient & Fertigation Protocol',
        duration: 'Day 15 to 140',
        icon: 'FlaskConical',
        summary: 'Balanced fertigation through drip: 19:19:19, 12:61:00, Potassium Nitrate, and Calcium.',
        details: [
          'Vegetative: 19:19:19 @ 3 kg/acre weekly + Micronutrient mixture foliar spray (2g/L).',
          'Flowering: 12:61:00 @ 2.5 kg/acre + Planofix (NAA 4.5% SL) @ 1 ml/4.5L water to prevent flower drop.',
          'Fruiting: 13:00:45 @ 4 kg/acre + 00:00:50 @ 3 kg/acre for vibrant red color and fruit pungency.',
          'Spray Boron 20% (1g/L) twice during flowering to prevent flower drop and fruit cracking.'
        ],
        tips: 'Planofix application at flowering reduces flower shedding by up to 45%.',
        stageCostPerAcre: 7500
      },
      {
        stepNumber: 4,
        title: 'Black Thrips & Murda Disease Control',
        duration: 'Day 40 to 140',
        icon: 'ShieldAlert',
        summary: 'Defend against invasive Black Thrips (Thrips parvispinus) and Mites.',
        details: [
          'Invasive Black Thrips feed inside flowers causing flower drop and fruit scarring.',
          'Install Blue Sticky Traps @ 25/acre at canopy level.',
          'Rotate sprays: Broflanilide 300 SC @ 0.25 ml/L, Spinetoram 11.7 SC @ 0.9 ml/L, or Cyantraniliprole 10.26 OD @ 1.2 ml/L.',
          'For Yellow Mites (downward curling): Spray Spiromesifen 22.9% SC @ 1 ml/L or Abamectin 1.9% EC @ 0.75 ml/L.',
          'Anthracnose / Dieback: Spray Azoxystrobin 23% SC @ 1 ml/L or Difenoconazole @ 0.5 ml/L.'
        ],
        tips: 'Black Thrips hide deep inside floral buds; use fine mist nozzles with organosilicone sticker for deep penetration.',
        stageCostPerAcre: 7000
      },
      {
        stepNumber: 5,
        title: 'Harvesting, Sun Drying & Processing',
        duration: 'Day 75 to 160',
        icon: 'BadgePercent',
        summary: 'Harvest deep red ripe chillies and dry on clean polythene sheets to 10% moisture.',
        details: [
          'Harvest when pods turn dark crimson red.',
          'Pick every 10–12 days; total 5–7 pickings.',
          'Sun dry chillies on clean tarpaulin or drying yards for 7–10 days until pods rattle with 10% moisture.',
          'Avoid drying directly on bare soil to prevent dust contamination and aflatoxin mold.',
          'Grade based on color (ASTA units), length, and intact stalks before taking to Guntur/Byadagi APMC market.'
        ],
        tips: 'Drying on raised nylon wire-mesh nets cuts drying time by 4 days and preserves deep red color (higher ASTA value = higher price).',
        stageCostPerAcre: 6500
      }
    ]
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    scientificName: 'Zea mays',
    family: 'Poaceae',
    season: 'Kharif / Rabi / Spring',
    durationDays: '90 – 115 days',
    averageYield: '25 – 35 Quintals/Acre',
    marketCategory: 'Cereal / Poultry Feed / Industrial Starch',
    waterRequirement: '500 – 650 mm',
    idealSoil: 'Deep, well drained fertile loam, pH 6.0 – 7.5',
    temperatureRange: '21°C – 32°C',
    image: '🌽',
    steps: [
      {
        stepNumber: 1,
        title: 'Land Prep & Ridge-Furrow Layout',
        duration: 'Day -10 to -1',
        icon: 'Tractor',
        summary: 'Make ridges and furrows at 60 cm spacing to avoid waterlogging.',
        details: [
          'Deep ploughing followed by 2 passes of cultivator and planking.',
          'Make ridges and furrows at 60 cm distance; sow on side of ridge to prevent seedling waterlogging.',
          'Incorporate 5 tonnes FYM + 25 kg Zinc Sulphate (21%) per acre at final ploughing.'
        ],
        tips: 'Maize cannot tolerate standing water for even 24 hours at seedling stage; ridge sowing prevents waterlogging.',
        stageCostPerAcre: 2800
      },
      {
        stepNumber: 2,
        title: 'Seed Rate & Precision Sowing',
        duration: 'Day 1 to 3',
        icon: 'Sprout',
        summary: 'Sow high yielding single cross hybrids at 60 cm × 20 cm spacing.',
        details: [
          'Seed Rate: 7–8 kg hybrid seed/acre (e.g., Pioneer P3396, DKC 9108, NK 6240).',
          'Seed Treatment: Treat with Cyantraniliprole 19.8% + Thiamethoxam 19.8% FS @ 6 ml/kg seed for Fall Armyworm defense.',
          'Spacing: 60 cm row-to-row × 20 cm plant-to-plant (33,000 plants/acre). Sowing depth: 4–5 cm.'
        ],
        tips: 'Maintaining optimum plant population of 33,000 plants/acre is the #1 driver for 30+ Quintal yields.',
        stageCostPerAcre: 2200
      },
      {
        stepNumber: 3,
        title: 'Fertilizer Application in Splits',
        duration: 'Day 1 to 60',
        icon: 'FlaskConical',
        summary: 'Apply NPK 60:30:20 kg/acre in 3 equal nitrogen splits.',
        details: [
          'Basal: Full P (DAP 50 kg/acre), full K (MOP 25 kg/acre), and 25 kg Urea placed below seed line.',
          '1st Top Dressing (Knee-high stage, Day 25-30): 35 kg Urea per acre followed by earthing up.',
          '2nd Top Dressing (Tasseling/Silking stage, Day 50-55): 30 kg Urea per acre.',
          'Earthing up at 30 days supports roots and prevents lodging in gusty winds.'
        ],
        tips: 'Earthing up at knee-high stage buries weeds and supports brace roots against strong winds.',
        stageCostPerAcre: 3500
      },
      {
        stepNumber: 4,
        title: 'Fall Armyworm (FAW) Eradication',
        duration: 'Day 10 to 60',
        icon: 'ShieldAlert',
        summary: 'Aggressive scout for Fall Armyworm (Spodoptera frugiperda) in leaf whorls.',
        details: [
          'Scout leaf whorls for window-pane leaf damage and coarse sawdust-like frass.',
          'Whorl application 1 (Day 15-20): Spray Chlorantraniliprole 18.5% SC @ 0.4 ml/L or Emamectin Benzoate 5% SG @ 0.4 g/L directly into central whorls.',
          'Whorl application 2 (Day 35-40): Apply Spinetoram 11.7% SC @ 0.5 ml/L or poison bait (10 kg rice bran + 1 kg jaggery + 100g Thiodicarb ferment for 24h, drop into whorls).'
        ],
        tips: 'Direct the spray nozzle straight down into leaf whorls where FAW caterpillars hide during daylight.',
        stageCostPerAcre: 2600
      },
      {
        stepNumber: 5,
        title: 'Harvesting, De-husking & Shelling',
        duration: 'Day 95 to 110',
        icon: 'BadgePercent',
        summary: 'Harvest when cob husk leaves turn paper-white and black layer forms at grain base.',
        details: [
          'Check for black physiological maturity layer at tip of kernel base.',
          'Harvest cobs, de-husk, and sun-dry cobs for 2–3 days.',
          'Shell using mechanical maize sheller.',
          'Dry shelled grain to 12% moisture before selling to poultry feed millers or storage.'
        ],
        tips: 'Grain moisture below 12% guarantees zero aflatoxin, qualifying for top price at poultry feed plants.',
        stageCostPerAcre: 3000
      }
    ]
  }
]

export const CROP_SEASONS = [
  { id: 'all', name: 'All Crops' },
  { id: 'Kharif', name: 'Kharif (Monsoon)' },
  { id: 'Rabi', name: 'Rabi (Winter)' },
  { id: 'Perennial', name: 'Perennial / Horticulture' },
  { id: 'Commercial', name: 'Commercial Cash Crops' }
]

export { CROP_GROWTH_GUIDES_TE, CROP_SEASONS_TE } from './cropGrowthDataTelugu'
