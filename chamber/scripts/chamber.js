

import { loadEvents }           from './events.mjs';
import { loadCurrentWeather }   from './weather.mjs';
import { loadForecast }         from './forecast.mjs';
import { loadSpotlights }       from './members.mjs';

document.addEventListener('DOMContentLoaded', async () => {

  loadEvents();
  loadCurrentWeather();
  loadForecast();
  loadSpotlights();

 
  const yearEl     = document.getElementById('currentYear');
  const modifiedEl = document.getElementById('lastModified');
  if (yearEl)     yearEl.textContent     = new Date().getFullYear();
  if (modifiedEl) modifiedEl.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleDateString()}`;

  const directoryEl = document.getElementById('directory');
  let membersData = [];
  try {
    const resp = await fetch('data/members.json');
    if (!resp.ok) throw new Error(resp.status);
    membersData = await resp.json();
  } catch (e) {
    console.error('Error loading directory data:', e);
    if (directoryEl) directoryEl.innerHTML = '<p>Error loading directory.</p>';
    return;
  }

  function renderGrid() {
    if (!directoryEl) return;
    directoryEl.classList.add('grid');
    directoryEl.classList.remove('list');
    directoryEl.innerHTML = membersData.map(m => `
      <div class="member-card">
        <img src="${m.logo}" alt="${m.name} Logo">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <p><a href="${m.website}" target="_blank">${m.website}</a></p>
      </div>
    `).join('');
  }

  function renderList() {
    if (!directoryEl) return;
    directoryEl.classList.add('list');
    directoryEl.classList.remove('grid');
    directoryEl.innerHTML = membersData.map(m => `
      <div class="member-list-item">
        <h3>${m.name}</h3>
        <p>${m.address} | ${m.phone} | <a href="${m.website}" target="_blank">${m.website}</a></p>
      </div>
    `).join('');
  }

  const gridBtn = document.getElementById('grid-btn');
  const listBtn = document.getElementById('list-btn');
  if (gridBtn) gridBtn.addEventListener('click',  renderGrid);
  if (listBtn) listBtn.addEventListener('click',  renderList);

 
  renderGrid();

 
  const joinBtn = document.getElementById('join-btn');
  const modal   = document.getElementById('join-modal');
  const closeBtn= document.getElementById('close-btn');

  if (joinBtn && modal && closeBtn) {
    joinBtn.addEventListener('click',  () => modal.style.display = 'block');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
});
