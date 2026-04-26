# GRADIENT-lite 🌿

A lightweight data center energy monitoring dashboard inspired by [Lucend's GRADIENT AI](https://lucend.com).

<img width="998" height="988" alt="screenshot" src="https://github.com/user-attachments/assets/01692815-1b27-4d22-a524-e6d6f4a0b023" />


## Features
- 📊 KPI cards (PUE, Temperature, Energy, Savings)
- 📈 Energy & temperature chart (Recharts)
- 🖥️ Server status overview with click-to-filter
- ⚠️ Active alert panel with severity levels
- 🤖 AI-powered insights via OpenAI GPT-4o-mini + Flask backend

## Tech Stack
- **Frontend:** React, Vite, Recharts
- **Backend:** Flask, Flask-CORS
- **AI:** OpenAI API (GPT-4o-mini)

## Note on data
This project uses **mock data** — the metrics, alerts, and server statuses are all simulated.
The chart updates every 5 seconds with slight random variation to mimic a live feed,
but no real data center is connected. Built this way intentionally to focus on the UI
and AI integration within a short timeframe.

## Why I built this
I applied for a working student Software Development position at Lucend and wanted to
learn React from scratch while exploring the product domain. Built over a weekend as a
hands-on way to get familiar with React, Vite, and connecting a Python backend to a
frontend — all of which were new or rusty for me at the time.

## Run locally

**Frontend:**
```bash
npm install
npm run dev
```

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install flask flask-cors openai
python app.py
```
