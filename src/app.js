function displayTemperature(response) {
  console.log(response.data.main.temp);
}

let apiKey = "30c4c684c679265d7cee6b3521f0a4c2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
