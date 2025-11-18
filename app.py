from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import time

app = Flask(__name__)
CORS(app)

API_KEY = "cbe66ad9279942baa3e887f5d1afe335"
NEWS_URL = "https://newsapi.org/v2/everything"

@app.route('/verify', methods=['POST'])
def verify_news():
    try:
        data = request.get_json(force=True)
        query = data.get("text", "").strip()

        if not query:
            return jsonify({"error": "No text provided."}), 400

        time.sleep(1.2)

        articles = get_articles(query)
        match_count = len(articles)

        if match_count >= 10:
            score = 100
        elif match_count >= 7:
            score = 90
        elif match_count >= 5:
            score = 70
        elif match_count >= 3:
            score = 65
        elif match_count >= 1:
            score = 40
        else:
            score = 0

        verdict = (
            "✅ 100% Genuine" if score >= 90 else
            "⚠️ Possibly Genuine" if score >= 65 else
            "❓ Doubtful" if score >= 40 else
            "❌ Likely Fake"
        )

        best_article = articles[0] if articles else None
        recommended = {
            "title": best_article.get("title", ""),
            "description": best_article.get("description", ""),
            "url": best_article.get("url", "")
        } if best_article else {}

        return jsonify({
            "authenticity_score": score,
            "verdict": verdict,
            "matches_found": match_count,
            "message": f"Found {match_count} articles supporting this claim.",
            "recommended_article": recommended
        })
    
    except Exception as e:
        print("Server error:", e)
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500

def get_articles(query):
    try:
        params = {
            "q": query,
            "language": "en",
            "sortBy": "relevancy",
            "pageSize": 10,
            "apiKey": API_KEY
        }
        res = requests.get(NEWS_URL, params=params, timeout=5)
        data = res.json()
        return data.get("articles", []) if "articles" in data else []
    except Exception as e:
        print("NewsAPI error:", e)
        return []

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)