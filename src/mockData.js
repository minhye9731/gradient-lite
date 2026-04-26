export const kpiData = [
  { label: 'PUE',          value: '1.42', unit: '',     trend: -0.05, good: 'down' },
  { label: 'Avg Temp',     value: '24.3', unit: '°C',   trend: +1.2,  good: 'down' },
  { label: 'Energy (24h)', value: '3820', unit: ' kWh', trend: -180,  good: 'down' },
  { label: 'Savings',      value: '12.4', unit: '%',    trend: +2.1,  good: 'up'   },
]

export const servers = [
  { id: 1, name: 'AMS-01', status: 'normal',   location: 'Amsterdam' },
  { id: 2, name: 'AMS-02', status: 'warning',  location: 'Amsterdam' },
  { id: 3, name: 'LON-01', status: 'critical', location: 'London'    },
  { id: 4, name: 'SGP-01', status: 'normal',   location: 'Singapore' },
]

export const alerts = [
  { id: 1, severity: 'critical', server: 'LON-01', message: 'Temperature exceeded 35°C',  time: '14 min ago' },
  { id: 2, severity: 'warning',  server: 'AMS-02', message: 'Fan speed anomaly detected', time: '1h ago'     },
  { id: 3, severity: 'info',     server: 'AMS-01', message: 'Cooling efficiency improved', time: '3h ago'   },
]

export const energyTimeline = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  kwh:  Math.round(140 + Math.random() * 60 + (i > 8 && i < 20 ? 40 : 0)),
  temp: +(22 + Math.random() * 4 + (i > 10 && i < 18 ? 2 : 0)).toFixed(1),
}))