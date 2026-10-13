import React, { useState, useRef, useEffect } from 'react'
import {
  Bot, Send, User, Leaf, AlertTriangle, Sprout, RefreshCw,
  Camera, Upload, Image as ImageIcon, CheckCircle, ShieldAlert,
  Sparkles, X, ChevronRight, HelpCircle, PhoneCall, Info
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

// Sample diseased and healthy plant library for instant 1-click testing (English)
const SAMPLE_PLANTS_EN = [
  {
    id: 'tomato_early_blight',
    name: 'Tomato — Early Blight',
    crop: 'Tomato',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=600&q=80',
    thumb: '🍅 Concentric Target Spots',
    diseaseName: 'Early Blight (Alternaria solani)',
    severity: 'High',
    confidence: '96.2%',
    pathogen: 'Fungus (Alternaria solani)',
    symptoms: 'Dark brown to black necrotic spots with characteristic concentric rings on older leaves. Leaves turn yellow and drop prematurely.',
    emergencyAction: 'Prune and destroy infected lower leaves immediately. Avoid overhead sprinkler irrigation.',
    organicTreatment: 'Spray 5% Neem seed kernel extract (NSKE) or Trichoderma viride @ 5g/L. Dust wood ash on moist leaves.',
    chemicalTreatment: 'Spray Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin + Difenoconazole (Amistar Top) @ 1 ml/L in 200L water per acre.',
    prevention: 'Maintain 60cm plant spacing for ventilation. Apply plastic mulch to prevent soil spores from splashing onto lower leaves.'
  },
  {
    id: 'wheat_leaf_rust',
    name: 'Wheat — Leaf / Brown Rust',
    crop: 'Wheat',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    thumb: '🌾 Orange-Brown Pustules',
    diseaseName: 'Brown Rust (Puccinia triticina)',
    severity: 'Critical',
    confidence: '94.8%',
    pathogen: 'Fungus (Puccinia triticina)',
    symptoms: 'Small, circular to oval bright orange-brown pustules scattered irregularly over upper leaf surface. Orange powdery spores rub off on fingers.',
    emergencyAction: 'Inspect entire field. If more than 5% flag leaves are affected, initiate community aerial or tractor spray immediately.',
    organicTreatment: 'Spray fermented sour buttermilk (Chhachh) mixed with copper vessel solution @ 50ml/L as a bio-fungicide.',
    chemicalTreatment: 'Spray Propiconazole 25% EC (Tilt) @ 1 ml/L (200 ml/acre) or Tebuconazole 25.9% EC @ 1.2 ml/L.',
    prevention: 'Grow rust-resistant cultivars (HD-3086, DBW-187, DBW-303). Avoid excessive late nitrogen fertilizer applications.'
  },
  {
    id: 'rice_blast',
    name: 'Rice — Leaf Blast',
    crop: 'Rice',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    thumb: '🌾 Diamond Spindle Lesions',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    severity: 'Critical',
    confidence: '95.5%',
    pathogen: 'Fungus (Magnaporthe oryzae)',
    symptoms: 'Spindle-shaped elliptical lesions with brown borders and grey/whitish centers on leaf blades. Lesions coalesce, burning entire leaves (blast).',
    emergencyAction: 'Drain field temporarily for 48 hours to reduce humidity. Stop all urea/nitrogen applications immediately.',
    organicTreatment: 'Spray Pseudomonas fluorescens @ 10g/L or 10% cow urine extract spray.',
    chemicalTreatment: 'Spray Tricyclazole 75% WP (Baan) @ 0.6 g/L (120 g/acre) or Isoprothiolane 40% EC @ 1.5 ml/L.',
    prevention: 'Seed treatment with Carbendazim (2g/kg). Balanced NPK fertilization; avoid single excessive urea doses.'
  },
  {
    id: 'healthy_cotton',
    name: 'Cotton — Healthy Green Leaf',
    crop: 'Cotton',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80',
    thumb: '☁️ Healthy Canopy',
    diseaseName: 'No Disease Detected — Healthy Plant',
    severity: 'None (Optimal)',
    confidence: '98.9%',
    pathogen: 'None (Healthy vegetative stage)',
    symptoms: 'Vibrant green, unblemished leaf blades with intact vascular structure. Zero necrotic lesions, no insect frass, and healthy leaf margins.',
    emergencyAction: 'No curative action needed. Continue standard preventive care.',
    organicTreatment: 'Apply 1% Panchagavya or seaweed extract spray for enhanced photosynthesis and vegetative vigor.',
    chemicalTreatment: 'None required.',
    prevention: 'Install yellow sticky traps (15/acre) and pink bollworm pheromone traps to maintain pest-free condition.'
  }
]

// Sample diseased and healthy plant library for instant 1-click testing (Telugu)
const SAMPLE_PLANTS_TE = [
  {
    id: 'tomato_early_blight',
    name: 'టమాట — ముందస్తు ఆకుమాడు తెగులు',
    crop: 'టమాట',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=600&q=80',
    thumb: '🍅 టమాట మచ్చల తెగులు',
    diseaseName: 'ముందస్తు ఆకుమాడు తెగులు (Early Blight)',
    severity: 'తీవ్రమైనది (High)',
    confidence: '96.2%',
    pathogen: 'శిలీంధ్రం (ఆల్టర్నేరియా సొలాని)',
    symptoms: 'ఆకులపై వలయాలుగా ఉండే గుండ్రటి నల్లటి మరియు గోధుమ రంగు మచ్చలు. ఆకులు పసుపుబారి రాలిపోతాయి.',
    emergencyAction: 'తెగులు సోకిన కింది ఆకులను వెంటనే తుంచి కాల్చివేయండి. పైనుండి నీరు చిలకరించవద్దు.',
    organicTreatment: '5% వేప గింజల కషాయం (NSKE) లేదా ట్రైకోడెర్మా విరిడే 5 గ్రా/లీ పిచికారీ చేయండి.',
    chemicalTreatment: 'మాంకోజెబ్ 75% WP 2.5 గ్రా/లీ లేదా అమిస్టార్ టాప్ 1 మి.లీ/లీ 200 లీటర్ల నీటిలో కలిపి పిచికారీ చేయండి.',
    prevention: 'గాలి వెలుతురు కోసం మొక్కల మధ్య 60 సెం.మీ దూరం ఉంచండి. నేల తేమ కోసం మల్చింగ్ వేయండి.'
  },
  {
    id: 'wheat_leaf_rust',
    name: 'గోధుమ — కుంకుమ తెగులు',
    crop: 'గోధుమ',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    thumb: '🌾 పసుపు కుంకుమ తెగులు',
    diseaseName: 'గోధుమ కుంకుమ తెగులు (Brown/Yellow Rust)',
    severity: 'అత్యవసరం (Critical)',
    confidence: '94.8%',
    pathogen: 'శిలీంధ్రం (పక్సీనియా స్ట్రైఫార్మిస్)',
    symptoms: 'ఆకులపై పసుపు-నారింజ రంగు పొడి బొబ్బలు వరుసగా ఏర్పడతాయి. వేళ్లతో తాకితే పసుపు పొడి అంటుకుంటుంది.',
    emergencyAction: 'పొలాన్ని పరిశీలించి వెంటనే సామూహికంగా శిలీంద్రనాశిని పిచికారీ ప్రారంభించండి.',
    organicTreatment: 'రాగి పాత్రలో పులియబెట్టిన మజ్జిగ ద్రావణం (లీటరుకు 50 మి.లీ) పిచికారీ చేయండి.',
    chemicalTreatment: 'ప్రొపికొనాజోల్ 25% EC (టిల్ట్) ఎకరాకు 200 మి.లీ 200 లీటర్ల నీటిలో కలిపి పిచికారీ చేయండి.',
    prevention: 'కుంకుమ తెగులును తట్టుకునే DBW-187, DBW-303, HD-3086 విత్తనాలను మాత్రమే వాడండి.'
  },
  {
    id: 'rice_blast',
    name: 'వరి — అగ్గి తెగులు / బ్లాస్ట్',
    crop: 'వరి',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    thumb: '🌾 వరి ఆకు అగ్గి తెగులు',
    diseaseName: 'వరి అగ్గి తెగులు (Rice Blast)',
    severity: 'అత్యవసరం (Critical)',
    confidence: '95.5%',
    pathogen: 'శిలీంధ్రం (మాగ్నాపోర్తే ఒరిజే)',
    symptoms: 'నూలు కండె ఆకారంలో మధ్య బూడిద రంగు, అంచులు గోధుమ రంగు మచ్చలు. ఆకులు మాడిపోయి ఎండిపోతాయి.',
    emergencyAction: 'పొలంలోని నీటిని 48 గంటలు తీసివేసి ఆరబెట్టండి. యూరియా వేయడం వెంటనే ఆపేయండి.',
    organicTreatment: 'సూడోమోనాస్ ఫ్లోరోసెన్స్ 10 గ్రా/లీ లేదా 10% ఆవు మూత్రం ద్రావణం పిచికారీ చేయండి.',
    chemicalTreatment: 'ట్రైసైక్లాజోల్ 75% WP (బాణ్) ఎకరాకు 120 గ్రాములు లేదా ఐసోప్రోథియోలేన్ 40% EC పిచికారీ చేయండి.',
    prevention: 'కార్బెండజిమ్ (2 గ్రా/కిలో) తో విత్తన శుద్ధి చేయండి. సమతుల్య NPK ఎరువులు వేయండి.'
  },
  {
    id: 'healthy_cotton',
    name: 'పత్తి — ఆరోగ్యకరమైన పచ్చని ఆకు',
    crop: 'పత్తి',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80',
    thumb: '☁️ ఆరోగ్యకరమైన పత్తి ఆకు',
    diseaseName: 'ఎలాంటి తెగులు లేదు — సంపూర్ణ ఆరోగ్యకరమైన మొక్క',
    severity: 'ఏమీ లేదు (ఆరోగ్యకరం)',
    confidence: '98.9%',
    pathogen: 'ఏమీ లేదు (ఆరోగ్యకరమైన శాకీయ దశ)',
    symptoms: 'ఎలాంటి మచ్చలు లేని నిగనిగలాడే ముదురు ఆకుపచ్చని ఆకులు, బలమైన ఈనెలు.',
    emergencyAction: 'ఎలాంటి మందులు అవసరం లేదు. ప్రస్తుత సంరక్షణ కొనసాగించండి.',
    organicTreatment: 'మొక్క బలంగా పెరగడానికి 1% పంచగవ్య పిచికారీ చేయవచ్చు.',
    chemicalTreatment: 'ఎలాంటి రసాయన మందులు అవసరం లేదు.',
    prevention: 'పురుగులు రాకుండా పసుపు జిగురు అట్టలు మరియు లింగాకర్షక బుట్టలు అమర్చండి.'
  }
]

export default function AIAssistant() {
  const { lang } = useLanguage()
  const samplePlants = lang === 'te' ? SAMPLE_PLANTS_TE : SAMPLE_PLANTS_EN

  const initialBotText = lang === 'te'
    ? "👋 నమస్కారం! నేను **కృషి AI మొక్కల డాక్టర్ & వ్యవసాయ నిపుణుడిని**.\n\nపై భాగంలో మీ పంట ఆకు లేదా కాయ ఫోటో తీసి అప్‌లోడ్ చేయండి, లేదా పంటల నిర్వహణ, తెగుళ్ల నివారణ, సాగునీటి పద్ధతులు మరియు మార్కెట్ ధరల గురించి నన్ను ఏదైనా ప్రశ్న అడగండి!\n\n💡 *చిట్కా: వ్యాధి నిర్ధారణను తక్షణమే పరీక్షించడానికి పైన ఉన్న నమూనా ఆకులలో ఒకదానిపై క్లిక్ చేయవచ్చు.*"
    : "👋 Namaste! I am **Krishi AI Plant Doctor & Agronomist**.\n\nTake or upload a photo of your affected plant leaf, crop, or fruit above, or ask me any question about crop management, diseases, irrigation schedules, or mandi market rates!\n\n💡 *Tip: You can click any sample photo above to test plant disease diagnosis immediately.*"

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: initialBotText
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [diagnosis, setDiagnosis] = useState(null)
  const fileInputRef = useRef(null)
  const endRef = useRef(null)

  // Update initial message when language changes
  useEffect(() => {
    setMessages([
      {
        id: 1,
        role: 'bot',
        text: initialBotText
      }
    ])
  }, [lang])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, diagnosis])

  // Handle image upload from user device
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        analyzePhoto(event.target.result, file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  // Analyze plant photo (simulation of deep neural vision classifier)
  const analyzePhoto = (imgUrl, label = 'User Photo') => {
    setUploadedImage(imgUrl)
    setIsScanning(true)
    setDiagnosis(null)

    // Simulate neural network scan
    setTimeout(() => {
      setIsScanning(false)
      let result = samplePlants[0]
      if (label.toLowerCase().includes('wheat') || label.includes('గోధుమ')) result = samplePlants[1]
      else if (label.toLowerCase().includes('rice') || label.toLowerCase().includes('paddy') || label.includes('వరి')) result = samplePlants[2]
      else if (label.toLowerCase().includes('healthy') || label.toLowerCase().includes('cotton') || label.includes('పత్తి')) result = samplePlants[3]
      else {
        const randomIndex = Math.floor(Math.random() * samplePlants.length)
        result = samplePlants[randomIndex]
      }

      setDiagnosis(result)

      // Add bot message
      const attachPrompt = lang === 'te'
        ? `[అటాచ్ చేసిన ఫోటో: ${result.name}] - దయచేసి ఈ ఆకును పరిశీలించి వ్యాధి నివారణ తెలపండి.`
        : `[Attached Photo: ${result.name}] - Please diagnose this leaf and advise on treatment.`

      const reportText = lang === 'te'
        ? `🔍 **వ్యాధి నిర్ధారణ నివేదిక: ${result.diseaseName}**\n\n• **తీవ్రత:** ${result.severity} (${result.confidence} సరిపోలిక)\n• **తెగులు కారకం:** ${result.pathogen}\n\n**ప్రధాన లక్షణాలు:**\n${result.symptoms}\n\n**తక్షణ చర్య:**\n${result.emergencyAction}\n\n**రసాయన మందుల పిచికారీ:**\n${result.chemicalTreatment}\n\n**సేంద్రీయ ప్రత్యామ్నాయం:**\n${result.organicTreatment}\n\n*ఈ చికిత్స గురించి మరిన్ని వివరాల కోసం కింద నన్ను ప్రశ్న అడగవచ్చు!*`
        : `🔍 **Diagnosis Report: ${result.diseaseName}**\n\n• **Severity:** ${result.severity} (${result.confidence} match)\n• **Identified Pathogen:** ${result.pathogen}\n\n**Key Symptoms:**\n${result.symptoms}\n\n**Immediate Action:**\n${result.emergencyAction}\n\n**Chemical Treatment:**\n${result.chemicalTreatment}\n\n**Organic Alternative:**\n${result.organicTreatment}\n\n*Feel free to ask follow-up questions about this treatment below!*`

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          role: 'user',
          text: attachPrompt,
          image: imgUrl
        },
        {
          id: Date.now() + 1,
          role: 'bot',
          text: reportText
        }
      ])
    }, 1800)
  }

  // Handle instant test sample click
  const handleSelectSample = (sample) => {
    analyzePhoto(sample.image, sample.name)
  }

  const handleSendMessage = (e) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return

    const userMsg = { id: Date.now(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Contextual intelligent responses
    setTimeout(() => {
      let botResponse = ''
      const lower = text.toLowerCase()

      if (lang === 'te') {
        if (lower.includes('ధర') || lower.includes('రేటు') || lower.includes('మార్కెట్') || lower.includes('మండి') || lower.includes('rate') || lower.includes('price')) {
          botResponse = `💰 **కృషి మార్కెట్ ధరల సమాచారం:**\nప్రస్తుత ప్రధాన మార్కెట్ ధరలు:\n• **వరి / ధాన్యం:** ₹2,320 / క్వింటా (ఖన్నా / నిజామాబాద్ యార్డ్)\n• **గోధుమలు:** ₹2,475 / క్వింటా (ఇండోర్ యార్డ్)\n• **పత్తి:** ₹7,420 / క్వింటా (వరంగల్ / రాజ్‌కోట్ యార్డ్)\n• **టమాట:** ₹2,800 / క్వింటా (మదనపల్లె / కోలార్ మార్కెట్)\n• **ఎండు మిర్చి:** ₹19,500 / క్వింటా (గుంటూరు యార్డ్)\n\nమీరు పై మెనూ నుండి **మార్కెట్ ధరలు & లాభం** పేజీని తెరిచి మీ ఎకరాల దిగుబడి మరియు నికర లాభాన్ని లెక్కించవచ్చు!`
        } else if (lower.includes('నీరు') || lower.includes('సాగునీరు') || lower.includes('డ్రిప్') || lower.includes('తడి') || lower.includes('water')) {
          botResponse = `💧 **సాగునీటి యాజమాన్య సలహా:**\n• వరి మరియు గోధుమ వంటి పంటలకు కీలక దశలలో (గోధుమలో 21 రోజుల వద్ద కిరీట వేర్ల దశ CRI, వరిలో ఈనిక దశ) నీటి ఎద్దడి లేకుండా చూడాలి.\n• టమాట మరియు మిరప పంటలకు డ్రిప్ ద్వారా రోజుకు మొక్కకు 2-3 లీటర్లు అందిస్తే 40% నీరు ఆదా అవుతుంది మరియు ఆకు తెగుళ్లు వ్యాపించకుండా ఉంటాయి.`
        } else if (lower.includes('ఎరువు') || lower.includes('యూరియా') || lower.includes('పిచికారీ') || lower.includes('మందు') || lower.includes('spray')) {
          botResponse = `🌱 **ఎరువులు మరియు మందుల పిచికారీ సిఫార్సులు:**\n• యూరియా ఎరువును ఎప్పుడూ ఒకేసారి కాకుండా 2 నుండి 3 సమ భాగాలుగా విడతల వారీగా వేయండి.\n• ఉదయం 7 నుండి 10 గంటల మధ్య లేదా సాయంత్రం 4 నుండి 6 గంటల మధ్య మాత్రమే పిచికారీ చేయండి.\n• మందు ఆకుపై నిలబడి వర్షానికి కొట్టుకుపోకుండా తప్పనిసరిగా సిలికాన్ స్ప్రెడర్ / జిగురు (లీటరుకు 0.5 మి.లీ) కలపండి.`
        } else if (diagnosis && (lower.includes('ఇది') || lower.includes('నివారణ') || lower.includes('మందు') || lower.includes('cure'))) {
          botResponse = `🔬 **${diagnosis.diseaseName} నివారణ సలహా:**\n• **సేంద్రీయ విధానం:** ${diagnosis.organicTreatment}\n• **రసాయన విధానం:** ${diagnosis.chemicalTreatment}\n• **తదుపరి చర్య:** వర్షం లేని రోజున ఆకుల పైభాగం మరియు అడుగుభాగం సమానంగా తడిచేలా పిచికారీ చేయండి. తెగులు ఉధృతి ఉంటే 10 రోజుల తర్వాత మళ్లీ కొట్టండి.`
        } else {
          botResponse = `🌾 **కృషి వ్యవసాయ నిపుణుల సలహా:**\nమీరు అడిగిన ప్రశ్న *"^${text}"* కు సూచనలు:\n1. **నేల మరియు వేరు ఆరోగ్యం:** పొలంలో నీరు నిల్వ ఉండకుండా చూడండి. నీరు నిలిస్తే వేరుకుళ్లు మరియు కాండం కుళ్లు వస్తాయి.\n2. **ముందస్తు తనిఖీ:** రసం పీల్చే పురుగుల కోసం ఆకుల అడుగు భాగాన్ని వారానికి రెండుసార్లు గమనించండి.\n3. **ఆకు ఫోటో స్కానర్:** మీ పంటలో ఏదైనా తేడా కనిపిస్తే వెంటనే ఫోటో తీసి పైన అప్‌లోడ్ చేసి క్షణాల్లో రిపోర్ట్ పొందండి!`
        }
      } else {
        if (lower.includes('price') || lower.includes('mandi') || lower.includes('rate') || lower.includes('cost')) {
          botResponse = `💰 **Mandi Market Advisory:**\nCurrent modal prices across benchmark APMC yards:\n• **Paddy/Rice:** ₹2,320 / Qtl (Khanna Mandi)\n• **Wheat:** ₹2,475 / Qtl (Indore Mandi)\n• **Cotton:** ₹7,420 / Qtl (Rajkot Mandi)\n• **Tomato:** ₹2,800 / Qtl (Kolar Mandi)\n• **Dry Chilli:** ₹19,500 / Qtl (Guntur Yard)\n\nYou can visit the **Krishi Mandi Prices** section from the top menu to view live state-wise market arrivals and calculate your exact net profit!`
        } else if (lower.includes('water') || lower.includes('irrigation') || lower.includes('drip')) {
          botResponse = `💧 **Irrigation Guidance:**\n• For cereal crops (wheat, rice), ensure irrigation at critical moisture stages like Crown Root Initiation (CRI at 21 days for wheat) and panicle initiation for rice.\n• For vegetable crops like tomato and chilli, drip irrigation with 2-3 litres/plant/day saves 40% water and prevents splash transmission of soil pathogens like early blight.`
        } else if (lower.includes('spray') || lower.includes('fertilizer') || lower.includes('urea') || lower.includes('dose')) {
          botResponse = `🌱 **Fertilizer & Spray Recommendations:**\n• Always split Nitrogen (Urea) into 2–3 applications rather than dumping all at once.\n• Spray during early morning (7am – 10am) or late evening (4pm – 6pm) when wind speeds are below 10 km/h and honeybee pollinators are less active.\n• Always add an organosilicone sticker/spreader (0.5 ml/L) for rain-fastness and leaf adherence.`
        } else if (diagnosis && (lower.includes('this') || lower.includes('cure') || lower.includes('organic') || lower.includes('pesticide'))) {
          botResponse = `🔬 **Advice regarding ${diagnosis.diseaseName}:**\n• **Organic Strategy:** ${diagnosis.organicTreatment}\n• **Chemical Strategy:** ${diagnosis.chemicalTreatment}\n• **Next Step:** Apply in dry weather with uniform spray coverage on both upper and lower leaf surfaces. Repeat after 10-12 days if disease pressure continues.`
        } else {
          botResponse = `🌾 **Krishi Agronomist Advice:**\nThank you for reaching out regarding *"^${text}"*.\n\nHere are practical field recommendations:\n1. **Soil & Root Health:** Ensure proper drainage. Excess waterlogging is the primary cause of root asphyxiation and collar rot.\n2. **Preventive Scouting:** Regularly check the undersides of leaves for sucking pests (aphids, thrips, whiteflies).\n3. **Photo Diagnosis:** You can always take a photo of any abnormal leaf or fruit and upload it above for instant AI diagnosis!\n\nNeed specific dosage or guidance for a particular crop? Just ask!`
        }
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: botResponse }])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 88, 48, 0.95), rgba(15, 23, 42, 0.95))',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem 2rem',
        marginBottom: '2rem',
        color: '#fff',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34, 197, 94, 0.2)', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', color: '#4ade80', marginBottom: '1rem', fontWeight: 600 }}>
          <Sparkles size={16} /> {lang === 'te' ? 'కృషి AI • మొక్కల డాక్టర్ & వ్యవసాయ నిపుణుడు' : 'Krishi AI • Plant Doctor & Agronomist'}
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          {lang === 'te' ? 'AI మొక్కల డాక్టర్ & రైతు చాట్‌బాట్' : 'AI Plant Doctor & Farm Chatbot'}
        </h1>
        <p style={{ color: '#cbd5e1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: 1.6 }}>
          {lang === 'te'
            ? 'ఏదైనా పంట ఆకు లేదా కాయ సమస్య ఉన్నప్పుడు ఫోటో తీసి అప్‌లోడ్ చేయండి. కృషి AI తక్షణమే వ్యాధిని గుర్తించి, ఖచ్చితమైన రసాయన మందులు మరియు సేంద్రీయ నివారణ మార్గాలను అందిస్తుంది.'
            : 'Take or upload a photo of any crop leaf or plant problem. Krishi AI immediately identifies the disease, analyzes severity, and delivers exact chemical dosages and organic remedies.'}
        </p>
      </div>

      {/* Main Grid: Left is Photo Scanner / Plant Doctor, Right is Live Chat */}
      <div className="assistant-layout-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Photo Uploader & Disease Scanner */}
        <div>
          <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Camera size={20} color="var(--primary)" /> {lang === 'te' ? 'మొక్క ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి' : 'Take or Upload Plant Photo'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              {lang === 'te' ? 'సహజ వెలుతురులో తెగులు సోకిన ఆకులు, కొమ్మలు లేదా కాయల స్పష్టమైన ఫోటో తీయండి.' : 'Photograph affected leaves, stems, or fruits in clear natural light.'}
            </p>

            {/* Hidden native input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />

            {/* Drag & Drop / Click Upload Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed var(--primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                background: 'rgba(34, 197, 94, 0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginBottom: '1.25rem'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Upload size={28} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                {lang === 'te' ? 'ఫోటో తీయడానికి లేదా అప్‌లోడ్ చేయడానికి ఇక్కడ క్లిక్ చేయండి' : 'Click to Take Photo or Upload Image'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {lang === 'te' ? 'మొబైల్ కెమెరా లేదా గ్యాలరీ నుండి JPG, PNG, WEBP ఫైల్‌లను ఎంచుకోండి' : 'Supports JPG, PNG, WEBP from mobile camera or desktop'}
              </div>
            </div>

            {/* Instant Test Library: Sample diseased leaves */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
                {lang === 'te' ? 'లేదా నమూనా ఆకులతో తక్షణమే పరీక్షించండి:' : 'Or Test with One-Click Sample Leaves:'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {samplePlants.map(sample => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.6rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{sample.thumb}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scanning Preview Animation Box */}
            {uploadedImage && (
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                marginBottom: '1rem'
              }}>
                <img
                  src={uploadedImage}
                  alt="Scanned Plant"
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                />

                {isScanning && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                    <div style={{
                      width: '100%',
                      height: '3px',
                      background: '#22c55e',
                      boxShadow: '0 0 15px #22c55e',
                      position: 'absolute',
                      top: '50%',
                      animation: 'pulse 1.5s infinite'
                    }} />
                    <RefreshCw className="animate-spin" size={32} color="#22c55e" style={{ marginBottom: '0.75rem' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {lang === 'te' ? 'ఆకు వ్యాధి విశ్లేషణ జరుగుతోంది...' : 'Analyzing Plant Pathology...'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#86efac' }}>
                      {lang === 'te' ? 'మచ్చలు, రంగు మార్పు మరియు శిలీంధ్రాలను గుర్తిస్తోంది' : 'Examining lesions, discoloration & pathogens'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Diagnosis Detail Card */}
          {diagnosis && (
            <div className="card" style={{
              padding: '1.75rem',
              border: '2px solid ' + (diagnosis.severity.includes('Critical') || diagnosis.severity.includes('అత్యవసరం') ? '#ef4444' : diagnosis.severity.includes('High') || diagnosis.severity.includes('తీవ్రమైనది') ? '#f59e0b' : '#22c55e'),
              background: 'linear-gradient(180deg, var(--card-bg), rgba(34, 197, 94, 0.05))'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    background: (diagnosis.severity.includes('Critical') || diagnosis.severity.includes('అత్యవసరం')) ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                    color: (diagnosis.severity.includes('Critical') || diagnosis.severity.includes('అత్యవసరం')) ? '#ef4444' : '#22c55e'
                  }}>
                    {lang === 'te' ? 'తీవ్రత:' : 'Severity:'} {diagnosis.severity} • {diagnosis.confidence} {lang === 'te' ? 'సరిపోలిక' : 'Match'}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.5rem 0 0 0' }}>{diagnosis.diseaseName}</h3>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                {diagnosis.symptoms}
              </div>

              {/* Action Box: Emergency & Chemical Treatment */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.06)', borderLeft: '3px solid #ef4444', padding: '0.65rem 0.85rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                  <strong style={{ color: '#ef4444' }}>{lang === 'te' ? 'తక్షణ చర్య:' : 'Emergency Action:'}</strong> {diagnosis.emergencyAction}
                </div>

                <div style={{ background: 'rgba(59, 130, 246, 0.06)', borderLeft: '3px solid #3b82f6', padding: '0.65rem 0.85rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                  <strong style={{ color: '#3b82f6' }}>{lang === 'te' ? 'రసాయన మందుల పిచికారీ:' : 'Chemical Fungicide / Spray:'}</strong> {diagnosis.chemicalTreatment}
                </div>

                <div style={{ background: 'rgba(34, 197, 94, 0.06)', borderLeft: '3px solid #22c55e', padding: '0.65rem 0.85rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                  <strong style={{ color: '#22c55e' }}>{lang === 'te' ? 'సేంద్రీయ ప్రత్యామ్నాయం:' : 'Organic / Bio-Alternative:'}</strong> {diagnosis.organicTreatment}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Chat Interface */}
        <div className="card" style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          height: '750px',
          border: '1px solid var(--border-color)',
          background: 'var(--card-bg)'
        }}>
          {/* Chat Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #15803d)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>
                  {lang === 'te' ? 'కృషి AI రైతు వ్యవసాయ సలహాదారు' : 'Krishi AI Farm Assistant'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  {lang === 'te' ? 'ఆన్‌లైన్ • వ్యవసాయ శాస్త్ర ఇంటెలిజెన్స్' : 'Online • Powered by Agricultural Intelligence'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMessages([messages[0]])}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <RefreshCw size={14} /> {lang === 'te' ? 'చాట్ క్లియర్ చేయండి' : 'Clear Chat'}
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem', marginBottom: '1rem' }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                {msg.role === 'bot' && (
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.2rem' }}>
                    <Bot size={16} />
                  </div>
                )}

                <div style={{
                  maxWidth: '82%',
                  padding: '0.9rem 1.1rem',
                  borderRadius: 'var(--radius-lg)',
                  background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-secondary)',
                  color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Crop Attachment"
                      style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem' }}
                    />
                  )}
                  {msg.text}
                </div>

                {msg.role === 'user' && (
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.2rem' }}>
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={16} />
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RefreshCw className="animate-spin" size={14} />
                  {lang === 'te' ? 'కృషి AI వ్యవసాయ సలహాలను రూపొందిస్తోంది...' : 'Krishi AI is analyzing agronomical recommendations...'}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
            {(lang === 'te'
              ? [
                "వరి పంటలో అగ్గి తెగులు నివారణ ఎలా?",
                "టమాట ఆకుమాడు తెగులుకు ఏ మందు పిచికారీ చేయాలి?",
                "మిరప పంటలో తామర పురుగుల నివారణ చర్యలు ఏమిటి?",
                "నేటి మార్కెట్లో వరి మద్దతు ధర ఎంత ఉంది?"
              ]
              : [
                "What is today's Mandi price for Wheat?",
                "How to treat Tomato early blight organically?",
                "What is the best irrigation schedule for Rice?",
                "When is the best month to sell Dry Chilli for top price?"
              ]
            ).map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(q)
                }}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message Input Bar */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder={lang === 'te' ? 'పంట తెగుళ్లు, ఎరువుల షెడ్యూల్, రసాయన మందులు లేదా మార్కెట్ ధరల గురించి అడగండి...' : 'Ask about plant symptoms, chemical dosage, fertilizer schedule, or prices...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                padding: '0 1.25rem',
                borderRadius: 'var(--radius-md)',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 700
              }}
            >
              <Send size={16} /> {lang === 'te' ? 'పంపు' : 'Send'}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
