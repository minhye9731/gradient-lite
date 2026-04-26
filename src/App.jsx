import { useState, useEffect } from 'react'
import './App.css'
import { kpiData, energyTimeline, alerts, servers } from './mockData'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import InsightPanel from './InsightPanel'

function KpiCard({ label, value, unit, trend, good }) {
  const isGood = (good === 'up' && trend > 0) || (good === 'down' && trend < 0)
  return (
    <div className="kpi-card">
      <div className="label">{label}</div>
      <div className="value">{value}<span className="unit">{unit}</span></div>
      <div className={`trend ${isGood ? 'up' : 'down'}`}>
        {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}{unit}
      </div>
    </div>
  )
}

function App() {
  const [selectedServer, setSelectedServer] = useState(null)
  const [chartData, setChartData] = useState(energyTimeline)

  // 실시간 업데이트: 5초마다 마지막 데이터 포인트 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        updated[updated.length - 1] = {
          ...last,
          kwh: Math.round(last.kwh + (Math.random() - 0.5) * 20),
          temp: +(last.temp + (Math.random() - 0.5) * 0.5).toFixed(1),
        }
        return updated
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // 선택된 서버에 따라 alert 필터링
  const filteredAlerts = selectedServer
    ? alerts.filter(a => a.server === selectedServer)
    : alerts

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">GRADIENT-lite</div>
        <div className="sidebar-sub">Energy Monitor</div>

        <div className="sidebar-label">Servers</div>
        {servers.map(s => (
          <div
            key={s.id}
            className={`server-item ${selectedServer === s.name ? 'active' : ''}`}
            onClick={() => setSelectedServer(prev => prev === s.name ? null : s.name)}
          >
            <span className={`dot ${s.status}`}></span>
            <span>{s.name}</span>
            <span className="server-location">{s.location}</span>
          </div>
        ))}

        {selectedServer && (
          <div
            style={{ marginTop: 12, fontSize: 11, color: '#58a6ff', cursor: 'pointer', padding: '4px 10px' }}
            onClick={() => setSelectedServer(null)}
          >
            ✕ Clear filter
          </div>
        )}
      </aside>

      <main className="main">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <h2 className="page-title" style={{ margin: 0 }}>
            {selectedServer ? `Server: ${selectedServer}` : 'Overview'}
          </h2>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: '#8b949e' }}>
            <span className="live-dot"></span>Live
          </span>
        </div>

        <div className="kpi-grid">
          {kpiData.map(k => <KpiCard key={k.label} {...k} />)}
        </div>

        <div className="chart-box">
          <h2>Energy & Temperature — Last 24h</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} interval={3} />
              <YAxis yAxisId="left"  tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left"  type="monotone" dataKey="kwh"  stroke="#58a6ff" dot={false} name="kWh" />
              <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#f0883e" dot={false} name="Temp °C" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bottom-grid">
          <div className="alert-panel">
            <h2>⚠ Active Alerts {selectedServer && `— ${selectedServer}`}</h2>
            {filteredAlerts.length === 0
              ? <p style={{ fontSize: 13, color: '#8b949e' }}>No alerts for this server.</p>
              : filteredAlerts.map(a => (
                <div className="alert-item" key={a.id}>
                  <span className={`badge ${a.severity}`}>{a.severity.toUpperCase()}</span>
                  <div>
                    <div className="alert-msg">{a.server} — {a.message}</div>
                    <div className="alert-time">{a.time}</div>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="alert-panel">
            <h2>🖥 Server Status</h2>
            {servers.map(s => (
              <div className="server-item" key={s.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedServer(prev => prev === s.name ? null : s.name)}
              >
                <span className={`dot ${s.status}`}></span>
                <span>{s.name}</span>
                <span className="server-location">{s.location}</span>
              </div>
            ))}
          </div>
        </div>
        <InsightPanel kpiData={kpiData} alerts={filteredAlerts} />
      </main>
    </div>
  )
}

export default App