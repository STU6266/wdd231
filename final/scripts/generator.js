document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('.mode-toggle')
    ?.addEventListener('click', () => document.body.classList.toggle('dark'));

  const mt = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav ul');
  if (mt && nav) mt.addEventListener('click', () => nav.classList.toggle('open'));

  document.getElementById('currentYear')
    .textContent = new Date().getFullYear();
  document.getElementById('lastModified')
    .textContent = `Last Modified: ${document.lastModified}`;
});