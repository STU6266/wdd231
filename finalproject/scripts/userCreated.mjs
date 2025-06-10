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
