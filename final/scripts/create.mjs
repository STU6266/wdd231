(async () => {
  const wallpapers = await (await fetch('data/wallpapers.json')).json();
  const select  = document.getElementById('wallpaper-select');
  const gallery = document.getElementById('wallpaper-gallery');

  wallpapers.forEach(wp => {
    const opt = document.createElement('option');
    opt.value = wp.path; opt.textContent = wp.alt||wp.filename;
    select.appendChild(opt);

    const img = document.createElement('img');
    img.src = wp.path; img.alt = wp.alt||wp.filename;
    img.loading = 'lazy'; img.classList.add('wallpaper-thumb');
    img.addEventListener('click', ()=> select.value = wp.path);
    gallery.appendChild(img);
  });

  document.getElementById('preview-btn')
    .addEventListener('click', ()=>{/* Vorschau wie gehabt */});
  document.getElementById('create-form')
    .addEventListener('submit', e=>{/* Modal + localStorage wie gehabt */});
})();
