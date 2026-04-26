import { useState } from 'react'

function InsightPanel({ kpiData, alerts }) {
  const [insight, setInsight] = useState('')
  const [loading, setLoading] = useState(false)

  async function fetchInsight() {
    setLoading(true)
    setInsight('')

    const payload = {
      pue:         kpiData.find(k => k.label === 'PUE').value,
      temperature: kpiData.find(k => k.label === 'Avg Temp').value,
      energy:      kpiData.find(k => k.label === 'Energy (24h)').value,
      savings:     kpiData.find(k => k.label === 'Savings').value,
      alerts:      alerts.map(a => `${a.severity.toUpperCase()} - ${a.server}: ${a.message}`).join('\n')
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/api/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      setInsight(data.insight)
    } catch (err) {
      setInsight('Failed to connect to backend. Make sure Flask is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="alert-panel" style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>🤖 AI Insight</h2>
        <button
          onClick={fetchInsight}
          disabled={loading}
          style={{
            marginLeft: 'auto',
            background: loading ? '#21262d' : '#1f6feb',
            color: '#e6edf3',
            border: 'none',
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 12,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s'
          }}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {!insight && !loading && (
        <p style={{ fontSize: 13, color: '#8b949e' }}>
          Click "Analyze" to get AI-powered insights based on current data.
        </p>
      )}

      {loading && (
        <p style={{ fontSize: 13, color: '#58a6ff' }}>
          <span className="live-dot"></span> Analyzing data...
        </p>
      )}

      {insight && (
        <div style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
          {insight}
        </div>
      )}
    </div>
  )
}

export default InsightPanel