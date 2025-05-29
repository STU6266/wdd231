import { loadEvents }           from './events.mjs';
import { loadCurrentWeather }   from './weather.mjs';
import { loadForecast }         from './forecast.mjs';
import { loadSpotlights }       from './members.mjs';

document.addEventListener('DOMContentLoaded', async () => {

  // Lade Module für die Startseite
  loadEvents();
  loadCurrentWeather();
  loadForecast();
  loadSpotlights();

  // Mobile Menü-Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Datum + Last Modified in Footer
  const yearEl = document.getElementById('currentYear');
  const modifiedEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modifiedEl) modifiedEl.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleDateString()}`;

  // Directory-Ansicht (Grid vs List)
  const directoryEl = document.getElementById('directory');
  let membersData = [];
  try {
    const resp = await fetch('data/members.json');
    if (!resp.ok) throw new Error(resp.status);
    membersData = await resp.json();
  } catch (e) {
    console.error('Error loading directory data:', e);
    if (directoryEl) directoryEl.innerHTML = '<p>Error loading directory.</p>';
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
  if (gridBtn) gridBtn.addEventListener('click', renderGrid);
  if (listBtn) listBtn.addEventListener('click', renderList);

  if (directoryEl) renderGrid();

  // Modal öffnen/schließen (optional falls verwendet)
  const joinBtn = document.getElementById('join-btn');
  const modal = document.getElementById('join-modal');
  const closeBtn = document.getElementById('close-btn');
  if (joinBtn && modal && closeBtn) {
    joinBtn.addEventListener('click', () => modal.style.display = 'block');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // Timestamp-Feld setzen (join.html)
  const timestampEl = document.getElementById("timestamp");
  if (timestampEl) {
    const now = new Date().toISOString();
    timestampEl.value = now;
  }

  // Animation der Karten bei Seitenstart (join.html)
  document.querySelectorAll(".card").forEach((card, i) => {
    card.style.opacity = 0;
    setTimeout(() => {
      card.style.transition = "opacity 0.8s ease-in-out";
      card.style.opacity = 1;
    }, i * 200);
  });

  // Anzeige der URL-Parameter (thankyou.html)
  const params = new URLSearchParams(window.location.search);
  const fieldIds = ["fname", "lname", "email", "phone", "organization", "timestamp"];
  fieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = params.get(id) || "–";
  });
});
