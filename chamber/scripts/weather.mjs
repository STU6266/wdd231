// scripts/weather.mjs

// 1) Elemente selektieren
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#caption-desc');

// 2) API-URL zusammenbauen
const apiKey = '5140e54ec933ab3ca6ae2fe9a7227eaa';
const lat    = 48.2082;
const lon    = 16.3738;
const url    = `https://api.openweathermap.org/data/2.5/weather`
             + `?lat=${lat}&lon=${lon}`
             + `&units=metric`
             + `&lang=de`
             + `&appid=${apiKey}`;

// 3) Die Funktion, die wir exportieren
export async function loadCurrentWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw Error(await response.text());
    const data = await response.json();

    // Temperatur eintragen
    currentTemp.innerHTML = `${Math.round(data.main.temp)} °C`;

    // Icon-URL und alt-Text setzen
    const iconCode = data.weather[0].icon;
    const iconUrl  = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', data.weather[0].description);

    // Beschreibung
    captionDesc.textContent = data.weather[0].description;

  } catch (error) {
    console.error('loadCurrentWeather() error:', error);
    captionDesc.textContent = 'Wetterdaten konnten nicht geladen werden.';
  }
}
