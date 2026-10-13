// Real-world Mandi (APMC) Market Prices and Post-Harvest Profit Estimator Data for Krishi

export const MANDI_COMMODITIES = [
  {
    id: 'rice_paddy',
    name: 'Rice / Paddy (Dhan)',
    cropKey: 'rice',
    category: 'Cereals',
    unit: '₹ / Quintal (100 kg)',
    modalPrice: 2320,
    minPrice: 2183,
    maxPrice: 2540,
    msp: 2300, // Government MSP 2024-25 Grade A
    dailyChange: +1.8,
    arrivalsTons: 12450,
    primaryMandi: 'Khanna Mandi, Punjab',
    bestSellingMonth: 'November – January',
    priceTrendHistory: [
      { month: 'May', price: 2180 },
      { month: 'Jun', price: 2200 },
      { month: 'Jul', price: 2220 },
      { month: 'Aug', price: 2260 },
      { month: 'Sep', price: 2290 },
      { month: 'Oct', price: 2320 },
    ],
    markets: [
      { state: 'Punjab', mandi: 'Khanna', min: 2280, modal: 2350, max: 2480, arrival: '4,200 Qtl' },
      { state: 'Haryana', mandi: 'Karnal', min: 2250, modal: 2340, max: 2460, arrival: '3,800 Qtl' },
      { state: 'Andhra Pradesh', mandi: 'Guntur', min: 2200, modal: 2310, max: 2420, arrival: '2,900 Qtl' },
      { state: 'Telangana', mandi: 'Nizamabad', min: 2210, modal: 2325, max: 2440, arrival: '2,500 Qtl' },
      { state: 'West Bengal', mandi: 'Burdwan', min: 2150, modal: 2280, max: 2390, arrival: '3,100 Qtl' },
      { state: 'Karnataka', mandi: 'Raichur', min: 2200, modal: 2300, max: 2410, arrival: '1,800 Qtl' }
    ],
    defaultYieldPerAcre: 22, // Quintals
    defaultCostPerAcre: 24300 // INR
  },
  {
    id: 'wheat',
    name: 'Wheat (Gehun)',
    cropKey: 'wheat',
    category: 'Cereals',
    unit: '₹ / Quintal (100 kg)',
    modalPrice: 2475,
    minPrice: 2275,
    maxPrice: 2680,
    msp: 2275, // Govt MSP
    dailyChange: +0.9,
    arrivalsTons: 8640,
    primaryMandi: 'Indore Mandi, Madhya Pradesh',
    bestSellingMonth: 'April – June',
    priceTrendHistory: [
      { month: 'May', price: 2320 },
      { month: 'Jun', price: 2360 },
      { month: 'Jul', price: 2410 },
      { month: 'Aug', price: 2440 },
      { month: 'Sep', price: 2460 },
      { month: 'Oct', price: 2475 },
    ],
    markets: [
      { state: 'Madhya Pradesh', mandi: 'Indore', min: 2400, modal: 2520, max: 2680, arrival: '3,200 Qtl' },
      { state: 'Punjab', mandi: 'Rajpura', min: 2350, modal: 2450, max: 2550, arrival: '2,800 Qtl' },
      { state: 'Uttar Pradesh', mandi: 'Kanpur', min: 2310, modal: 2420, max: 2530, arrival: '3,400 Qtl' },
      { state: 'Rajasthan', mandi: 'Kota', min: 2380, modal: 2490, max: 2600, arrival: '2,100 Qtl' },
      { state: 'Gujarat', mandi: 'Rajkot', min: 2420, modal: 2540, max: 2650, arrival: '1,600 Qtl' }
    ],
    defaultYieldPerAcre: 20,
    defaultCostPerAcre: 19000
  },
  {
    id: 'tomato',
    name: 'Tomato (Tamatar)',
    cropKey: 'tomato',
    category: 'Vegetables',
    unit: '₹ / Quintal (100 kg)',
    modalPrice: 2800, // ₹28/kg
    minPrice: 1800,
    maxPrice: 3800,
    msp: null, // No MSP for perishables
    dailyChange: -2.4,
    arrivalsTons: 18500,
    primaryMandi: 'Kolar Mandi, Karnataka',
    bestSellingMonth: 'July – August & November',
    priceTrendHistory: [
      { month: 'May', price: 1600 },
      { month: 'Jun', price: 2400 },
      { month: 'Jul', price: 3800 },
      { month: 'Aug', price: 3400 },
      { month: 'Sep', price: 2200 },
      { month: 'Oct', price: 2800 },
    ],
    markets: [
      { state: 'Karnataka', mandi: 'Kolar', min: 2200, modal: 2850, max: 3700, arrival: '5,500 Qtl' },
      { state: 'Maharashtra', mandi: 'Narayangaon / Pune', min: 2000, modal: 2750, max: 3600, arrival: '4,800 Qtl' },
      { state: 'Delhi', mandi: 'Azadpur', min: 2400, modal: 3100, max: 3900, arrival: '6,200 Qtl' },
      { state: 'Andhra Pradesh', mandi: 'Madanapalle', min: 2100, modal: 2800, max: 3500, arrival: '4,100 Qtl' },
      { state: 'Tamil Nadu', mandi: 'Oddanchatram', min: 2050, modal: 2700, max: 3450, arrival: '3,300 Qtl' }
    ],
    defaultYieldPerAcre: 180, // 18 tonnes
    defaultCostPerAcre: 52000
  },
  {
    id: 'mango',
    name: 'Mango (Aam - Commercial Varieties)',
    cropKey: 'mango',
    category: 'Fruits',
    unit: '₹ / Quintal (100 kg)',
    modalPrice: 6500, // ₹65/kg
    minPrice: 4500,
    maxPrice: 11000,
    msp: null,
    dailyChange: +3.2,
    arrivalsTons: 9200,
    primaryMandi: 'Vashi APMC, Navi Mumbai',
    bestSellingMonth: 'April – June',
    priceTrendHistory: [
      { month: 'May', price: 8200 },
      { month: 'Jun', price: 6800 },
      { month: 'Jul', price: 5400 },
      { month: 'Aug', price: 4900 },
      { month: 'Sep', price: 5100 },
      { month: 'Oct', price: 6500 },
    ],
    markets: [
      { state: 'Maharashtra', mandi: 'Vashi (Navi Mumbai)', min: 6500, modal: 8200, max: 14000, arrival: '3,800 Qtl' },
      { state: 'Andhra Pradesh', mandi: 'Tirupati / Chittoor', min: 4200, modal: 5800, max: 8000, arrival: '2,900 Qtl' },
      { state: 'Uttar Pradesh', mandi: 'Malihabad / Lucknow', min: 4500, modal: 6200, max: 9500, arrival: '3,400 Qtl' },
      { state: 'Gujarat', mandi: 'Talala Gir (Kesar)', min: 6000, modal: 7800, max: 12000, arrival: '2,100 Qtl' },
      { state: 'Karnataka', mandi: 'Srinivaspur', min: 4000, modal: 5500, max: 7600, arrival: '2,700 Qtl' }
    ],
    defaultYieldPerAcre: 60, // 6 tonnes (60 Qtl)
    defaultCostPerAcre: 43500
  },
  {
    id: 'cotton',
    name: 'Cotton (Kapas - Medium/Long Staple)',
    cropKey: 'cotton',
    category: 'Commercial Fibers',
    unit: '₹ / Quintal (100 kg)',
    modalPrice: 7420,
    minPrice: 6850,
    maxPrice: 7950,
    msp: 7121, // Govt MSP 2024-25 Medium staple
    dailyChange: +1.1,
    arrivalsTons: 14300,
    primaryMandi: 'Rajkot APMC, Gujarat',
    bestSellingMonth: 'December – February',
    priceTrendHistory: [
      { month: 'May', price: 7100 },
      { month: 'Jun', price: 7150 },
      { month: 'Jul', price: 7220 },
      { month: 'Aug', price: 7300 },
      { month: 'Sep', price: 7380 },
      { month: 'Oct', price: 7420 },
    ],
    markets: [
      { state: 'Gujarat', mandi: 'Rajkot', min: 7100, modal: 7550, max: 8050, arrival: '5,200 Qtl' },
      { state: 'Maharashtra', mandi: 'Akola', min: 6950, modal: 7400, max: 7850, arrival: '4,100 Qtl' },
      { state: 'Telangana', mandi: 'Warangal', min: 7000, modal: 7480, max: 7900, arrival: '3,800 Qtl' },
      { state: 'Punjab', mandi: 'Abohar', min: 6850, modal: 7350, max: 7750, arrival: '2,300 Qtl' },
      { state: 'Madhya Pradesh', mandi: 'Khandwa', min: 6900, modal: 7380, max: 7800, arrival: '2,600 Qtl' }
    ],
    defaultYieldPerAcre: 12, // Quintals
    defaultCostPerAcre: 21800
  },
  {
    id: 'chilli',
    name: 'Dry Red Chilli (Mirchi)',
    cropKey: 'chilli',
    category: 'Spices',
    unit: '₹ / Quintal (100 kg)',
    modalPrice: 19500, // ₹195/kg
    minPrice: 16000,
    maxPrice: 24500,
    msp: null,
    dailyChange: +2.7,
    arrivalsTons: 6400,
    primaryMandi: 'Guntur APMC (Asia’s Largest Chilli Yard)',
    bestSellingMonth: 'February – April',
    priceTrendHistory: [
      { month: 'May', price: 17500 },
      { month: 'Jun', price: 18100 },
      { month: 'Jul', price: 18700 },
      { month: 'Aug', price: 19000 },
      { month: 'Sep', price: 19200 },
      { month: 'Oct', price: 19500 },
    ],
    markets: [
      { state: 'Andhra Pradesh', mandi: 'Guntur Mirchi Yard', min: 17500, modal: 20200, max: 25500, arrival: '7,800 Qtl' },
      { state: 'Karnataka', mandi: 'Byadagi', min: 18000, modal: 22000, max: 28000, arrival: '4,200 Qtl' },
      { state: 'Telangana', mandi: 'Khammam', min: 16500, modal: 19400, max: 23500, arrival: '3,100 Qtl' },
      { state: 'Madhya Pradesh', mandi: 'Bediya (Khargone)', min: 15500, modal: 18500, max: 22000, arrival: '2,400 Qtl' }
    ],
    defaultYieldPerAcre: 18, // 18 Qtl dry chilli
    defaultCostPerAcre: 39800
  },
  {
    id: 'maize',
    name: 'Maize / Corn (Makka)',
    cropKey: 'maize',
    category: 'Cereals / Feed',
    unit: '₹ / Quintal (100 kg)',
    modalPrice: 2240,
    minPrice: 2090,
    maxPrice: 2420,
    msp: 2225, // Govt MSP
    dailyChange: +0.4,
    arrivalsTons: 9800,
    primaryMandi: 'Davanagere Mandi, Karnataka',
    bestSellingMonth: 'November – January',
    priceTrendHistory: [
      { month: 'May', price: 2100 },
      { month: 'Jun', price: 2130 },
      { month: 'Jul', price: 2160 },
      { month: 'Aug', price: 2190 },
      { month: 'Sep', price: 2210 },
      { month: 'Oct', price: 2240 },
    ],
    markets: [
      { state: 'Karnataka', mandi: 'Davanagere', min: 2120, modal: 2260, max: 2440, arrival: '2,900 Qtl' },
      { state: 'Bihar', mandi: 'Gulabbagh / Purnea', min: 2150, modal: 2290, max: 2460, arrival: '4,100 Qtl' },
      { state: 'Telangana', mandi: 'Karimnagar', min: 2100, modal: 2230, max: 2390, arrival: '2,200 Qtl' },
      { state: 'Maharashtra', mandi: 'Nashik', min: 2080, modal: 2210, max: 2380, arrival: '1,900 Qtl' },
      { state: 'Madhya Pradesh', mandi: 'Chhindwara', min: 2110, modal: 2240, max: 2410, arrival: '2,500 Qtl' }
    ],
    defaultYieldPerAcre: 30, // Quintals
    defaultCostPerAcre: 16300
  },
  {
    id: 'onion',
    name: 'Onion (Pyaaz)',
    cropKey: 'onion',
    category: 'Vegetables',
    unit: '₹ / Quintal (100 kg)',
    modalPrice: 3200, // ₹32/kg
    minPrice: 2200,
    maxPrice: 4200,
    msp: null,
    dailyChange: +4.5,
    arrivalsTons: 22400,
    primaryMandi: 'Lasalgaon APMC, Nashik, Maharashtra',
    bestSellingMonth: 'September – November',
    priceTrendHistory: [
      { month: 'May', price: 1400 },
      { month: 'Jun', price: 1800 },
      { month: 'Jul', price: 2200 },
      { month: 'Aug', price: 2700 },
      { month: 'Sep', price: 3100 },
      { month: 'Oct', price: 3200 },
    ],
    markets: [
      { state: 'Maharashtra', mandi: 'Lasalgaon (Nashik)', min: 2400, modal: 3250, max: 4300, arrival: '8,400 Qtl' },
      { state: 'Karnataka', mandi: 'Hubli', min: 2200, modal: 3100, max: 3950, arrival: '3,800 Qtl' },
      { state: 'Delhi', mandi: 'Azadpur', min: 2600, modal: 3500, max: 4400, arrival: '6,700 Qtl' },
      { state: 'Gujarat', mandi: 'Mahuva', min: 2100, modal: 2950, max: 3750, arrival: '3,200 Qtl' }
    ],
    defaultYieldPerAcre: 110, // 110 Qtl
    defaultCostPerAcre: 38000
  },
  {
    id: 'potato',
    name: 'Potato (Aloo)',
    cropKey: 'potato',
    category: 'Vegetables',
    unit: '₹ / Quintal (100 kg)',
    modalPrice: 1650, // ₹16.5/kg
    minPrice: 1350,
    maxPrice: 2050,
    msp: null,
    dailyChange: -1.2,
    arrivalsTons: 24000,
    primaryMandi: 'Agra Mandi, Uttar Pradesh',
    bestSellingMonth: 'October – December (Cold storage season)',
    priceTrendHistory: [
      { month: 'May', price: 1300 },
      { month: 'Jun', price: 1420 },
      { month: 'Jul', price: 1540 },
      { month: 'Aug', price: 1610 },
      { month: 'Sep', price: 1680 },
      { month: 'Oct', price: 1650 },
    ],
    markets: [
      { state: 'Uttar Pradesh', mandi: 'Agra', min: 1400, modal: 1680, max: 2100, arrival: '9,200 Qtl' },
      { state: 'West Bengal', mandi: 'Hooghly', min: 1350, modal: 1620, max: 1980, arrival: '6,400 Qtl' },
      { state: 'Punjab', mandi: 'Jalandhar', min: 1380, modal: 1650, max: 2020, arrival: '4,100 Qtl' },
      { state: 'Delhi', mandi: 'Azadpur', min: 1500, modal: 1750, max: 2200, arrival: '7,500 Qtl' }
    ],
    defaultYieldPerAcre: 120, // 120 Qtl
    defaultCostPerAcre: 35000
  },
  {
    id: 'soybean',
    name: 'Soybean (Pili Soyabean)',
    cropKey: 'soybean',
    category: 'Oilseeds',
    unit: '₹ / Quintal (100 kg)',
    modalPrice: 4720,
    minPrice: 4350,
    maxPrice: 5100,
    msp: 4892, // Govt MSP 2024-25
    dailyChange: +1.5,
    arrivalsTons: 16800,
    primaryMandi: 'Indore Mandi, Madhya Pradesh',
    bestSellingMonth: 'October – December',
    priceTrendHistory: [
      { month: 'May', price: 4400 },
      { month: 'Jun', price: 4500 },
      { month: 'Jul', price: 4580 },
      { month: 'Aug', price: 4650 },
      { month: 'Sep', price: 4690 },
      { month: 'Oct', price: 4720 },
    ],
    markets: [
      { state: 'Madhya Pradesh', mandi: 'Indore', min: 4500, modal: 4780, max: 5150, arrival: '6,500 Qtl' },
      { state: 'Maharashtra', mandi: 'Latur', min: 4450, modal: 4740, max: 5080, arrival: '5,800 Qtl' },
      { state: 'Rajasthan', mandi: 'Kota', min: 4400, modal: 4680, max: 5020, arrival: '3,200 Qtl' },
      { state: 'Karnataka', mandi: 'Bidar', min: 4350, modal: 4650, max: 4950, arrival: '1,900 Qtl' }
    ],
    defaultYieldPerAcre: 10, // 10 Qtl
    defaultCostPerAcre: 15500
  }
]

export { MANDI_COMMODITIES_TE } from './mandiPriceDataTelugu'
