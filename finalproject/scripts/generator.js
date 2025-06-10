document.addEventListener('DOMContentLoaded', () => {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const quoteSection = document.getElementById('quote-section');
  const newQuoteBtn = document.getElementById('new-quote-btn');
  const previewBtn = document.getElementById('preview-btn');
  const previewOutput = document.getElementById('preview-output');
  const createForm = document.getElementById('create-form');
  const wallpaperSelect = document.getElementById('wallpaper-select');

  async function fetchData() {
    try {
      const [quotesResponse, wallpapersResponse] = await Promise.all([
        fetch('data/quotes.json'),
        fetch('data/wallpapers.json')
      ]);

      const quotes = await quotesResponse.json();
      const wallpapers = await wallpapersResponse.json();
      return { quotes, wallpapers };
    } catch (error) {
      console.error("Error loading JSON files:", error);
      if (quoteText) quoteText.textContent = "Error loading data.";
      return { quotes: [], wallpapers: [] };
    }
  }

  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function displayContent(quotes, wallpapers) {
    const randomQuote = getRandomItem(quotes);
    const randomWallpaper = getRandomItem(wallpapers);

    quoteText.textContent = `"${randomQuote.quote}"`;
    quoteAuthor.textContent = `– ${randomQuote.author}, ${randomQuote.source}`;
    quoteSection.style.backgroundImage = `url('${randomWallpaper.path}')`;
    quoteSection.style.backgroundSize = 'cover';
    quoteSection.style.backgroundPosition = 'center';
  }

  function populateWallpaperSelect(wallpapers) {
    if (!wallpaperSelect) return;
    wallpapers.forEach(wallpaper => {
      const option = document.createElement('option');
      option.value = wallpaper.path;
      option.textContent = wallpaper.alt || wallpaper.filename;
      wallpaperSelect.appendChild(option);
    });
  }

  // Index.html Logik
  if (quoteSection && newQuoteBtn) {
    fetchData().then(({ quotes, wallpapers }) => {
      if (quotes.length && wallpapers.length) {
        displayContent(quotes, wallpapers);
        newQuoteBtn.addEventListener('click', () => displayContent(quotes, wallpapers));
      }
    });
  }

  // Create.html Logik
  if (previewBtn && createForm) {
    fetchData().then(({ quotes, wallpapers }) => {
      populateWallpaperSelect(wallpapers);

      previewBtn.addEventListener('click', () => {
        const quote = document.getElementById('quote').value;
        const author = document.getElementById('author').value;
        const source = document.getElementById('source').value;
        const customImage = document.getElementById('image').value;
        const selectedWallpaper = wallpaperSelect.value;
        const image = selectedWallpaper || customImage;

        if (quote && author && source && image) {
          previewOutput.innerHTML = `
            <div class="hero-preview-box" style="background-image: url('${image}')">
              <blockquote class="quote-preview">"${quote}"</blockquote>
              <p class="author-preview">– ${author}, ${source}</p>
            </div>
          `;
          document.getElementById('preview-area').style.display = 'block';
        }
      });

      createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEntry = {
          quote: document.getElementById('quote').value,
          author: document.getElementById('author').value,
          source: document.getElementById('source').value,
          image: wallpaperSelect.value || document.getElementById('image').value
        };
        let saved = JSON.parse(localStorage.getItem('customQuotes')) || [];
        saved.push(newEntry);
        localStorage.setItem('customQuotes', JSON.stringify(saved));
        alert('Quote saved locally!');
        createForm.reset();
        document.getElementById('preview-area').style.display = 'none';
      });
    });
  }
});
