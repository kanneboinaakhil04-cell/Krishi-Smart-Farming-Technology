import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Target, Heart, Globe, Users, Award, Zap, ArrowRight } from 'lucide-react'

const TEAM = [
  { name: 'Arjun Mehta', role: 'CEO & Co-Founder', emoji: '🌱', color: 'linear-gradient(135deg, #166534, #22c55e)', bg: '#1a3a1a' },
  { name: 'Priya Nair', role: 'CTO & Co-Founder', emoji: '💻', color: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', bg: '#1a2040' },
  { name: 'Vikram Singh', role: 'Head of IoT Engineering', emoji: '📡', color: 'linear-gradient(135deg, #7c3aed, #a78bfa)', bg: '#2d1b4e' },
  { name: 'Anjali Reddy', role: 'Lead Data Scientist', emoji: '📊', color: 'linear-gradient(135deg, #be185d, #ec4899)', bg: '#3b1229' },
  { name: 'Siddharth Kumar', role: 'Agronomy Advisor', emoji: '🌾', color: 'linear-gradient(135deg, #b45309, #f59e0b)', bg: '#3b2008' },
  { name: 'Nandini Rao', role: 'UX & Product Design', emoji: '🎨', color: 'linear-gradient(135deg, #0891b2, #22d3ee)', bg: '#0c2a35' },
]

const VALUES = [
  { icon: <Target size={22} />, title: 'Farmer-First', desc: 'Every feature we build starts with a real problem faced by real farmers on the ground.' },
  { icon: <Zap size={22} />, title: 'Technology for Good', desc: 'We believe precision technology should be accessible, affordable, and practical for farms of all sizes.' },
  { icon: <Heart size={22} />, title: 'Sustainability', desc: 'Efficient water and resource use isn\'t just good for the bottom line — it\'s good for the planet.' },
  { icon: <Globe size={22} />, title: 'Open & Transparent', desc: 'We are clear about what our platform can and cannot do. No overpromising, no misleading data.' },
]

const MILESTONES = [
  { year: '2022', event: 'Krishi founded in Bengaluru by a team of engineers and agronomists.' },
  { year: '2023', event: 'First prototype deployed on 12 test farms across Maharashtra and Karnataka.' },
  { year: '2024', event: 'Expanded to 200+ farms. Launched the smart irrigation module.' },
  { year: '2025', event: 'Introduced the AI Crop Assistant and multi-zone field monitoring dashboard.' },
  { year: '2026', event: 'Platform serving 500+ farmers. Seed funding round completed. Expanding to Andhra Pradesh.' },
]

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero" id="about-hero">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'url(https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1400&q=60&auto=format) center/cover no-repeat',
          opacity: 0.12,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-badge" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac' }}>
            <Leaf size={14} />
            Our Story
          </span>
          <h1 style={{ marginTop: '0.75rem' }}>
            Built by Farmers, Engineers,<br />
            and Technology Enthusiasts
          </h1>
          <p>
            Krishi was founded on a simple belief: that the gap between modern technology
            and the farming community should not exist. We are a team of engineers, agronomists,
            and designers passionate about making precision agriculture practical for every farmer.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="section" id="about-mission">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div>
              <span className="section-badge">
                <Target size={14} />
                Our Mission
              </span>
              <h2 style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                Democratising Precision Agriculture
              </h2>
              <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
                Farmers in India and across the developing world face enormous challenges —
                water scarcity, unpredictable weather, soil degradation, and limited access
                to timely agronomic guidance.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Krishi was created to bridge this gap. By combining affordable IoT sensors,
                an easy-to-use dashboard, and AI-assisted crop analysis, we make precision
                agriculture accessible to farms of all sizes.
              </p>
              <p>
                We are a startup at an early stage. This platform is a working prototype
                designed to demonstrate the potential of smart agriculture technology for a
                college startup showcase.
              </p>
            </div>
            <div>
              {VALUES.map(v => (
                <div
                  key={v.title}
                  style={{
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    padding: '1.25rem 0', borderBottom: '1px solid var(--border-light)',
                  }}
                  id={`value-${v.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div
                    style={{
                      width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                      background: 'linear-gradient(135deg, #dcfce7, #f0fdf4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--primary)', border: '1px solid #bbf7d0',
                    }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <h4 style={{ marginBottom: 4 }}>{v.title}</h4>
                    <p style={{ fontSize: '0.88rem' }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }} id="about-timeline">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">
              <Award size={14} />
              Our Journey
            </span>
            <h2>Key Milestones</h2>
          </div>
          <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 100, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--primary), var(--secondary))' }} />
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'flex-start' }}
                id={`milestone-${m.year}`}
              >
                <div
                  style={{
                    minWidth: 80, textAlign: 'right',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700, color: 'var(--primary)',
                    fontSize: '1rem', paddingTop: 10,
                  }}
                >
                  {m.year}
                </div>
                <div
                  style={{
                    width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 12,
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    boxShadow: '0 0 0 4px rgba(34,197,94,0.2)',
                    zIndex: 1,
                  }}
                />
                <div
                  className="card"
                  style={{ flex: 1, padding: '1rem 1.5rem', marginTop: 4, cursor: 'default' }}
                >
                  <p style={{ margin: 0, fontSize: '0.92rem' }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" id="about-team">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">
              <Users size={14} />
              The Team
            </span>
            <h2>Meet the Krishi Team</h2>
            <p>
              A passionate, multidisciplinary group bringing together expertise in
              agronomy, engineering, data science, and design.
            </p>
          </div>

          <div className="grid-3" id="team-grid">
            {TEAM.map(m => (
              <div className="team-card" key={m.name} id={`team-${m.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div
                  className="team-avatar"
                  style={{ background: m.color, fontSize: '2.2rem' }}
                >
                  {m.emoji}
                </div>
                <h4>{m.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', padding: '80px 0' }}
        id="about-cta"
      >
        <div className="container text-center">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Work with Krishi?</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem' }}>
            Whether you are a farmer, investor, or agricultural expert — we would love to connect.
          </p>
          <Link to="/contact" className="btn btn-accent btn-lg" id="about-contact-cta">
            Get in Touch
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
