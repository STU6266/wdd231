
export async function loadEvents() {
  const ul = document.getElementById('events-list');

  try {
    
    const response = await fetch('/api/events');
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const events = await response.json();

  
    ul.innerHTML = '';

   
    events.forEach(ev => {
      ul.insertAdjacentHTML('beforeend',
        `<li><strong>${ev.title}</strong><br>${ev.date}</li>`
      );
    });
  } catch (err) {
  
    ul.innerHTML = '<li>Mistake while Loarding.</li>';
    console.error('loadEvents error:', err);
  }
}
