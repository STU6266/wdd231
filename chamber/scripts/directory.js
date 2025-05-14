const yearEl     = document.getElementById('currentYear');
const modifiedEl = document.getElementById('lastModified');

yearEl.textContent     = new Date().getFullYear();
modifiedEl.textContent = `Last Update: ${document.lastModified}`;




const url = "data/members.json";
const membersContainer = document.querySelector("#members");

// 1) Asynchrone Funktion definieren
async function loadMembers() {
  try {
    // 2) Daten holen
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP-Fehler: ${response.status}`);
    const data = await response.json();

    // 3) Daten verarbeiten und ins DOM einfügen
    data.forEach(member => {
      // Karte erstellen
      const card = document.createElement("div");
      card.classList.add("member-card");

      // Inneres der Karte aufbauen (HTML-Template)
      card.innerHTML = `
        <img src="images/${member.imageFileName}" alt="${member.name}" class="member-img">
        <h2 class="member-name">${member.name}</h2>
        <p class="member-address">${member.address}</p>
        <p class="member-phone">☎️ ${member.phone}</p>
        <p class="member-website">
          🌐 <a href="${member.website}" target="_blank">${member.website}</a>
        </p>
      `;

      // Karte anhängen
      membersContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Fehler beim Laden der Member:", err);
    membersContainer.innerHTML = "<p>Sorry, die Member-Daten konnten nicht geladen werden.</p>";
  }
}

// 4) Funktion nach dem Laden der Seite aufrufen
document.addEventListener("DOMContentLoaded", loadMembers);



const btn  = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
btn.addEventListener('click', () => menu.classList.toggle('open'));

// ——— view toggle for #members ———
const membersEl = document.getElementById('members');
const listBtn    = document.getElementById('listViewBtn');
const gridBtn    = document.getElementById('gridViewBtn');

function setView(view) {
  // swap the classes
  membersEl.classList.remove('members-grid','members-list');
  membersEl.classList.add(view === 'grid' ? 'members-grid' : 'members-list');

  // update aria-pressed
  listBtn .setAttribute('aria-pressed', view === 'list');
  gridBtn .setAttribute('aria-pressed', view === 'grid');
}

listBtn.addEventListener('click', () => setView('list'));
gridBtn.addEventListener('click', () => setView('grid'));