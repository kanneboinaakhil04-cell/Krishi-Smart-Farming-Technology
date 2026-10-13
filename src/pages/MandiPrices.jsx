import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp, TrendingDown, DollarSign, Calculator, Search,
  Award, Filter, ShieldCheck, ArrowRight, Sparkles, Building2,
  PieChart, RefreshCw, BarChart3, Info, CheckCircle2
} from 'lucide-react'
import { MANDI_MARKET_DATA } from '../data/mandiPriceData'

export default function MandiPrices() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Calculator State
  const [calcCropId, setCalcCropId] = useState('mango')
  const [acres, setAcres] = useState(2)

  const selectedCommodity = MANDI_MARKET_DATA.find(c => c.id === calcCropId) || MANDI_MARKET_DATA[0]
  const defaultCost = selectedCommodity.costTemplatePerAcre

  const [yieldPerAcre, setYieldPerAcre] = useState(defaultCost.expectedYieldQuintal)
  const [salePrice, setSalePrice] = useState(defaultCost.defaultSalePrice)
  const [costs, setCosts] = useState({
    planting: defaultCost.plantingCost,
    landPrep: defaultCost.landPrep,
    fertilizer: defaultCost.fertilizerManure,
    irrigation: defaultCost.irrigationPower,
    cropProtection: defaultCost.cropProtection,
    labour: defaultCost.labourHarvesting,
    transport: defaultCost.transportMandi,
  })

  // Whenever user picks a different crop in the calculator, update defaults
  const handleCropChange = (cropId) => {
    setCalcCropId(cropId)
    const c = MANDI_MARKET_DATA.find(item => item.id === cropId)
    if (c) {
      setYieldPerAcre(c.costTemplatePerAcre.expectedYieldQuintal)
      setSalePrice(c.costTemplatePerAcre.defaultSalePrice)
      setCosts({
        planting: c.costTemplatePerAcre.plantingCost,
        landPrep: c.costTemplatePerAcre.landPrep,
        fertilizer: c.costTemplatePerAcre.fertilizerManure,
        irrigation: c.costTemplatePerAcre.irrigationPower,
        cropProtection: c.costTemplatePerAcre.cropProtection,
        labour: c.costTemplatePerAcre.labourHarvesting,
        transport: c.costTemplatePerAcre.transportMandi,
      })
    }
  }

  // Profit calculations
  const totalCostPerAcre = Object.values(costs).reduce((a, b) => a + Number(b), 0)
  const grandTotalCost = totalCostPerAcre * Number(acres)
  const totalYieldQuintals = Number(yieldPerAcre) * Number(acres)
  const grossRevenue = totalYieldQuintals * Number(salePrice)
  const netProfit = grossRevenue - grandTotalCost
  const profitPerAcre = netProfit / (Number(acres) || 1)
  const roi = grandTotalCost > 0 ? ((netProfit / grandTotalCost) * 100).toFixed(1) : 0
  const breakEvenPerQuintal = totalYieldQuintals > 0 ? (grandTotalCost / totalYieldQuintals).toFixed(0) : 0

  // Filtered commodities list
  const filteredCommodities = useMemo(() => {
    return MANDI_MARKET_DATA.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.primaryMandis.some(m => m.mandi.toLowerCase().includes(searchTerm.toLowerCase()) || m.state.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchCat && matchSearch
    })
  }, [searchTerm, selectedCategory])

  const categories = ['All', 'Cereals', 'Vegetables', 'Fruits', 'Fibers', 'Spices', 'Oilseeds']

  return (
    <div className="mandi-prices-page" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)',
        color: 'white',
        padding: '3.5rem 1rem 3rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            padding: '6px 16px', borderRadius: 20, fontSize: '0.85rem',
            fontWeight: 600, marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Building2 size={16} /> Krishi APMC Mandi Intelligence
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
            Crop Market Prices & Profit Calculator
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: 740, margin: '0 auto' }}>
            What is the price of the crop after growing? Check live APMC Mandi modal rates, official MSP benchmarks,
            and calculate your exact harvest profits before sowing.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1rem 4rem', maxWidth: 1200, margin: '0 auto' }}>

        {/* SECTION 1: CROP PROFITABILITY & REVENUE CALCULATOR */}
        <div style={{
          background: 'white', borderRadius: 24, padding: '2.5rem',
          border: '1px solid var(--border)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calculator size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: 'var(--text)' }}>
                Crop Harvest Profit & Revenue Calculator
              </h2>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                Calculate your exact returns, cultivation costs, net profit, and break-even selling price per acre.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Inputs Column */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#334155', marginBottom: '1rem' }}>
                1. Select Crop & Farm Area
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Select Crop:
                  </label>
                  <select
                    value={calcCropId}
                    onChange={e => handleCropChange(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 10,
                      border: '1px solid var(--border)', background: 'white',
                      fontWeight: 600, fontSize: '0.95rem'
                    }}
                  >
                    {MANDI_MARKET_DATA.map(item => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Land Area (Acres):
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={acres}
                    onChange={e => setAcres(Math.max(0.1, Number(e.target.value)))}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 10,
                      border: '1px solid var(--border)', fontWeight: 600, fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Expected Yield (Quintals/Acre):
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={yieldPerAcre}
                    onChange={e => setYieldPerAcre(Number(e.target.value))}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 10,
                      border: '1px solid var(--border)', fontWeight: 600, fontSize: '0.95rem'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    1 Quintal = 100 kg
                  </span>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>
                    Selling Price (₹ / Quintal):
                  </label>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={salePrice}
                    onChange={e => setSalePrice(Number(e.target.value))}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 10,
                      border: '1px solid var(--border)', fontWeight: 600, fontSize: '0.95rem'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                    ₹ {(salePrice / 100).toFixed(1)} / kg
                  </span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#334155', marginBottom: '0.75rem' }}>
                2. Input Cost Breakdown (₹ / Acre)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  { key: 'planting', label: 'Seeds / Saplings / Nursery' },
                  { key: 'landPrep', label: 'Land Prep, Ploughing & Ridging' },
                  { key: 'fertilizer', label: 'Fertilizer, FYM Manure & Bio-Nutrients' },
                  { key: 'irrigation', label: 'Irrigation & Electricity / Diesel' },
                  { key: 'cropProtection', label: 'Pesticides, Fungicides & Weeding' },
                  { key: 'labour', label: 'Labour, Staking & Harvesting' },
                  { key: 'transport', label: 'Transport, Bags & Mandi Charges' },
                ].map(({ key, label }) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.86rem', color: '#475569' }}>{label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>₹</span>
                      <input
                        type="number"
                        min="0"
                        value={costs[key]}
                        onChange={e => setCosts(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                        style={{
                          width: 100, padding: '6px 10px', borderRadius: 8,
                          border: '1px solid #cbd5e1', fontSize: '0.85rem',
                          textAlign: 'right', fontWeight: 600
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Column */}
            <div style={{
              background: 'linear-gradient(145deg, #f0fdf4 0%, #ecfdf5 100%)',
              borderRadius: 20, padding: '2rem',
              border: '1px solid #a7f3d0',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                  <Sparkles size={14} /> Estimated Returns for {acres} Acre(s) of {selectedCommodity.name}
                </div>

                {/* Net Profit Big Box */}
                <div style={{
                  background: 'white', borderRadius: 16, padding: '1.5rem',
                  border: '1px solid #bbf7d0', boxShadow: '0 4px 16px rgba(22,101,52,0.06)',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                    Net Farmer Profit
                  </div>
                  <div style={{
                    fontSize: 'clamp(2.2rem, 4vw, 2.8rem)', fontWeight: 900,
                    color: netProfit >= 0 ? '#15803d' : '#dc2626',
                    marginTop: 4
                  }}>
                    ₹ {netProfit.toLocaleString('en-IN')}
                  </div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                    <span>Profit / Acre: <strong style={{ color: '#15803d' }}>₹ {(profitPerAcre).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong></span>
                    <span>ROI: <strong style={{ color: '#15803d' }}>{roi}%</strong></span>
                  </div>
                </div>

                {/* Financial Summary Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: 'white', padding: '12px 14px', borderRadius: 12, border: '1px solid #dcfce7' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>GROSS REVENUE</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: 2 }}>
                      ₹ {grossRevenue.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {totalYieldQuintals} Quintals Total
                    </div>
                  </div>

                  <div style={{ background: 'white', padding: '12px 14px', borderRadius: 12, border: '1px solid #dcfce7' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>TOTAL CULTIVATION COST</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#b91c1c', marginTop: 2 }}>
                      ₹ {grandTotalCost.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      ₹ {totalCostPerAcre.toLocaleString('en-IN')} / acre
                    </div>
                  </div>
                </div>

                {/* Break-Even Insight Box */}
                <div style={{
                  background: 'white', padding: '14px 16px', borderRadius: 14,
                  border: '1px solid #fed7aa', display: 'flex', alignItems: 'flex-start', gap: 10
                }}>
                  <Info size={18} color="#ea580c" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ fontSize: '0.85rem', color: '#7c2d12', lineHeight: 1.45 }}>
                    <strong>Break-Even Selling Price: ₹ {breakEvenPerQuintal} / Quintal (₹ {(breakEvenPerQuintal / 100).toFixed(1)} / kg).</strong>
                    <br />
                    Selling above this rate ensures net profit. Current Mandi rate is ₹ {selectedCommodity.modalPrice} / Quintal.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#166534' }}>
                  ✓ Based on current APMC market economics
                </span>
                <Link
                  to="/growth-guide"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)' }}
                >
                  View Step-by-Step Growth Guide <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: LIVE APMC MANDI RATES TABLE */}
        <div style={{
          background: 'white', borderRadius: 24, padding: '2rem',
          border: '1px solid var(--border)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text)' }}>
                Today's Mandi Market Rates & Official MSP
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#64748b' }}>
                Daily modal prices from major APMC yards across India, government Minimum Support Prices (MSP 2025–26), and market trends.
              </p>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: 280 }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 12 }} />
              <input
                type="text"
                placeholder="Search crop or mandi..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: '100%', padding: '9px 12px 9px 36px', borderRadius: 10,
                  border: '1px solid var(--border)', fontSize: '0.88rem'
                }}
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: '0.82rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  background: selectedCategory === cat ? 'var(--primary)' : '#f1f5f9',
                  color: selectedCategory === cat ? 'white' : '#475569',
                  border: 'none', cursor: 'pointer', whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mandi Cards / Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            {filteredCommodities.map(comm => (
              <div
                key={comm.id}
                style={{
                  background: '#fafafa', borderRadius: 16, padding: '1.25rem 1.5rem',
                  border: '1px solid #f1f5f9', transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  {/* Left: Name and Variety */}
                  <div style={{ minWidth: 240 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '1.3rem' }}>
                        {comm.id.includes('mango') ? '🥭' : comm.id.includes('rice') ? '🌾' : comm.id.includes('wheat') ? '🌾' : comm.id.includes('tomato') ? '🍅' : comm.id.includes('cotton') ? '🪴' : comm.id.includes('chilli') ? '🌶️' : '🥔'}
                      </span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text)' }}>
                        {comm.name}
                      </h3>
                      <span style={{
                        background: '#e2e8f0', color: '#334155', padding: '2px 8px',
                        borderRadius: 12, fontSize: '0.72rem', fontWeight: 600
                      }}>
                        {comm.category}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 4 }}>
                      Variety: <strong>{comm.variety}</strong>
                    </div>
                  </div>

                  {/* Price Box */}
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                        Today's Modal Price
                      </div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        ₹ {comm.modalPrice.toLocaleString('en-IN')} <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>/ Quintal</span>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 700,
                          color: comm.changeDay >= 0 ? '#16a34a' : '#dc2626',
                          display: 'inline-flex', alignItems: 'center'
                        }}>
                          {comm.changeDay >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          {comm.changeDay > 0 ? `+${comm.changeDay}%` : `${comm.changeDay}%`}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>
                        ₹ {(comm.modalPrice / 100).toFixed(1)} / kg (Range: ₹{comm.minPrice} – ₹{comm.maxPrice})
                      </div>
                    </div>

                    {/* MSP Benchmark */}
                    <div style={{
                      background: comm.msp ? '#ecfdf5' : '#f8fafc',
                      padding: '8px 14px', borderRadius: 10,
                      border: comm.msp ? '1px solid #bbf7d0' : '1px solid #e2e8f0'
                    }}>
                      <div style={{ fontSize: '0.72rem', color: comm.msp ? '#166534' : '#64748b', fontWeight: 700 }}>
                        OFFICIAL GOVT MSP
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: comm.msp ? '#15803d' : '#475569' }}>
                        {comm.msp ? `₹ ${comm.msp.toLocaleString('en-IN')} / Qtl` : 'N/A (Horticultural)'}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                        {comm.mspNote}
                      </div>
                    </div>
                  </div>

                  {/* Action button */}
                  <div>
                    <button
                      onClick={() => {
                        handleCropChange(comm.id)
                        window.scrollTo({ top: 320, behavior: 'smooth' })
                      }}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                    >
                      Calculate Profit ➔
                    </button>
                  </div>
                </div>

                {/* Mandi Locations and arrivals */}
                <div style={{
                  display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: '1rem',
                  paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9'
                }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Building2 size={13} /> Active Mandis:
                  </span>
                  {comm.primaryMandis.map(m => (
                    <span
                      key={m.mandi}
                      style={{
                        background: 'white', padding: '3px 10px', borderRadius: 8,
                        fontSize: '0.75rem', color: '#334155', border: '1px solid #e2e8f0'
                      }}
                    >
                      <strong>{m.mandi}</strong> ({m.state}): ₹{m.modal}/Qtl • <em>{m.arrivals}</em>
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#475569' }}>
                  <strong>Market Advisory:</strong> {comm.advisory}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
