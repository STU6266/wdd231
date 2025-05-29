import { loadEvents }           from './events.mjs';
import { loadCurrentWeather }   from './weather.mjs';
import { loadForecast }         from './forecast.mjs';
import { loadSpotlights }       from './members.mjs';

document.addEventListener('DOMContentLoaded', async () => {

 
  loadEvents();
  loadCurrentWeather();
  loadForecast();
  loadSpotlights();


  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }


  const yearEl = document.getElementById('currentYear');
  const modifiedEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
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


  const timestampEl = document.getElementById("timestamp");
  if (timestampEl) {
    const now = new Date().toISOString();
    timestampEl.value = now;
  }


  document.querySelectorAll(".card").forEach((card, i) => {
    card.style.opacity = 0;
    setTimeout(() => {
      card.style.transition = "opacity 0.8s ease-in-out";
      card.style.opacity = 1;
    }, i * 200);
  });

 
  const params = new URLSearchParams(window.location.search);
  const fieldIds = ["fname", "lname", "email", "phone", "organization", "timestamp"];
  fieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = params.get(id) || "–";
  });

  const visitMessage = document.getElementById('visit-message');
if (visitMessage) {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - Number(lastVisit)) / MILLISECONDS_PER_DAY);
    if (days < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      visitMessage.textContent = `You last visited ${days} day${days === 1 ? '' : 's'} ago.`;
    }
  }

  localStorage.setItem('lastVisit', now);
}

const discoverSection = document.getElementById('discover-cards');
if (discoverSection) {
  fetch('data/discover.json')
    .then(response => response.json())
    .then(data => {
      discoverSection.innerHTML = data.map(item => `
        <article class="discover-card">
          <h2>${item.title}</h2>
          <figure>
            <img src="${item.image}" alt="${item.title}">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        </article>
      `).join('');
    });
}

});
