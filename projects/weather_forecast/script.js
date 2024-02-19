let searchForm = document.querySelector(".weather-search");
let searchInput = document.querySelector(".search");
let emptySearch = document.querySelector(".empty-search-text");
let statusDiv = document.querySelector(".status-div");
let firstContainer = document.querySelector(".first-container");
let resultContainer = document.querySelector(".result-container");
const apiKey = "db499ac39e76a04aacc125fd196e09be";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

searchInput.addEventListener("input", emptyValidation);
function emptyValidation() {
  if (searchInput.value.length === 0) {
    emptySearch.style.height = "auto";
  } else {
    emptySearch.style.height = "0px";
  }
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (searchInput.value.length > 0) {
    statusDiv.innerHTML = "Getting weather details....";
    statusDiv.classList.add("status-pending");
    statusDiv.classList.remove("status-error");
    fetch(`${apiURL}&q=${searchInput.value}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          statusDiv.innerHTML = `${searchInput.value} isn't a valid city`;
          statusDiv.classList.remove("status-pending");
          statusDiv.classList.add("status-error");
        } else {
          let temp = Math.round(data.main.temp);
          let tempratue = `${temp}<span class="degree">°</span>C`;
          let weatherIcon = document.querySelector(".weather-icon");
          document.querySelector(".weather-type").innerHTML =
            data.weather[0].main;
          document.querySelector(".tempratue").innerHTML = tempratue;
          document.querySelector(".city-name-text").innerHTML = data.name;
          document.querySelector(".humidity-text").innerHTML =
            data.main.humidity + "%";
          document.querySelector(".wind-text").innerHTML =
            data.wind.speed + "Km/h";
          let id = data.weather[0].id;
          if (id == 800) {
            weatherIcon.src = "/Images/bright.png";
          } else if (id >= 200 && id <= 232) {
            weatherIcon.src = "/Images/dizzle.png";
          } else if (id >= 600 && id <= 622) {
            weatherIcon.src = "/Images/snow.png";
          } else if (id >= 701 && id <= 781) {
            weatherIcon.src = "/Images/mist.png";
          } else if (id >= 801 && id <= 804) {
            weatherIcon.src = "/Images/cloudy.png";
          } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            weatherIcon.src = "/Images/rain.png";
          }
          console.log(data.sys.country);
          showResult();
        }
      });
  } else {
    emptyValidation();
  }
});

function currentLocation() {
  if (navigator.geolocation) {
    statusDiv.innerHTML = "Getting weather details....";
    statusDiv.classList.add("status-pending");
    statusDiv.classList.remove("status-error");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
        fetch(`${apiURL}&lat=${currentLatitude}&lon=${currentLongitude}`)
          .then((response) => response.json())
          .then((data) => {
            let temp = Math.round(data.main.temp);
            let tempratue = `${temp}<span class="degree">°</span>C`;
            document.querySelector(".weather-type").innerHTML =
              data.weather[0].main;
            document.querySelector(".tempratue").innerHTML = tempratue;
            // document.querySelector(".city-name-text").innerHTML = data.name;
            document.querySelector(".city-name-text").innerHTML = info.name;
            document.querySelector(".humidity-text").innerHTML =
              data.main.humidity + "%";
            document.querySelector(".wind-text").innerHTML =
              data.wind.speed + "Km/h";
            showResult();
          });
      },
      (error) => {
        statusDiv.innerHTML = error.message;
        statusDiv.classList.add("status-error");
        statusDiv.classList.remove("status-pending");
      }
    );
  } else {
    alert("Your browser not support geolocation api");
  }
}

function showResult() {
  resultContainer.style.display = "block";
  firstContainer.style.display = "none";
}

function backToHome() {
  resultContainer.style.display = "none";
  firstContainer.style.display = "block";
  searchInput.value = "";
  statusDiv.style.display = "none";
}

// fetch(
//   `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=db499ac39e76a04aacc125fd196e09be&units=metric`
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error("error:", error));
