export async function loadSpotlights() {
  const container = document.querySelector('.spotlight-cards');
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error(res.status);
    const members = await res.json();
    const eligible = members.filter(m => m.membershipLevel >= 2);
    const selection = eligible.sort(() => 0.5 - Math.random()).slice(0,3);

    container.innerHTML = '';
    selection.forEach(m => {
      container.innerHTML += `
        <div class="spotlight-card">
          <img src="images/${m.imageFileName}" alt="${m.name} logo">
          <h3>${m.name}</h3>
          <p>${m.address}</p>
          <p>${m.phone}</p>
          <p><a href="${m.website}" target="_blank">${m.website}</a></p>
          <p>${m.membershipLevel===3?'Gold':'Silver'}</p>
        </div>`;
    });
  } catch {
    container.innerHTML = '<p>Cannot load spotlights.</p>';
  }
}
