import React, { useState, useEffect } from 'react'
import {
  BookOpen, PlusCircle, Trash2, Download, Printer, ArrowUpRight,
  ArrowDownRight, IndianRupee, Calendar, Tag, FileText, CheckCircle2,
  PieChart as PieChartIcon
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const INITIAL_EXPENSES_EN = [
  { id: 1, date: '2026-10-01', category: 'Seeds', title: 'Paddy BPT-5204 Seed Bags (60 kg)', amount: 4800, type: 'expense' },
  { id: 2, date: '2026-10-03', category: 'Land Prep', title: 'Tractor Ploughing & Puddling (3 hours)', amount: 3600, type: 'expense' },
  { id: 3, date: '2026-10-07', category: 'Fertilizers', title: 'DAP (2 bags) + Urea (1 bag)', amount: 3100, type: 'expense' },
  { id: 4, date: '2026-10-10', category: 'Labor', title: 'Transplanting Labor Wages (8 workers)', amount: 4800, type: 'expense' },
  { id: 5, date: '2026-10-12', category: 'Revenue', title: 'Govt Input Subsidy Advance Credit', amount: 5000, type: 'income' },
]

const INITIAL_EXPENSES_TE = [
  { id: 1, date: '2026-10-01', category: 'విత్తనాలు', title: 'వరి BPT-5204 విత్తన సంచులు (60 కిలోలు)', amount: 4800, type: 'expense' },
  { id: 2, date: '2026-10-03', category: 'భూమి దుక్కి', title: 'ట్రాక్టర్ వేసవి దుక్కి & దమ్ము ఖర్చు (3 గంటలు)', amount: 3600, type: 'expense' },
  { id: 3, date: '2026-10-07', category: 'ఎరువులు', title: 'DAP (2 బస్తాలు) + యూరియా (1 బస్తా)', amount: 3100, type: 'expense' },
  { id: 4, date: '2026-10-10', category: 'కూలీలు', title: 'వరి నాట్లు వేసే కూలీల ఖర్చు (8 మంది)', amount: 4800, type: 'expense' },
  { id: 5, date: '2026-10-12', category: 'ఆదాయం', title: 'ప్రభుత్వ పెట్టుబడి సాయం జమయ్యింది', amount: 5000, type: 'income' },
]

export default function FarmExpenseKhataPage() {
  const { lang } = useLanguage()

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('krishi_khata_records')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { }
    }
    return lang === 'te' ? INITIAL_EXPENSES_TE : INITIAL_EXPENSES_EN
  })

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('krishi_khata_records', JSON.stringify(records))
  }, [records])

  // Form state
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(lang === 'te' ? 'ఎరువులు' : 'Fertilizers')
  const [type, setType] = useState('expense')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const categories = lang === 'te'
    ? ['విత్తనాలు', 'భూమి దుక్కి', 'ఎరువులు', 'రసాయన మందులు', 'కూలీలు', 'డీజిల్ / కరెంట్', 'దిగుబడి విక్రయం', 'ఆదాయం']
    : ['Seeds', 'Land Prep', 'Fertilizers', 'Pesticides', 'Labor', 'Diesel / Fuel', 'Produce Sale', 'Revenue']

  const handleAddRecord = (e) => {
    e.preventDefault()
    if (!title.trim() || !amount) return

    const newRecord = {
      id: Date.now(),
      date,
      category,
      title: title.trim(),
      amount: parseFloat(amount),
      type
    }

    setRecords([newRecord, ...records])
    setTitle('')
    setAmount('')
  }

  const handleDelete = (id) => {
    setRecords(records.filter(r => r.id !== id))
  }

  // Financial calculations
  const totalExpense = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0)
  const totalIncome = records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0)
  const balance = totalIncome - totalExpense

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34, 197, 94, 0.2)', padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.85rem', color: '#4ade80', marginBottom: '1rem', fontWeight: 600 }}>
              <BookOpen size={16} /> {lang === 'te' ? 'రైతు డిజిటల్ లెడ్జర్ • ఖతా పుస్తకం' : 'Farmer Digital Khata • Expense & Profit Ledger'}
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              {lang === 'te' ? 'రైతు పంట ఖర్చుల ఖతా (లెడ్జర్)' : 'Farm Expense & Crop Profit Khata'}
            </h1>
            <p style={{ color: '#cbd5e1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {lang === 'te'
                ? 'విత్తనాలు, దుక్కి, ఎరువులు, కూలీలు మరియు పురుగుమందుల ఖర్చులను తేదీల వారీగా నమోదు చేసుకోండి. పంట కోత తర్వాత ఖచ్చితమైన లాభనష్టాల నివేదికను ప్రింట్ లేదా భద్రపరచుకోండి.'
                : 'Track day-to-day spending on seeds, tractor ploughing, fertilizers, labor wages, and harvest sales. Get instant financial profit-loss clarity across your cultivation season.'}
            </p>
          </div>

          <button
            onClick={() => window.print()}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#fff',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Printer size={16} /> {lang === 'te' ? 'ఖతా నివేదిక ముద్రించు' : 'Print Khata Report'}
          </button>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Total Expense */}
        <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {lang === 'te' ? 'మొత్తం సాగు ఖర్చులు' : 'Total Cultivation Expenses'}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ef4444', marginTop: '0.25rem' }}>
            ₹{totalExpense.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            {records.filter(r => r.type === 'expense').length} {lang === 'te' ? 'నమోదులు' : 'entries recorded'}
          </div>
        </div>

        {/* Total Income */}
        <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {lang === 'te' ? 'మార్కెట్ విక్రయ ఆదాయం' : 'Total Harvest Revenue & Grants'}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#22c55e', marginTop: '0.25rem' }}>
            ₹{totalIncome.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            {records.filter(r => r.type === 'income').length} {lang === 'te' ? 'ఆదాయ వనరులు' : 'income inflows'}
          </div>
        </div>

        {/* Net Farm Balance */}
        <div className="card" style={{ padding: '1.5rem', borderLeft: '4px solid ' + (balance >= 0 ? '#16a34a' : '#f59e0b') }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {lang === 'te' ? 'నికర మిగులు / లాభం' : 'Net Season Balance'}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: balance >= 0 ? '#16a34a' : '#f59e0b', marginTop: '0.25rem' }}>
            {balance >= 0 ? '+' : ''}₹{balance.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: balance >= 0 ? '#16a34a' : '#f59e0b', fontWeight: 700, marginTop: '0.2rem' }}>
            {balance >= 0 ? (lang === 'te' ? '✓ లాభదాయక సాగు' : '✓ Profitable Season') : (lang === 'te' ? 'కోతకు ముందు పెట్టుబడి దశ' : 'Pre-Harvest Investment Stage')}
          </div>
        </div>
      </div>

      {/* Main Content: Add Form & Transaction List */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Add Entry Form */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle size={20} color="var(--primary)" /> {lang === 'te' ? 'కొత్త ఖర్చు లేదా ఆదాయాన్ని నమోదు చేయండి' : 'Add New Farm Entry'}
          </h3>

          <form onSubmit={handleAddRecord} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Type selector */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setType('expense')}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid ' + (type === 'expense' ? '#ef4444' : 'var(--border-color)'),
                  background: type === 'expense' ? 'rgba(239, 68, 68, 0.12)' : 'var(--bg-secondary)',
                  color: type === 'expense' ? '#ef4444' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {lang === 'te' ? 'ఖర్చు (Expense)' : 'Expense (Spent)'}
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid ' + (type === 'income' ? '#22c55e' : 'var(--border-color)'),
                  background: type === 'income' ? 'rgba(34, 197, 94, 0.12)' : 'var(--bg-secondary)',
                  color: type === 'income' ? '#22c55e' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {lang === 'te' ? 'ఆదాయం (Income)' : 'Income (Earned)'}
              </button>
            </div>

            {/* Description Title */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                {lang === 'te' ? 'వివరణ / ఖర్చు వివరాలు' : 'Description / Entry Title'}
              </label>
              <input
                type="text"
                required
                placeholder={lang === 'te' ? 'ఉదా: యూరియా 2 బస్తాలు, పురుగుమందు పిచికారీ, నాట్లు...' : 'e.g. 2 Bags Potash, Drip Pipe Repair, Labor...'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            {/* Amount & Date in 2 columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  {lang === 'te' ? 'మొత్తం (₹)' : 'Amount (₹)'}
                </label>
                <input
                  type="number"
                  required
                  placeholder="₹ 2,500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    fontWeight: 700
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  {lang === 'te' ? 'తేదీ' : 'Date'}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                {lang === 'te' ? 'కేటగిరీ' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              style={{
                background: 'var(--primary)',
                color: '#fff',
                padding: '0.8rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                marginTop: '0.5rem',
                boxShadow: '0 4px 12px rgba(22, 101, 52, 0.3)'
              }}
            >
              {lang === 'te' ? '+ ఖతాలో నమోదు చేయండి' : '+ Add to Khata Ledger'}
            </button>
          </form>
        </div>

        {/* Ledger Transaction History Table */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              {lang === 'te' ? 'ఖర్చుల రికార్డుల చరిత్ర' : 'Cultivation Ledger History'}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {records.length} {lang === 'te' ? 'నమోదులు' : 'Transactions'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '550px', overflowY: 'auto' }}>
            {records.map((rec) => {
              const isIncome = rec.type === 'income'
              return (
                <div
                  key={rec.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isIncome ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: isIncome ? '#22c55e' : '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isIncome ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                    </div>

                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        {rec.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem' }}>
                        <span>{rec.category}</span>
                        <span>•</span>
                        <span>{rec.date}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: isIncome ? '#22c55e' : '#ef4444'
                    }}>
                      {isIncome ? '+' : '-'} ₹{rec.amount.toLocaleString()}
                    </div>

                    <button
                      onClick={() => handleDelete(rec.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Delete record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
