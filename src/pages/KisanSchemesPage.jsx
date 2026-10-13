import React, { useState } from 'react'
import {
  Landmark, ShieldCheck, ExternalLink, Search, CheckCircle2,
  FileText, IndianRupee, HelpCircle, SunMedium, Wrench, Droplets,
  Calendar, Info, PhoneCall
} from 'lucide-react'
import { KISAN_SCHEMES_EN, KISAN_SCHEMES_TE } from '../data/kisanSchemesData'
import { useLanguage } from '../context/LanguageContext'

export default function KisanSchemesPage() {
  const { lang } = useLanguage()
  const schemes = lang === 'te' ? KISAN_SCHEMES_TE : KISAN_SCHEMES_EN

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = lang === 'te'
    ? ['అన్నీ', 'ప్రత్యక్ష ఆదాయం', 'సౌర విద్యుత్', 'పంట బీమా', 'సాగునీరు', 'యంత్రాలు']
    : ['All', 'Direct Income Support', 'Renewable Power & Irrigation', 'Crop Risk Insurance', 'Water Conservation', 'Farm Machinery']

  const filteredSchemes = schemes.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
                          s.benefit.toLowerCase().includes(search.toLowerCase()) ||
                          s.eligibility.toLowerCase().includes(search.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="page-container animate-fade-in" style={{ paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(20, 83, 45, 0.95), rgba(15, 23, 42, 0.95))',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem 2rem',
        marginBottom: '2rem',
        color: '#fff',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34, 197, 94, 0.2)', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', color: '#4ade80', marginBottom: '1rem', fontWeight: 600 }}>
          <Landmark size={16} /> {lang === 'te' ? 'రైతు సంక్షేమ పథకాలు & సబ్సిడీ కేంద్రం' : 'Govt Kisan Schemes & Direct Subsidies Hub'}
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          {lang === 'te' ? 'రైతు ప్రభుత్వ పథకాలు & సబ్సిడీల పోర్టల్' : 'Government Agricultural Schemes & Subsidies'}
        </h1>
        <p style={{ color: '#cbd5e1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: 1.6 }}>
          {lang === 'te'
            ? 'కేంద్ర మరియు రాష్ట్ర ప్రభుత్వాల తాజా రైతు సంక్షేమ పథకాలు. PM-కిసాన్, రైతు భరోసా, సోలార్ పంపుల రాయితీ, డ్రిప్ సబ్సిడీ మరియు ట్రాక్టర్ పథకాలకు కావాల్సిన అర్హతలు, ధృవీకరణ పత్రాలు మరియు అధికారిక వెబ్‌సైట్ లింకులు.'
            : 'Access verified central and state agriculture subsidies. Explore direct financial aid, 60-90% solar pump & drip irrigation subsidies, crop insurance protection, and official application portals.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.75rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder={lang === 'te' ? 'పథకం పేరు లేదా ప్రయోజనం ద్వారా శోధించండి (ఉదా: సోలార్, డ్రిప్, కిసాన్, ట్రాక్టర్)...' : 'Search schemes by keyword (e.g. Solar, Drip, PM-Kisan, Tractor, Insurance)...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.6rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: '1.5rem',
        alignItems: 'stretch'
      }}>
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="card"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s',
              border: '1px solid var(--border-color)'
            }}
          >
            <div>
              {/* Level & Category Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#16a34a',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px'
                }}>
                  {scheme.level}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600 }}>
                  ● {scheme.status}
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                {scheme.title}
              </h3>

              {/* Highlight Benefit Box */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(16, 185, 129, 0.05))',
                borderLeft: '4px solid #16a34a',
                padding: '0.85rem 1rem',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700 }}>
                  {lang === 'te' ? 'రైతుకు అందే ప్రయోజనం / రాయితీ:' : 'Key Benefit & Financial Subsidy:'}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
                  {scheme.benefit}
                </div>
              </div>

              {/* Eligibility & Documents */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{lang === 'te' ? 'అర్హత:' : 'Eligibility:'}</strong> {scheme.eligibility}
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{lang === 'te' ? 'అవసరమైన పత్రాలు:' : 'Required Documents:'}</strong> {scheme.documents}
                </div>
              </div>
            </div>

            {/* Official Portal Apply Button */}
            <a
              href={scheme.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'var(--primary)',
                color: '#fff',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                marginTop: '1rem',
                boxShadow: '0 4px 12px rgba(22, 101, 52, 0.25)',
                transition: 'all 0.2s'
              }}
            >
              <span>{lang === 'te' ? 'అధికారిక వెబ్‌సైట్ / దరఖాస్తు చేయండి' : 'Apply on Official Portal'}</span>
              <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
