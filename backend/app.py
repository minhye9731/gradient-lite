from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app)  # React에서 오는 요청 허용

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route("/api/insight", methods=["POST"])
def get_insight():
    data = request.json  # React에서 보낸 대시보드 데이터

    prompt = f"""
You are an AI assistant for a data center energy monitoring system.
Analyze the following real-time data and give 3 short, actionable insights.
Be specific with numbers. Keep each insight to 1-2 sentences.

Current metrics:
- PUE (Power Usage Effectiveness): {data['pue']} (lower is better, ideal is 1.0)
- Average Temperature: {data['temperature']}°C
- Energy consumption (24h): {data['energy']} kWh
- Savings vs last week: {data['savings']}%

Active alerts:
{data['alerts']}

Respond in this exact format:
1. [insight]
2. [insight]
3. [insight]
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300,
    )

    insight_text = response.choices[0].message.content
    return jsonify({"insight": insight_text})

if __name__ == "__main__":
    app.run(debug=True, port=5000)