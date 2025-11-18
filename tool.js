const banner = document.getElementById("banner");
const images = ["news1.jpg", "news2.jpg", "news3.jpg", "news4.jpg", "news5.jpg"];
let currentIndex = 0;

function changeImage() {
  banner.style.backgroundImage = `url('${images[currentIndex]}')`;
  banner.style.backgroundSize = "cover";
  banner.style.backgroundPosition = "center";
  currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeImage, 3000);
changeImage();

const btn = document.getElementById("verifyBtn");
const textInput = document.getElementById("textInput");
const resultDiv = document.getElementById("result");

const BACKEND_URL = "http://10.215.108.57:5000/verify";

btn.addEventListener("click", async () => {
  const rawText = textInput.value.trim();
  if (!rawText) {
    alert("⚠️ Please enter some news text!");
    return;
  }

  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = "⏳ Calculating authenticity...";

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: rawText })
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    const data = await res.json();

    if (data.error) {
      resultDiv.innerHTML = `❌ Error: ${data.error}`;
      return;
    }

    const score = typeof data.authenticity_score === "number" ? data.authenticity_score : "N/A";
    const verdict = data.verdict || "No verdict";
    const message = data.message || "";
    const article = data.recommended_article || {};

    let html = `
      <p><strong>Verdict:</strong> ${verdict}</p>
      <p><strong>Authenticity Score:</strong> ${score}%</p>
      <p>${message}</p>
    `;

    if (article && article.title && article.url) {
      html += `
        <hr />
        <p><strong>📰 Recommended Article to Read:</strong></p>
        <p><em>${article.title}</em></p>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">📖 Read Full Article Here</a>
      `;
    } else {
      html += `<p>❌ No article could be verified as 100% genuine.</p>`;
    }

    resultDiv.innerHTML = html;

  } catch (err) {
    resultDiv.innerHTML = `❌ Network error: ${err.message}`;
  }
});