const myTown = document.querySelector('#town');
const myDecription = document.querySelector('#description');
const myTemperature = document.querySelector('temperature');
const myGraphic = document.querySelector('#graphic');

// TODO: Add your API key below
const myKey = "5140e54ec933ab3ca6ae2fe9a7227eaa"; 
const myLat = 48.2082;
const myLon = 16.3738;

const myUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`


async function apiFetch() {
  try {
    const response = await fetch(myUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      // displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayResults(data) {
  console.log("hello")
  myTown.innerHTML = data.name;
  myDecription.innerHTML = data.weather[0].description;
  myTemperature.innerHTML = Math.round(data.main.temp) + "°F";
  const iconsrc = "https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
  myGraphic.setAttribute("src", iconsrc);
  myGraphic.setAttribute("alt", data.weather[0].description);
}


apiFetch();