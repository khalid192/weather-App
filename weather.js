let input = document.getElementById("search");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let precipitation = document.getElementById("precipitation");
let temp = document.getElementById("deg");
let local = document.getElementById("city");
let iconSrc = document.getElementById("iconeforecast");
let descrept = document.getElementById("descprition");
const apiKey = "3d4c2bf9a6c0fd81dde9d9f1c955e217";
let city = "agadir";

window.Fsearch = function () {
  city = input.value.trim();
  if (city === "") {
    input.placeholder = "Please enter a city name!";
  } else {
    input.placeholder = "Where do you want the weather ?";
  }
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  let url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      humidity.innerText = data.main.humidity;
      wind.innerText = (data.wind.speed * 3.6).toFixed(2);
      deg.innerText = (data.main.temp - 273.15).toFixed(0) + " °C";
      local.innerText = data.sys.country + "." + data.name;
      console.log(data.weather[0].icon);
      iconSrc.src = `./wethers_icone/${data.weather[0].icon}.png`;
      descrept.innerText = data.weather[0].description;
      if (data.rain) {
        precipitation.innerText = data.rain["1h"];
      } else {
        precipitation.innerText = "0";
      }

      if (humidity.textContent != "") {
        document.getElementById("Forecast").classList.remove("hide");
        document.getElementById("anim").classList.add("hide");
      }
    });
  fetch(url1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      for (i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.includes("12:00:00")) {

         let date = new Date(data.list[i].dt_txt);
          dayss = ["Sun", "Mon", "Tue", "Wed", "The", "Fri", "Sat"];
          let nameday = dayss[ date.getDay() ]
           
         
          document.getElementById("days").innerHTML+=`<div><h4>${nameday}</h4><img src=./wethers_icone/${data.list[i].weather[0].icon}.png> <p>${(data.list[i].main.temp - 273.15).toFixed(0) + " °C"}</p> </div>`;
        }
      }

      console.log(data);
    });

  input.value = "";
};
