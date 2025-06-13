(async () => {
  const section = document.getElementById('quote-section');
  const text    = document.getElementById('quote-text');
  const author  = document.getElementById('quote-author');
  const btn     = document.getElementById('new-quote-btn');


  window.requestIdleCallback(async () => {

    const [quotesRes, wallsRes] = await Promise.all([
      fetch('data/quotes.json'),
      fetch('data/wallpapers.json')
    ]);
    const quotes     = await quotesRes.json();
    const wallpapers = await wallsRes.json();
    const rand = arr => arr[Math.floor(Math.random() * arr.length)];


    function showRandom() {
      const q = rand(quotes);
      const w = rand(wallpapers);
      text.textContent   = `"${q.quote}"`;
      author.textContent = `– ${q.author}, ${q.source}`;
      section.style.backgroundImage = `url('${w.path}')`;
    }

    showRandom();
    btn.addEventListener('click', showRandom);
  });
})();