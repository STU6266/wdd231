// js/weather.mjs
const apiKey = '5140e54ec933ab3ca6ae2fe9a7227eaa';
const lat = 48.2082; // z.B. Wien
const lon = 16.3738;
const units = 'metric';
const lang = 'de';

// Selektoren
const townEl     = document.querySelector('#town');
const currentTempEl  = document.querySelector('#current-temp');
const currentDescEl  = document.querySelector('#current-desc');
const highTempEl     = document.querySelector('#high-temp');
const lowTempEl      = document.querySelector('#low-temp');
const humidityEl     = document.querySelector('#humidity');
const sunriseEl      = document.querySelector('#sunrise');
const sunsetEl       = document.querySelector('#sunset');
const iconEl         = document.querySelector('#weather-icon');
const forecastListEl = document.querySelector('#forecast-list');

async function loadWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}` +
                `&units=${units}&lang=${lang}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();

    // Ort
    townEl.textContent = data.timezone.split('/').pop().replace('_', ' ');

    // Aktuelles Wetter
    currentTempEl.textContent = `${Math.round(data.current.temp)}°C`;
    currentDescEl.textContent = data.current.weather[0].description;
    highTempEl.textContent    = `${Math.round(data.daily[0].temp.max)}°C`;
    lowTempEl.textContent     = `${Math.round(data.daily[0].temp.min)}°C`;
    humidityEl.textContent    = `${data.current.humidity}%`;

    // Sonnenauf- & untergang
    const toTime = ts => new Date(ts * 1000).toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'});
    sunriseEl.textContent = toTime(data.current.sunrise);
    sunsetEl.textContent  = toTime(data.current.sunset);

    // Icon
    const iconCode = data.current.weather[0].icon;
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.alt = data.current.weather[0].description;

    // Forecast für heute, morgen, übermorgen
    forecastListEl.innerHTML = data.daily.slice(0,3).map((day,i) => {
      const date = new Date(day.dt * 1000).toLocaleDateString('de-DE', {weekday:'long'});
      return `<li><strong>${date}:</strong> ${Math.round(day.temp.day)}°C</li>`;
    }).join('');

  } catch (err) {
    console.error('Fehler beim Laden des Wetters:', err);
    currentDescEl.textContent = 'Wetterdaten nicht verfügbar.';
    forecastListEl.innerHTML = '<li>Lädt nicht…</li>';
  }
}

document.addEventListener('DOMContentLoaded', loadWeather);
