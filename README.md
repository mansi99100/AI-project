# AI-project
# 📰 AI-Powered News Authenticity Verification System

## 📌 Overview

The AI-Powered News Authenticity Verification System is a web application that helps users verify the credibility of news claims. The system analyzes user-provided text and compares it with articles fetched from NewsAPI to determine whether the claim is likely genuine or fake.

The application provides an authenticity score, verdict, number of supporting articles found, and recommends the most relevant news article.

---

## 🚀 Features

* Verify news claims using real-time news data.
* Generate an authenticity score (0–100).
* Classify claims as:

  * ✅ 100% Genuine
  * ⚠️ Possibly Genuine
  * ❓ Doubtful
  * ❌ Likely Fake
* Display the number of matching articles.
* Recommend the most relevant supporting article.
* REST API built with Flask.
* Cross-Origin Resource Sharing (CORS) support.

---

## 🛠️ Technologies Used

* Python
* Flask
* Flask-CORS
* Requests Library
* NewsAPI
* REST API

---

## 📂 Project Structure

```bash
├── app.py
├── requirements.txt
├── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/news-authenticity-verifier.git
cd news-authenticity-verifier
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

### 3. Activate the Virtual Environment

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 🔑 API Configuration

Create a NewsAPI account and obtain an API key.

Replace the API key in the code:

```python
API_KEY = "YOUR_NEWSAPI_KEY"
```

---

## ▶️ Running the Application

```bash
python app.py
```

The server will start on:

```bash
http://localhost:5000
```

---

## 📡 API Endpoint

### Verify News

**POST** `/verify`

#### Request Body

```json
{
  "text": "NASA discovers water on Mars"
}
```

#### Sample Response

```json
{
  "authenticity_score": 90,
  "verdict": "✅ 100% Genuine",
  "matches_found": 8,
  "message": "Found 8 articles supporting this claim.",
  "recommended_article": {
    "title": "NASA confirms water traces on Mars",
    "description": "Scientists reveal new findings...",
    "url": "https://example.com/article"
  }
}
```

---

## 🧠 How It Works

1. User submits a news claim.
2. The system queries NewsAPI for relevant articles.
3. Matching articles are counted.
4. An authenticity score is calculated based on the number of matches.
5. The system generates a verdict and recommends the most relevant article.

---

## 🔮 Future Enhancements

* Machine Learning based fake news detection.
* NLP-powered semantic similarity analysis.
* Sentiment and credibility analysis.
* Multi-source fact-checking integration.
* User authentication and history tracking.
* Dashboard for analytics and reporting.

---

## 👩‍💻 Author

**Mansi Rawat**

Computer Science Undergraduate passionate about Artificial Intelligence, Machine Learning, Cybersecurity, and Software Development.

GitHub: https://github.com/mansi99100

LinkedIn: https://www.linkedin.com/in/mansirawat01/
