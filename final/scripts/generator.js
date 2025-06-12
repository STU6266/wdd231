document.addEventListener('DOMContentLoaded', () => {
  // Dark-Mode
  document.querySelector('.mode-toggle')
    ?.addEventListener('click', () => document.body.classList.toggle('dark'));

  // Hamburger-Menu
  const mt = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav ul');
  if (mt && nav) mt.addEventListener('click', () => nav.classList.toggle('open'));

  // Footer-Datum
  document.getElementById('currentYear')
    .textContent = new Date().getFullYear();
  document.getElementById('lastModified')
    .textContent = `Last Modified: ${document.lastModified}`;
});