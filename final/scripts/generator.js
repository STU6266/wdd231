document.addEventListener('DOMContentLoaded', () => {
  // Dark-Mode Toggle
  const modeToggle = document.querySelector('.mode-toggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  }

  // Hamburger-Menü Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList    = document.querySelector('.main-nav ul');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
  }

  // Fetch-Funktion
  async function fetchData() {
    try {
      const [quotesResponse, wallpapersResponse] = await Promise.all([
        fetch('data/quotes.json'),
        fetch('data/wallpapers.json')
      ]);
      const quotes     = await quotesResponse.json();
      const wallpapers = await wallpapersResponse.json();
      return { quotes, wallpapers };
    } catch (error) {
      console.error("Error loading JSON files:", error);
      return { quotes: [], wallpapers: [] };
    }
  }

  // Utility für Zufallsauswahl
  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Index.html Logik: Hero Quote
  const quoteSection = document.getElementById('quote-section');
  const quoteText    = document.getElementById('quote-text');
  const quoteAuthor  = document.getElementById('quote-author');
  const newQuoteBtn  = document.getElementById('new-quote-btn');

  if (quoteSection && newQuoteBtn) {
    fetchData().then(({ quotes, wallpapers }) => {
      if (quotes.length && wallpapers.length) {
        displayRandom(quotes, wallpapers);
        newQuoteBtn.addEventListener('click', () => displayRandom(quotes, wallpapers));
      }
    });
  }

  function displayRandom(quotes, wallpapers) {
    const q = getRandomItem(quotes);
    const w = getRandomItem(wallpapers);
    quoteText.textContent   = `"${q.quote}"`;
    quoteAuthor.textContent = `– ${q.author}, ${q.source}`;
    quoteSection.style.backgroundImage = `url('${w.path}')`;
  }

  // Create.html Logik
  const createForm      = document.getElementById('create-form');
  const previewBtn      = document.getElementById('preview-btn');
  const previewOutput   = document.getElementById('preview-output');
  const wallpaperSelect = document.getElementById('wallpaper-select');
  const gallery         = document.getElementById('wallpaper-gallery');

  if (createForm && previewBtn) {
    fetchData().then(({ wallpapers }) => {
      // Dropdown füllen
      wallpapers.forEach(wp => {
        const option = document.createElement('option');
        option.value = wp.path;
        option.textContent = wp.alt || wp.filename;
        wallpaperSelect.appendChild(option);
      });
      // Galerie füllen (lazy loading)
      wallpapers.forEach(wp => {
        const img = document.createElement('img');
        img.src     = wp.path;
        img.alt     = wp.alt || wp.filename;
        img.loading = 'lazy';
        img.classList.add('wallpaper-thumb');
        img.addEventListener('click', () => wallpaperSelect.value = wp.path);
        gallery.appendChild(img);
      });

      // Preview-Button
      previewBtn.addEventListener('click', () => {
        const quoteVal  = document.getElementById('quote').value;
        const authorVal = document.getElementById('author').value;
        const sourceVal = document.getElementById('source').value;
        const customUrl = document.getElementById('image').value;
        const imageVal  = wallpaperSelect.value || customUrl;
        if (quoteVal && authorVal && sourceVal && imageVal) {
          previewOutput.innerHTML = `
            <div class="hero-preview-box" style="background-image: url('${imageVal}')">
              <blockquote class="quote-preview">"${quoteVal}"</blockquote>
              <p class="author-preview">– ${authorVal}, ${sourceVal}</p>
            </div>`;
          document.getElementById('preview-area').style.display = 'block';
        }
      });

      // Submit-Handler mit Modal, Focus-Management & Escape
      createForm.addEventListener('submit', e => {
        e.preventDefault();
        const entry = {
          quote:  document.getElementById('quote').value,
          author: document.getElementById('author').value,
          source: document.getElementById('source').value,
          image:  wallpaperSelect.value || document.getElementById('image').value
        };
        const saved = JSON.parse(localStorage.getItem('customQuotes')) || [];
        saved.push(entry);
        localStorage.setItem('customQuotes', JSON.stringify(saved));

        const overlay = document.getElementById('modal-overlay');
        const modal   = document.getElementById('save-modal');
        const closeBtn= document.getElementById('close-modal');
        const prevFocus = document.activeElement;

        overlay.style.display = 'block';
        modal.style.display   = 'block';
        closeBtn.focus();

        function closeModal() {
          modal.style.display   = 'none';
          overlay.style.display = 'none';
          prevFocus.focus();
          document.removeEventListener('keydown', trap);
        }
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        function trap(e) {
          if (e.key === 'Escape') closeModal();
        }
        document.addEventListener('keydown', trap);

        createForm.reset();
        document.getElementById('preview-area').style.display = 'none';
      });
    });
  }

  // Formaction.html Logik
  const result = document.getElementById('result');
  if (result) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('quote'), a = params.get('author'),
          s = params.get('source'), i = params.get('image');
    if (q && a && s && i) {
      result.innerHTML = `
        <div class="hero-preview-box" style="background-image: url('${i}')">
          <blockquote class="quote-preview">"${q}"</blockquote>
          <p class="author-preview">– ${a}, ${s}</p>
        </div>`;
    } else {
      result.textContent = "No form data found in the URL.";
    }
  }

  // userCreated.html Logik
  if (document.getElementById('result')) {
    import('./userCreated.mjs').then(module => {
      module.loadUserQuotes();
    });
  }
});
