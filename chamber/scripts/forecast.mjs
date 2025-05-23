
const apiKey = '5140e54ec933ab3ca6ae2fe9a7227eaa';
const lat    = 48.2082;     
const lon    = 16.3738;     
const units  = 'metric';
const lang   = 'en';

const forecastEl = document.querySelector('#forecast-list');

export async function loadForecast() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast`
              + `?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`
              + `&appid=${apiKey}`;
    const res  = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();

    const todayKey = new Date().toLocaleDateString(lang);
    const tempsByDate = {};
    data.list.forEach(item => {
      const d = new Date(item.dt * 1000);
      const key = d.toLocaleDateString(lang);
      if (!tempsByDate[key]) {
        tempsByDate[key] = item.main.temp;
      }
    });


    const futureDates = Object.keys(tempsByDate)
      .filter(d => d !== todayKey)
      .slice(0, 3);

  
    forecastEl.innerHTML = futureDates.map(dateStr => {
      const d = new Date(dateStr);
      const weekday = d.toLocaleDateString(lang, { weekday: 'long' });
      const temp    = Math.round(tempsByDate[dateStr]);
      return `<li><strong>${weekday}:</strong> ${temp}°C</li>`;
    }).join('');
  } catch (err) {
    console.error('Forecast load error:', err);
    forecastEl.innerHTML = '<li>Unable to load forecast.</li>';
  }
}
