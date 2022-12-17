const displayContainer = document.getElementById("weatherData");
const locField = document.getElementById("locate");
const accessField = document.getElementById("accessKey");
const mapContainer = document.getElementById("map");
const Coordinates = document.getElementById("data");
let cords = {};
async function getLocation(e) {
  e.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    displayContainer.innerHTML =
      "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  Coordinates.innerHTML = `Latitude: ${position.coords.latitude} &nbsp;&nbsp; Longitude: ${position.coords.longitude}`;
  mapContainer.innerHTML = `
  <iframe width="720" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=75.32151460647584%2C19.845559172986448%2C75.34910917282106%2C19.859020879862367&amp;layer=mapnik&amp;marker=19.852290169168814%2C75.33531188964844" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=19.8523&amp;mlon=75.3353#map=16/${position.coords.latitude}/${position.coords.longitude}">View Larger Map</a></small>
`;
  const cord = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  fetchData(cord);
}
const fetchData = async ({ lat, lng }) => {
  //e.preventDefault();
  const accessKey = "3c0d5d1133bb95e52877861f5f43c96c";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${accessKey}`;
  let response = "";
  try {
    response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    displayContainer.innerHTML = `
    <h1 class="card-title ">Weather Data</h1>
    <div class="container p-0" >
      <div class="row  p-2">
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Location :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.name}</h6>
        </div>
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">TimeZone :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.timezone}</h6>
        </div>
      </div>
      <div class="row  p-2">
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Latitude :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.coord.lat}</h6>
        </div>
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Longitude :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.coord.lon}</h6>
        </div>
      </div>
      <div class="row  p-2">
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">WindSpeed :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.wind.speed} Km/s</h6>
        </div>
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Preassure :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.main.pressure} Pa </h6>
        </div>
      </div>
      <div class="row  p-2">
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Humidity :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.main.humidity}</h6>
        </div>
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Wind Direction :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.wind.deg}</h6>
        </div>
      </div>
      <div class="row  p-2">
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">UV Index :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.wind.gust}</h6>
        </div>
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Feels Like :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.main.feels_like} °C</h6>
        </div>
      </div>
    </div>
    `;
  } catch (err) {
    if (!response.ok) {
      displayContainer.innerHTML = `
      <div class="container ">
      <h4 class="card-title  text-danger">No Result Found</h4>
      <span class="text-warning">${err}</span>
      </div>
      `;
      console.log("data", data);
      return false;
    }
  }
};
