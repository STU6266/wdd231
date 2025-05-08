
const yearEl     = document.getElementById('currentYear');
const modifiedEl = document.getElementById('lastModified');

yearEl.textContent     = new Date().getFullYear();
modifiedEl.textContent = `Last Update: ${document.lastModified}`;
