window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimeZone = document.querySelector(".location-timezone");

  let temperatureSection = document.querySelector(".degree-section");
  const tempratureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "http://cors-anywhere.herokuapp.com/";
      const API = `${proxy}https://api.darksky.net/forecast/API_KEY/${lat},${long}`;

      fetch(API)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimeZone.textContent = data.timezone;
          // Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9);

          // Set Icon
          setIcons(icon, document.querySelector(".icon"));

          // Change temperature to Celsius/Fahrenheit
          temperatureSection.addEventListener("click", () => {
            if (tempratureSpan.textContent === "F") {
              tempratureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              tempratureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent = "Could not Access your Geolocation.";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
