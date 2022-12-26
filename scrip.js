const serach = document.getElementById("search");
const main = document.getElementById("main");
const box = document.getElementById("box");
const details = document.querySelectorAll(".detail");

console.log(details);

async function getApi(city) {
  try {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=20a01944eda34a13f4a4dcecfff77197";

    const response = await fetch(url);
    console.log(response);
    let data = await response.json();
    displayData(data);
  } catch (err) {
    if (err.response.status == 404) {
      creatErrorCard("No profile with this name");
    }
  }
}

serach.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    getApi(serach.value);
    serach.value = "";
  }
});

function displayData(data) {
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
    img = "rain.png";
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
    <h1>${msg}</h1>
  </div>
    `;
  box.innerHTML = cardHtml;
}
