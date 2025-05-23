
const apiKey = '5140e54ec933ab3ca6ae2fe9a7227eaa';
const lat = 48.2082;    
const lon = 16.3738;
const units = 'metric';
const lang = 'en';


const townEl = document.querySelector('#town');
const tempEl = document.querySelector('#current-temp');
const descEl = document.querySelector('#current-desc');
const highEl = document.querySelector('#high-temp');
const lowEl = document.querySelector('#low-temp');
const humidityEl = document.querySelector('#humidity');
const sunriseEl = document.querySelector('#sunrise');
const sunsetEl = document.querySelector('#sunset');
const iconEl  = document.querySelector('#weather-icon');


const forecastEl   = document.querySelector('#forecast-list');

export async function loadCurrentWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather` +
                `?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    townEl.textContent     = `${data.name}, ${data.sys.country}`;
    tempEl.textContent     = `${Math.round(data.main.temp)}°C`;
    descEl.textContent     = data.weather[0].description;
    highEl.textContent     = `${Math.round(data.main.temp_max)}°C`;
    lowEl.textContent      = `${Math.round(data.main.temp_min)}°C`;
    humidityEl.textContent = `${data.main.humidity}%`;
    sunriseEl.textContent  = new Date(data.sys.sunrise * 1000)
                                .toLocaleTimeString(lang, {hour:'2-digit',minute:'2-digit'});
    sunsetEl.textContent   = new Date(data.sys.sunset * 1000)
                                .toLocaleTimeString(lang, {hour:'2-digit',minute:'2-digit'});
    const iconCode         = data.weather[0].icon;
    iconEl.src             = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.alt             = data.weather[0].description;
  } catch (e) {
    console.error('Current weather load error:', e);
    descEl.textContent = 'Weather unavailable';
  }
}

export async function loadForecast() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall` +
                `?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}` +
                `&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();


    const days = data.daily.slice(0, 3);
    forecastEl.innerHTML = days.map(day => {
      const weekday = new Date(day.dt * 1000)
                        .toLocaleDateString(lang, { weekday: 'long' });
      return `<li><strong>${weekday}:</strong> ${Math.round(day.temp.day)}°C</li>`;
    }).join('');
  } catch (e) {
    console.error('Forecast load error:', e);
    forecastEl.innerHTML = '<li>Unable to load forecast.</li>';
  }
}

