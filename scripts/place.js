
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;


const lastModifiedDate = document.lastModified;
document.getElementById("lastModified").textContent = "Last Modified: " + lastModifiedDate;


function calculateWindChill(tempC, speedKmh) {
  
  if (tempC <= 10 && speedKmh >= 4.8) {
    
    let windChill =
      13.12 +
      0.6215 * tempC -
      11.37 * Math.pow(speedKmh, 0.16) +
      0.3965 * tempC * Math.pow(speedKmh, 0.16);

    
    return windChill.toFixed(1);
  } else {
    
    return "N/A";
  }
}


const tempValue = parseFloat(document.getElementById("tempValue").textContent);
const windValue = parseFloat(document.getElementById("windValue").textContent);


const chill = calculateWindChill(tempValue, windValue);


document.getElementById("chillValue").textContent = chill;
