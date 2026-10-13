import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Leaf, Clock, MessageSquare } from 'lucide-react'

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address.'
  if (!form.subject.trim()) errors.subject = 'Subject is required.'
  if (!form.message.trim()) errors.message = 'Message is required.'
  else if (form.message.trim().length < 20) errors.message = 'Message must be at least 20 characters.'
  return errors
}

const CONTACT_INFO = [
  { icon: <Mail size={20} />, label: 'Email', value: 'hello@krishi.org.in', sub: 'We aim to respond within 24 hours' },
  { icon: <Phone size={20} />, label: 'Phone', value: '+91 98765 43210', sub: 'Mon–Sat, 9am–6pm IST' },
  { icon: <MapPin size={20} />, label: 'Location', value: 'Bengaluru, Karnataka', sub: 'India — 560001' },
  { icon: <Clock size={20} />, label: 'Business Hours', value: 'Monday – Saturday', sub: '9:00 AM – 6:00 PM IST' },
]

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
      setForm(INITIAL_FORM)
      setErrors({})
    }, 1500)
  }

  return (
    <div className="contact-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span className="section-badge" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac', marginBottom: '1rem' }}>
            <MessageSquare size={14} />
            Get in Touch
          </span>
          <h1>Contact Krishi</h1>
          <p>
            Have questions about smart farming, our platform, or partnership opportunities?
            We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="grid-2" style={{ gap: '3rem', alignItems: 'flex-start' }}>
          {/* Contact Form */}
          <div id="contact-form-section">
            <div className="card" style={{ padding: '2rem' }} id="contact-form-card">
              <h3 style={{ marginBottom: '0.5rem' }}>Send us a Message</h3>
              <p style={{ fontSize: '0.88rem', marginBottom: '1.75rem' }}>
                Fill in the form below and our team will get back to you promptly.
              </p>

              {submitted && (
                <div className="form-success" id="form-success-msg">
                  <CheckCircle size={20} />
                  Thank you! Your message has been received. We will be in touch shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate id="contact-form">
                <div className="grid-2" style={{ gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className={`form-control ${errors.name ? 'error' : ''}`}
                      placeholder="Rajan Patel"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p className="form-error">
                        <AlertCircle size={12} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className={`form-control ${errors.email ? 'error' : ''}`}
                      placeholder="rajan@example.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="form-error">
                        <AlertCircle size={12} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subject *</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    className={`form-control ${errors.subject ? 'error' : ''}`}
                    placeholder="e.g., Partnership inquiry, Technical support…"
                    value={form.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && (
                    <p className="form-error">
                      <AlertCircle size={12} />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    className={`form-control ${errors.message ? 'error' : ''}`}
                    placeholder="Tell us about your farm, your challenges, or what you'd like to know about Krishi…"
                    value={form.message}
                    onChange={handleChange}
                    style={{ resize: 'vertical' }}
                  />
                  {errors.message && (
                    <p className="form-error">
                      <AlertCircle size={12} />
                      {errors.message}
                    </p>
                  )}
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 6 }}>
                    {form.message.length} / 500 characters
                  </p>
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {submitting ? (
                    <>
                      <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div id="contact-info-section">
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>Get in Touch</h3>
              <p>
                Whether you are a farmer curious about smart agriculture, an investor
                exploring the AgriTech space, or a developer interested in collaboration —
                we would love to connect.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }} id="contact-info-list">
              {CONTACT_INFO.map(c => (
                <div
                  key={c.label}
                  style={{
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    padding: '1.25rem',
                    background: 'white',
                    borderRadius: 12,
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  id={`contact-${c.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                      background: 'linear-gradient(135deg, #dcfce7, #f0fdf4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--primary)', border: '1px solid #bbf7d0',
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.88rem', margin: '0 0 2px' }}>
                      {c.label}
                    </p>
                    <p style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.95rem', margin: '0 0 2px' }}>
                      {c.value}
                    </p>
                    <p style={{ fontSize: '0.78rem', margin: 0 }}>{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div
              style={{
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                border: '1px solid #bbf7d0',
                borderRadius: 16,
                padding: '2rem',
                textAlign: 'center',
              }}
              id="map-placeholder"
            >
              <MapPin size={32} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ marginBottom: '0.5rem' }}>Krishi HQ</h4>
              <p style={{ fontSize: '0.88rem' }}>
                Electronic City, Bengaluru,<br />
                Karnataka, India — 560100
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                Map integration coming soon. For directions, please use Google Maps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
