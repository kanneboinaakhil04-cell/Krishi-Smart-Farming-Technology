# 🌱 AgriNex — Smart Agriculture Technology Platform

> **Smart Technology, Better Farming.**

AgriNex is a modern AgriTech startup website and interactive demo platform that combines IoT sensor data, AI-assisted crop analysis, and data analytics to help farmers make better farming decisions.

---

## ✨ Features Implemented

| Feature | Status |
|---|---|
| Responsive multi-page website (Home, Dashboard, Irrigation, AI Assistant, About, Contact) | ✅ Implemented |
| Hero section with animated particles and statistics | ✅ Implemented |
| Feature cards, How It Works, Benefits, Testimonials | ✅ Implemented |
| Interactive Dashboard with metric cards | ✅ Simulated |
| Soil moisture, temperature, humidity, crop health metrics | ✅ Simulated |
| Area/Line/Bar charts (Recharts) | ✅ Implemented |
| Real-time auto-refresh (every 30s, simulated data) | ✅ Implemented |
| Irrigation ON/OFF toggle | ✅ Simulated |
| Crop selection dropdown | ✅ Implemented |
| Alert & Recommendation panel | ✅ Demo data |
| Smart Irrigation page with soil moisture gauge | ✅ Implemented |
| Multi-zone field selector | ✅ Simulated |
| Moisture threshold slider with chart reference line | ✅ Implemented |
| AI Crop Assistant chatbot (demo knowledge base) | ✅ Implemented |
| Quick-action question buttons | ✅ Implemented |
| Crop context selector for assistant | ✅ Implemented |
| Contact form with validation | ✅ Implemented |
| About page with timeline and team grid | ✅ Implemented |
| Mobile-responsive design | ✅ Implemented |
| Scroll-aware navbar | ✅ Implemented |
| Environment variable support (.env.example) | ✅ Provided |

### 🔴 Simulated / Not Yet Implemented
- Real IoT sensor connections (requires physical hardware + backend)
- Live weather API integration (API key required)
- Real AI model (requires API key, e.g., Gemini / OpenAI)
- Backend server (FastAPI/Express + database)
- User authentication
- Real-time notifications via WebSocket

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 8 |
| Routing | React Router v7 |
| Icons | Lucide React |
| Charts | Recharts |
| Styling | Vanilla CSS (custom design system) |
| Fonts | Google Fonts (Inter + Outfit) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ ([download](https://nodejs.org/))
- npm v9+

### Installation

```bash
# 1. Clone or navigate to the project folder
cd AgriNex

# 2. Install dependencies (use legacy-peer-deps due to Vite 8 peer dep resolution)
npm install --legacy-peer-deps

# 3. Copy and edit environment variables
cp .env.example .env
# Edit .env with your real API keys (optional for demo)

# 4. Start the development server
npm run dev
```

The app will be available at: **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 📁 Project Structure

```
AgriNex/
├── public/
│   └── favicon.svg           # AgriNex leaf icon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Responsive navbar with scroll detection
│   │   └── Footer.jsx        # Footer with links and social icons
│   ├── pages/
│   │   ├── Home.jsx          # Landing page (hero, features, testimonials)
│   │   ├── Dashboard.jsx     # Interactive sensor dashboard
│   │   ├── IrrigationPage.jsx# Smart irrigation controls
│   │   ├── AIAssistant.jsx   # Crop chatbot (demo mode)
│   │   ├── AboutPage.jsx     # Team, mission, timeline
│   │   └── ContactPage.jsx   # Contact form with validation
│   ├── App.jsx               # Router + layout
│   ├── main.jsx              # React entry point
│   └── index.css             # Full CSS design system
├── index.html                # Root HTML
├── vite.config.js            # Vite + React plugin config
├── package.json
├── .env.example              # Environment variable template
└── README.md                 # This file
```

---

## 🔌 Future Backend Integration

The project is structured to support a backend. Add your service calls in dedicated service modules:

```
src/
  services/
    weatherService.js     # OpenWeatherMap API calls
    sensorService.js      # IoT sensor backend calls
    aiService.js          # AI model API calls
```

### Recommended Backend Stack
- **Python FastAPI** (recommended for ML/AI integration)
- **SQLite** for development → **PostgreSQL** for production
- **MQTT / WebSocket** for real-time IoT sensor data

### Recommended API Integrations
- **Weather**: OpenWeatherMap API (https://openweathermap.org/api)
- **AI Crop Assistant**: Google Gemini API / OpenAI GPT-4
- **Maps**: Google Maps API / Mapbox

---

## 🎨 Color Palette

| Token | Color | Hex |
|---|---|---|
| Primary | Forest Green | `#166534` |
| Secondary | Fresh Green | `#22c55e` |
| Accent | Golden Yellow | `#facc15` |
| Background | Off-white | `#f8faf5` |
| Text | Dark Charcoal | `#1f2937` |

---

## 📊 Dashboard Data Disclaimer

> **All sensor readings, crop health scores, weather data, and alerts shown on the dashboard are simulated for demonstration purposes only.**
> AgriNex does not connect to real IoT sensors or live weather services in this prototype.
> Real hardware integration requires compatible IoT sensors and a secure backend implementation.

---

## 🌾 About AgriNex

AgriNex was built as a startup concept project demonstrating how precision agriculture technology can help farmers:
- Save water with data-driven irrigation
- Monitor crop health continuously
- Make informed farming decisions
- Access AI-powered agronomic guidance

This project was developed for a **college startup presentation** to showcase modern web development and AgriTech innovation.

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

*Built with ❤️ for farmers everywhere.*
