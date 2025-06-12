

export function loadUserQuotes() {
  const container = document.getElementById('result');
  if (!container) return;
  const saved = JSON.parse(localStorage.getItem('customQuotes')) || [];
  if (saved.length === 0) {
    container.textContent = 'No saved quotes yet.';
    return;
  }
  container.innerHTML = saved.map(entry => `
    <div class="hero-preview-box" style="background-image: url('${entry.image}')">
      <blockquote class="quote-preview">"${entry.quote}"</blockquote>
      <p class="author-preview">– ${entry.author}, ${entry.source}</p>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const result = document.getElementById('result');
  if (!result) return;
  const p = new URLSearchParams(window.location.search);
  const q = p.get('quote'),
        a = p.get('author'),
        s = p.get('source'),
        i = p.get('image');
  if (q && a && s && i) {
    result.innerHTML = `
      <div class="hero-preview-box" style="background-image:url('${i}')">
        <blockquote class="quote-preview">"${q}"</blockquote>
        <p class="author-preview">– ${a}, ${s}</p>
      </div>`;
  } else {
    result.textContent = 'No form data found in the URL.';
  }
});