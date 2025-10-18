let input = document.getElementById("search");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let precipitation = document.getElementById("precipitation");
let temp = document.getElementById("deg");
let local = document.getElementById("city");
let iconSrc = document.getElementById("iconeforecast");
let descrept = document.getElementById("descprition");
const apiKey = "3d4c2bf9a6c0fd81dde9d9f1c955e217";

window.Fsearch = function () {
  city = input.value.trim();

  if (city === "") {
    input.placeholder = "Please enter a city name!";
    document.getElementById("Forecast").innerHTML = ""

  } else {
    input.placeholder = "Where do you want the weather ?";
    document.getElementById("Forecast").classList.remove("hide");
    document.getElementById("anim").classList.add("hide");
  }
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  let url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
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
    });
  fetch(url1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.cod == 404) {
         input.placeholder = "Error: This location is not defined. Please enter a city name !!";
        document.getElementById("Forecast").classList.add("hide");
        document.getElementById("anim").classList.remove("hide");
        function changeAnimation(path) {
          // مسح الأنيميشن القديم
          animation.destroy();

          // إنشاء أنيميشن جديد بالمسار الجديد
          animation = lottie.loadAnimation({
            container: document.getElementById("anim"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: path,
          });
        }
        changeAnimation("wethers_icone/Error 404_ Page Not Found.json");
      }

      document.getElementById("days").innerHTML = "";
      for (i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.includes("12:00:00")) {
          let date = new Date(data.list[i].dt_txt);
          dayss = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          let nameday = dayss[date.getDay()];

          document.getElementById(
            "days"
          ).innerHTML += `<div><h4>${nameday}</h4><img src=./wethers_icone/${
            data.list[i].weather[0].icon
          }.png> <p>${
            (data.list[i].main.temp - 273.15).toFixed(0) + " °C"
          }</p> </div>`;
        }
      }
    });

  input.value = "";
};
setInterval(() => {
  let now = new Date();

  let h = String(now.getHours()).padStart(2, '0');
  let m = String(now.getMinutes()).padStart(2, '0');
  let s = String(now.getSeconds()).padStart(2, '0');

  let month = String(now.getMonth() + 1).padStart(2, '0'); // +1 لأن الشهور تبدأ من 0
  let day = String(now.getDate()).padStart(2, '0'); // اليوم من الشهر

  document.getElementById("time").innerHTML = `Time : ${h}:${m}:${s}`;
  document.getElementById("timeday").innerHTML = `${day}/${month}`;
}, 1000);