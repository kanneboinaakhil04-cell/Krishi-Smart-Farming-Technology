import React, { createContext, useContext, useState, useEffect } from 'react'

export const TRANSLATIONS = {
  en: {
    langName: 'English',
    brandSubtitle: 'Smart Technology, Better Farming',
    farmerPortal: 'Farmer Portal',
    farmerLogin: 'Farmer Login',
    farmerName: 'Farmer Name',
    mobileNumber: 'Mobile Number',
    sendOtp: 'Send 4-Digit OTP Code',
    enterOtp: 'Enter 4-Digit OTP',
    kisanPin: 'Kisan PIN / Password',
    enterDashboard: 'Enter Krishi Dashboard',
    quickGuestLogin: 'Quick Farmer Guest Login (1-Click)',
    liveStatus: 'Agro-Telemetry Live • Active Season',
    askPlantDoctor: 'Ask Plant Doctor',
    takePlantPic: 'Take Plant Pic',
    switchFarmer: 'Exit / Login',
    helpDesk: 'Help Desk',

    // Nav & Sidebar
    home: 'Home & Overview',
    dashboard: 'Farm Dashboard',
    cropGuide: 'Step-by-Step Guide',
    mandiPrices: 'Mandi Prices & Profit',
    plantDoctor: 'AI Plant Doctor',
    weatherRadar: 'Weather & Soil Radar',
    iotSensors: 'IoT Sensors Panel',
    cropCalculator: 'Planting Calculator',
    schemes: 'Govt Schemes & Subsidies',
    expenseKhata: 'Farm Expense Khata',
    about: 'About',
    contact: 'Contact',

    // Hero Section
    heroBadge: 'Krishi Smart Agriculture Technology Platform',
    heroTitleLine1: 'Grow Smarter.',
    heroTitleLine2: 'Farm Better with Krishi.',
    heroDesc: 'Combining real IoT sensors, live satellite weather radar, step-by-step crop cultivation guides, Mandi APMC price intelligence, and AI Plant Doctor photo diagnostics.',
    heroBtnGuide: 'Step-by-Step Crop Guide',
    heroBtnDoctor: 'Take Plant Pic & Ask AI',

    // Stats
    statFarmers: 'Farmers Empowered',
    statWaterSaved: 'Water Saved',
    statCrops: 'Step-by-Step Crop Guides',
    statMandi: 'Live Weather & Mandi Rates',

    // Features Section
    featuresBadge: 'Krishi Ecosystem',
    featuresTitle: 'Everything You Need to Farm Smarter',
    featuresSubtitle: 'A complete suite of precision agriculture tools designed to give you control, visibility, and maximum profit over every acre.'
  },

  te: {
    langName: 'తెలుగు (Telugu)',
    brandSubtitle: 'స్మార్ట్ టెక్నాలజీ, మెరుగైన వ్యవసాయం',
    farmerPortal: 'రైతు పోర్టల్',
    farmerLogin: 'రైతు లాగిన్ (Farmer Login)',
    farmerName: 'రైతు పేరు',
    mobileNumber: 'మొబైల్ నంబర్',
    sendOtp: '4-అంకెల OTP కోడ్ పంపండి',
    enterOtp: '4-అంకెల OTP నమోదు చేయండి',
    kisanPin: 'కిసాన్ పిన్ / పాస్‌వర్డ్',
    enterDashboard: 'కృషి డాష్‌బోర్డ్‌లోకి ప్రవేశించండి',
    quickGuestLogin: 'త్వరిత రైతు లాగిన్ (1-క్లిక్)',
    liveStatus: 'లైవ్ అగ్రో-టెలిమెట్రీ • ప్రస్తుత సీజన్ యాక్టివ్',
    askPlantDoctor: 'మొక్కల డాక్టర్‌ను అడగండి',
    takePlantPic: 'మొక్క ఫోటో తీయండి',
    switchFarmer: 'లాగ్అవుట్ / రైతు మార్పు',
    helpDesk: 'రైతు సహాయ కేంద్రం',

    // Nav & Sidebar
    home: 'హోమ్ & అవలోకనం',
    dashboard: 'వ్యవసాయ డాష్‌బోర్డ్',
    cropGuide: 'పంటల సాగు పూర్తి గైడ్',
    mandiPrices: 'మార్కెట్ ధరలు & లాభం',
    plantDoctor: 'AI మొక్కల డాక్టర్',
    weatherRadar: 'వాతావరణం & నేల తేమ రాడార్',
    iotSensors: 'IoT సెన్సార్ల ప్యానెల్',
    cropCalculator: 'పంట నాటడం & నీటి కాలిక్యులేటర్',
    schemes: 'ప్రభుత్వ పథకాలు & సబ్సిడీలు',
    expenseKhata: 'రైతు ఖర్చుల ఖతా (లెడ్జర్)',
    about: 'మా గురించి',
    contact: 'సంప్రదించండి',

    // Hero Section
    heroBadge: 'కృషి స్మార్ట్ అగ్రికల్చర్ టెక్నాలజీ వేదిక',
    heroTitleLine1: 'తెలివిగా పండించండి.',
    heroTitleLine2: 'కృషితో అధిక దిగుబడి సాధించండి.',
    heroDesc: 'రియల్ IoT సెన్సార్లు, శాటిలైట్ వాతావరణ రాడార్, పంటల వారీగా స్టెప్-బై-స్టెప్ సాగు పద్ధతులు, లైవ్ మార్కెట్ ధరలు మరియు AI మొక్కల వ్యాధి గుర్తింపు.',
    heroBtnGuide: 'స్టెప్-బై-స్టెప్ పంటల గైడ్',
    heroBtnDoctor: 'ఆకు ఫోటో తీసి AI ని అడగండి',

    // Stats
    statFarmers: 'లబ్ది పొందిన రైతులు',
    statWaterSaved: 'ఆదా చేసిన సాగునీరు',
    statCrops: 'పూర్తి పంట సాగు గైడ్‌లు',
    statMandi: 'లైవ్ మార్కెట్ ధరల రేట్లు',

    // Features Section
    featuresBadge: 'కృషి వ్యవసాయ వ్యవస్థ',
    featuresTitle: 'రైతుకు అవసరమైన సమగ్ర స్మార్ట్ టూల్స్',
    featuresSubtitle: 'ప్రతి ఎకరాకు గరిష్ట దిగుబడి మరియు గరిష్ట మార్కెట్ లాభం అందించే అత్యాధునిక డిజిటల్ వ్యవసాయ సాధనాలు.'
  },

  hi: {
    langName: 'हिन्दी (Hindi)',
    brandSubtitle: 'स्मार्ट तकनीक, बेहतर खेती',
    farmerPortal: 'किसान पोर्टल',
    farmerLogin: 'किसान प्रवेश (Farmer Login)',
    farmerName: 'किसान का नाम',
    mobileNumber: 'मोबाइल नंबर',
    sendOtp: '4-अंकों का OTP कोड भेजें',
    enterOtp: '4-अंकों का OTP दर्ज करें',
    kisanPin: 'किसान पिन / पासवर्ड',
    enterDashboard: 'कृषि डैशबोर्ड में प्रवेश करें',
    quickGuestLogin: 'त्वरित किसान प्रवेश (1-क्लिक)',
    liveStatus: 'लाइव कृषि-टेलीमेट्री • सक्रिय सीजन',
    askPlantDoctor: 'प्लांट डॉक्टर से पूछें',
    takePlantPic: 'पौधे की फोटो लें',
    switchFarmer: 'लॉगआउट / किसान बदलें',
    helpDesk: 'किसान हेल्पलाइन',

    // Nav & Sidebar
    home: 'होम और विवरण',
    dashboard: 'खेत डैशबोर्ड',
    cropGuide: 'स्टेप-बाय-स्टेप फसल गाइड',
    mandiPrices: 'मंडी भाव और शुद्ध मुनाफा',
    plantDoctor: 'AI प्लांट डॉक्टर',
    weatherRadar: 'मौसम और मिट्टी की नमी',
    iotSensors: 'IoT सेंसर नेटवर्क',
    cropCalculator: 'फसल बुवाई कैलकुलेटर',
    schemes: 'सरकारी योजनाएं और सब्सिडी',
    expenseKhata: 'किसान बही-खाता (व्यय लेजर)',
    about: 'हमारे बारे में',
    contact: 'संपर्क करें',

    // Hero Section
    heroBadge: 'कृषि स्मार्ट कृषि प्रौद्योगिकी प्लेटफॉर्म',
    heroTitleLine1: 'स्मार्ट खेती करें.',
    heroTitleLine2: 'कृषि के साथ बेहतर फसल पाएं.',
    heroDesc: 'रियल IoT सेंसर, लाइव सैटेलाइट मौसम रडार, चरण-दर-चरण फसल उगाने की मार्गदर्शिका, दैनिक मंडी भाव और AI पौधा रोग निदान का संपूर्ण समाधान।',
    heroBtnGuide: 'फसल उगाने की संपूर्ण गाइड',
    heroBtnDoctor: 'पत्ती की फोटो लें और AI से पूछें',

    // Stats
    statFarmers: 'सशक्त किसान',
    statWaterSaved: 'पानी की बचत',
    statCrops: 'विस्तृत फसल गाइड',
    statMandi: 'दैनिक लाइव मंडी भाव',

    // Features Section
    featuresBadge: 'कृषि इकोसिस्टम',
    featuresTitle: 'स्मार्ट और लाभदायक खेती के संपूर्ण साधन',
    featuresSubtitle: 'हर एकड़ से अधिकतम पैदावार और सर्वोत्तम बाजार मूल्य प्राप्त करने के लिए अत्याधुनिक कृषि तकनीक।'
  }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('krishi_language') || 'en'
  })

  const changeLanguage = (newLang) => {
    setLang(newLang)
    localStorage.setItem('krishi_language', newLang)
  }

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
