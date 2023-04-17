document.addEventListener("DOMContentLoaded", () => {
  const apikey = `a447e0a29c2d4f08810160133230803`;
  const form = document.getElementById("form");
  const search = document.getElementById("search");
  const main = document.getElementById("main");

  const url = (city) =>
    `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`;
  let weatherdata;

  async function fetchWeatherData(city) {
    try {
      const response = await fetch(url(city));
      const data = await response.json();
      weatherdata = data;
      loadWeatherInfo(weatherdata);
    } catch (err) {
      console.error(err);
    }
  }

  function loadWeatherInfo(data) {
    let div = document.createElement("div");
    div.classList.add("weather");
    div.innerHTML = `
            <h2 class="city">
                ${data.location.name} 
                <img src=${data.current.condition.icon} />
            </h2>
            <p>${data.location.localtime}</p>
            <small>
                ${data.current.condition.text}
                <h4>${data.current.temp_c}°</h4>
            </small>
            
        `;
    main.innerHTML = "";
    main.appendChild(div);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
      fetchWeatherData(city);
    }
  });
});
