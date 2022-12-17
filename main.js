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
  //   mapContainer.innerHTML = `
  //   <iframe
  //   width="400"
  //   height="400"
  //   style="border: 0"
  //   class="text-center"
  //   loading="lazy"
  //   allowfullscreen
  //   referrerpolicy="no-referrer-when-downgrade"
  //   src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCToTXSpA6hZX9-KoyQjpkGT2XbEhxBg6k&q=Aurangabad
  // &center=${position.coords.latitude},${position.coords.longitude}"
  // >
  // </iframe>`;
  Coordinates.innerHTML = `Latitude: ${position.coords.latitude} &nbsp;&nbsp; Longitude: ${position.coords.longitude}`;
  mapContainer.innerHTML = `
  <iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=75.32151460647584%2C19.845559172986448%2C75.34910917282106%2C19.859020879862367&amp;layer=mapnik&amp;marker=19.852290169168814%2C75.33531188964844" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=19.8523&amp;mlon=75.3353#map=16/${position.coords.latitude}/${position.coords.longitude}">View Larger Map</a></small>
`;
  const cord = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  fetchData(cord);
}
const fetchData = async ({ lat, lng }) => {
  //e.preventDefault();

  const accessKey = "WQGBZXUWWNHEU887XUKWXGWE7";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}?unitGroup=us&include=current&key=${accessKey}&contentType=json`;
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
          <h6 class="card-subtitle my-2">${data.address}</h6>
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
          <h6 class="card-subtitle my-2">${data.latitude}</h6>
        </div>
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Longitude :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.longitude}</h6>
        </div>
      </div>
      <div class="row  p-2">
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">WindSpeed :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.currentConditions.windspeed} Km/s</h6>
        </div>
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Preassure :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.currentConditions.pressure} Pa </h6>
        </div>
      </div>
      <div class="row  p-2">
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Humidity :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.currentConditions.humidity}</h6>
        </div>
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Wind Direction :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.currentConditions.winddir}</h6>
        </div>
      </div>
      <div class="row  p-2">
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">UV Index :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.currentConditions.uvindex}</h6>
        </div>
        <div class="col d-flex ">
          <h6 class="card-subtitle my-2 text-muted">Feels Like :</h6>
          &nbsp;
          <h6 class="card-subtitle my-2">${data.currentConditions.feelslike} °C</h6>
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
