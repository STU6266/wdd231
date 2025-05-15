document.addEventListener('DOMContentLoaded', async () => {
  const yearEl = document.getElementById('currentYear');
  const modifiedEl = document.getElementById('lastModified');
  yearEl.textContent = new Date().getFullYear();
  modifiedEl.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleDateString('en-US')}`;

  const gridBtn = document.getElementById('grid-btn');
  const listBtn = document.getElementById('list-btn');
  const directoryEl = document.getElementById('directory');
  const dataUrl = 'data/members.json';

  let members = [];
  try {
    const resp = await fetch(dataUrl);
    if (!resp.ok) throw new Error(`HTTP Error: ${resp.status}`);
    members = await resp.json();
  } catch (err) {
    console.error('Error loading member data:', err);
    directoryEl.innerHTML = '<p>Error loading directory data.</p>';
    return;
  }

  function renderGrid() {
    directoryEl.innerHTML = '';
    directoryEl.classList.remove('list-view');
    directoryEl.classList.add('grid-view');
    members.forEach(m => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="images/${m.imageFileName}" alt="${m.name} logo">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <p><a href="${m.website}" target="_blank">${m.website.replace(/^https?:\/\//, '')}</a></p>
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
      if (i % 2 === 1) row.style.backgroundColor = 'var(--zebra-bg)';
      row.innerHTML = `
        <div>${m.name}</div>
        <div>${m.address}</div>
        <div>${m.phone}</div>
        <div><a href="${m.website}" target="_blank">${m.website.replace(/^https?:\/\//, '')}</a></div>
      `;
      directoryEl.appendChild(row);
    });
  }

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

  renderGrid();
});
