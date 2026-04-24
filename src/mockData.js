// 가짜 서버 데이터 — 나중에 실제 API로 교체 가능한 구조로 만들어둠

export const servers = [
  { id: 1, name: 'Server AMS-01', status: 'normal',  location: 'Amsterdam' },
  { id: 2, name: 'Server AMS-02', status: 'warning', location: 'Amsterdam' },
  { id: 3, name: 'Server LON-01', status: 'critical', location: 'London' },
  { id: 4, name: 'Server SGP-01', status: 'normal',  location: 'Singapore' },
]

export const kpiData = {
  pue:         { value: 1.42, unit: '',    label: 'PUE',         trend: -0.05 },
  temperature: { value: 24.3, unit: '°C', label: 'Avg Temp',    trend: +1.2  },
  energy:      { value: 3820, unit: 'kWh',label: 'Energy (24h)', trend: -180 },
  savings:     { value: 12.4, unit: '%',  label: 'Savings',     trend: +2.1  },
}

// 지난 24시간 에너지 사용량 (시간별)
export const energyTimeline = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  kwh: Math.round(140 + Math.random() * 60 + (i > 8 && i < 20 ? 40 : 0)),
  temp: +(22 + Math.random() * 4 + (i > 10 && i < 18 ? 2 : 0)).toFixed(1),
}))

export const alerts = [
  { id: 1, severity: 'critical', server: 'LON-01', message: 'Temperature exceeded 35°C', time: '14 min ago' },
  { id: 2, severity: 'warning',  server: 'AMS-02', message: 'Fan speed anomaly detected', time: '1h ago'     },
  { id: 3, severity: 'info',     server: 'AMS-01', message: 'Cooling efficiency improved', time: '3h ago'   },
]