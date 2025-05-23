export async function loadEvents() {
  const ul = document.getElementById('events-list');
  try {
    const res = await fetch('data/events.json');
    if (!res.ok) throw new Error(res.status);
    const { events } = await res.json();
    ul.innerHTML = events
      .map(ev =>
        `<li><strong>${ev.name}</strong><br>${new Date(ev.date).toLocaleDateString()} @ ${ev.location}</li>`
      )
      .join('');
  } catch {
    ul.innerHTML = '<li>Failed to load events.</li>';
  }
}
