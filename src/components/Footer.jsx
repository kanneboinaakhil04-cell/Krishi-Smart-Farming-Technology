import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Mail, Phone, MapPin, Twitter, Github, Linkedin, ArrowRight } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff' }}>
                <Leaf size={18} />
              </div>
              Krishi
            </div>
            <p>
              Smart Agriculture Technology Platform. Empowering farmers
              with real IoT sensors, live weather services, step-by-step crop guides,
              Mandi price intelligence, and AI Plant Doctor diagnostics.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
                <Mail size={14} />
                kisan-support@krishi.org.in
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
                <Phone size={14} />
                1800-180-1551 (Kisan Toll-Free)
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
              <MapPin size={14} />
              Hyderabad & Bengaluru, India
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-links">
            <h4>Farmer Solutions</h4>
            <ul>
              <li><Link to="/guide" id="footer-guide"><ArrowRight size={12} /> How to Grow Crops</Link></li>
              <li><Link to="/mandi" id="footer-mandi"><ArrowRight size={12} /> Mandi APMC Prices</Link></li>
              <li><Link to="/assistant" id="footer-assistant"><ArrowRight size={12} /> AI Plant Doctor</Link></li>
              <li><Link to="/weather" id="footer-weather"><ArrowRight size={12} /> Live Satellite Weather</Link></li>
              <li><Link to="/sensors" id="footer-sensors"><ArrowRight size={12} /> Real IoT Sensor Panel</Link></li>
              <li><Link to="/calculator" id="footer-calculator"><ArrowRight size={12} /> Crop & Water Calculator</Link></li>
              <li><Link to="/schemes" id="footer-schemes"><ArrowRight size={12} /> Govt Schemes & Subsidies</Link></li>
              <li><Link to="/khata" id="footer-khata"><ArrowRight size={12} /> Farm Expense Khata</Link></li>
            </ul>
          </div>

          {/* Core Tools */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/home" id="footer-home"><ArrowRight size={12} /> Home</Link></li>
              <li><Link to="/login" id="footer-login"><ArrowRight size={12} /> Farmer Login</Link></li>
              <li><Link to="/dashboard" id="footer-dashboard"><ArrowRight size={12} /> Field Dashboard</Link></li>
              <li><Link to="/about" id="footer-about"><ArrowRight size={12} /> About Krishi</Link></li>
              <li><Link to="/contact" id="footer-contact"><ArrowRight size={12} /> Farmer Help Desk</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-links">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/about" id="footer-about-link"><ArrowRight size={12} /> Mission & Impact</Link></li>
              <li><Link to="/contact" id="footer-contact-link"><ArrowRight size={12} /> Contact Us</Link></li>
              <li><a href="#" id="footer-privacy"><ArrowRight size={12} /> Privacy Policy</a></li>
              <li><a href="#" id="footer-terms"><ArrowRight size={12} /> Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p>© {year} Krishi. All rights reserved. Smart Technology, Better Farming.</p>
          <div className="social-links">
            <a href="#" className="social-link" id="footer-twitter" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" className="social-link" id="footer-github" aria-label="GitHub"><Github size={16} /></a>
            <a href="#" className="social-link" id="footer-linkedin" aria-label="LinkedIn"><Linkedin size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
