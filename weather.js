const apiKey = "3d4c2bf9a6c0fd81dde9d9f1c955e217";

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=AGADIR&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });