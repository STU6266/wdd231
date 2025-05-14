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
