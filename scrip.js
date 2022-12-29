const serach = document.getElementById("search");
const main = document.getElementById("main");
const box = document.getElementById("box");
const cityName = document.getElementById("city-name");
const details = document.querySelectorAll(".detail");

if (localStorage.getItem("city")) {
  let city = localStorage.getItem("city");
  getApi(city);
}

async function getApi(city) {
  try {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=20a01944eda34a13f4a4dcecfff77197";

    const response = await fetch(url);
    console.log(response);
    let data = await response.json();
    localStorage.setItem("city", city);
    console.log(data);
    displayData(data);
  } catch (err) {
    console.log("no such city");
    cityName.innerHTML = "No such city";
    creatErrorCard("No city of this name sorry try again.");
  }
}

serach.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    getApi(serach.value);
    serach.value = "";
  }
});

function displayData(data) {
  cityName.innerHTML = `${data["name"]} weather`;
  let temp = Math.floor(data["main"]["temp"] - 273.15);
  let weather = data["weather"][0]["main"];
  let img = "weather.png";
  if (weather == "Clouds") {
    img = "cloudy1.PNG";
  } else if (weather == "Mist" || weather == "Haze") {
    img = "mist.png";
  } else if (weather == "Clear" || weather == "Sunny") {
    img = "sunny1.png";
  } else if (weather == "Rain") {
    img = "rain.PNG";
  } else if (weather == "Snow") {
    img = "cold.png";
  } else if (weather == "Clouds" && temp < 5) {
    img = "cloudcold.png";
  }
  box.innerHTML = "";

  box.innerHTML = `
  <div class="data" id="hum">
  <img class="hum-img" src="hum.png" alt="" />
  <h2 class="h2">Humidity</h2>
  <h3 class="detail">${Math.floor(data["main"]["humidity"])}%</h3>
  </div>
  <div class="data" id="pres">
  <img class="pre-img" src="press.png" alt="" />
  <h2 class="h2">Pressure</h2>
  <h3 class="detail">${Math.floor(data["main"]["pressure"])}</h3>
  </div>
  <div class="data" id="temp">
  <img class="tem-img" src="temp.png" alt="" />
  <h2 class="h2">Tempherature</h2>
  <h3 class="detail">${temp} °C</h3>
  </div>
  <div class="data" id="weather">
  <img class="wea-img" src="${img}" alt="" />
  <h2 class="h2">weather</h2>
  <h3 class="detail">${data["weather"][0]["main"]}</h3>
  </div>
  <div class="data" id="des">
  <img class="des-img" src="${img}" alt="" />
  <h2 class="h2">Description</h2>
  <h3 class="detail">${data["weather"][0]["description"]}</h3>
  </div>
  `;
  console.log(box);
}

function creatErrorCard(msg) {
  const cardHtml = `
    <div class="card">
    <h1 class="card-msg">${msg}</h1>
  </div>
    `;
  box.innerHTML = cardHtml;
}

function checkCity() {
  if (localStorage.getItem("city")) {
    serach.value = localStorage.getItem("city");
    getApi(serach.value);
  }
}
