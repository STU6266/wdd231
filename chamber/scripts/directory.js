document.addEventListener('DOMContentLoaded', async () => {
  // === Footer: aktuelles Jahr + letztes Änderungsdatum ===
  const yearEl     = document.getElementById('currentYear');
  const modifiedEl = document.getElementById('lastModified');
  yearEl.textContent     = new Date().getFullYear();
  modifiedEl.textContent = `Letzte Änderung: ${new Date(document.lastModified).toLocaleDateString('de-DE')}`;

  // === View-Buttons & Container ===
  const gridBtn    = document.getElementById('grid-btn');
  const listBtn    = document.getElementById('list-btn');
  const directoryEl = document.getElementById('directory');
  const dataUrl    = 'data/members.json';

  // === 1) Daten laden ===
  let members = [];
  try {
    const resp = await fetch(dataUrl);
    if (!resp.ok) throw new Error(`HTTP-Fehler: ${resp.status}`);
    members = await resp.json();
  } catch (err) {
    console.error('Fehler beim Laden der Member-Daten:', err);
    directoryEl.innerHTML = '<p>Fehler beim Laden der Verzeichnis-Daten.</p>';
    return;
  }

  // === 2) Render-Funktionen ===
  function renderGrid() {
    directoryEl.innerHTML = '';
    directoryEl.classList.remove('list-view');
    directoryEl.classList.add('grid-view');

    members.forEach(m => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="images/${m.imageFileName}" alt="${m.name} Logo">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <p><a href="${m.website}" target="_blank">
          ${m.website.replace(/^https?:\/\//, '')}
        </a></p>
      `;
      directoryEl.appendChild(card);
    });
  }

  function renderList() {
    directoryEl.innerHTML = '';
    directoryEl.classList.remove('grid-view');
    directoryEl.classList.add('list-view');

    members.forEach((m, i) => {
      const row = document.createElement('div');
      row.className = 'list-item';
      // Zebra-Striping
      if (i % 2 === 1) row.style.backgroundColor = 'var(--zebra-bg)';

      row.innerHTML = `
        <div>${m.name}</div>
        <div>${m.address}</div>
        <div>${m.phone}</div>
        <div><a href="${m.website}" target="_blank">
          ${m.website.replace(/^https?:\/\//, '')}
        </a></div>
      `;
      directoryEl.appendChild(row);
    });
  }

  // === 3) View-Toggle-Handler ===
  gridBtn.addEventListener('click', () => {
    if (gridBtn.getAttribute('aria-pressed') === 'false') {
      gridBtn.setAttribute('aria-pressed', 'true');
      listBtn.setAttribute('aria-pressed', 'false');
      renderGrid();
    }
  });

  listBtn.addEventListener('click', () => {
    if (listBtn.getAttribute('aria-pressed') === 'false') {
      listBtn.setAttribute('aria-pressed', 'true');
      gridBtn.setAttribute('aria-pressed', 'false');
      renderList();
    }
  });

  // === 4) Initiale Ansicht ===
  renderGrid();
});
