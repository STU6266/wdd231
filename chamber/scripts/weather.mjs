export async function loadWeather() {
  const apiKey = 'DEIN_API_KEY';
  const lat = 48.2082, lon = 16.3738;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}` +
              `&units=metric&lang=en&exclude=minutely,hourly,alerts&appid=${apiKey}`;
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

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();

    townEl.textContent       = data.timezone.split('/').pop().replace('_',' ');
    currentTempEl.textContent= `${Math.round(data.current.temp)}°C`;
    currentDescEl.textContent= data.current.weather[0].description;
    highTempEl.textContent   = `${Math.round(data.daily[0].temp.max)}°C`;
    lowTempEl.textContent    = `${Math.round(data.daily[0].temp.min)}°C`;
    humidityEl.textContent   = `${data.current.humidity}%`;
    const toTime = ts => new Date(ts*1000).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
    sunriseEl.textContent    = toTime(data.current.sunrise);
    sunsetEl.textContent     = toTime(data.current.sunset);
    const iconCode = data.current.weather[0].icon;
    iconEl.src               = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.alt               = data.current.weather[0].description;

    forecastListEl.innerHTML = data.daily.slice(0,3).map(day => {
      const weekday = new Date(day.dt*1000).toLocaleDateString('en-US',{weekday:'long'});
      return `<li><strong>${weekday}:</strong> ${Math.round(day.temp.day)}°C</li>`;
    }).join('');
  } catch {
    currentDescEl.textContent  = 'Weather unavailable';
    forecastListEl.innerHTML   = '<li>Unable to load forecast.</li>';
  }
}
