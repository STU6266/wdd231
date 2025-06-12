(async () => {
  const section = document.getElementById('quote-section');
  const text    = document.getElementById('quote-text');
  const author  = document.getElementById('quote-author');
  const btn     = document.getElementById('new-quote-btn');

  // Sobald der Browser idle ist, lade JSON und setze die Hero-Logik
  window.requestIdleCallback(async () => {
    // Lade jetzt die Daten, wenn der Haupt-Thread frei ist
    const [quotesRes, wallsRes] = await Promise.all([
      fetch('data/quotes.json'),
      fetch('data/wallpapers.json')
    ]);
    const quotes     = await quotesRes.json();
    const wallpapers = await wallsRes.json();
    const rand = arr => arr[Math.floor(Math.random() * arr.length)];

    // Funktion, die Quote + Hintergrund wechselt
    function showRandom() {
      const q = rand(quotes);
      const w = rand(wallpapers);
      text.textContent   = `"${q.quote}"`;
      author.textContent = `– ${q.author}, ${q.source}`;
      section.style.backgroundImage = `url('${w.path}')`;
    }

    // Einmal zeigen und bei Button-Klick erneut
    showRandom();
    btn.addEventListener('click', showRandom);
  });
})();