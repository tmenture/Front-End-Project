var lat = "";
var lon = "";
var theDate = moment().format("YYYY-MM-DD");
console.log(theDate);
var moviesHolder = document.createElement("div");

function getUserLocation () {
    var userZipCode = document.getElementById("zip-code").value;
    console.log("log Begin");
    console.log(userZipCode);
    callApi(userZipCode);
    console.log("getWeather");
    getWeather(userZipCode);
    console.log("getMovie");
    getMovie(userZipCode);

};

$(document).on("click", "#btn-t", function (event) {

    
    getUserLocation();

});

var callApi = function (userZipCode) {

             fetch('https://app.ticketmaster.com/discovery/v2/events.json?postalCode=' + userZipCode + "&radius=50&unit=miles&apikey=u0qeyJGVcW318hNAeQdpuAQrDfoV5v5R")

                .then((response) => {

                    if (response.ok) {

                        return response.json();

                    } else {

                        throw new Error("Network Response Error");

                    }
                })

                .then(data => {

                console.log(data);

                displayData(data);

            })

            .catch((error) => console.error("Fetch Error:", error));

};

var displayData = function (data) {

    if (!data._embedded) {

        alert("No events near you, please try another zip code");

    } else {

        for (var i = 0; i < data._embedded.events.length; i++) {

            const eventEl = data._embedded.events[i];

            const eventElDiv = document.getElementById("fetch-container");

            const event = eventEl.name;

            const header = document.createElement("h1");

            header.innerHTML = event;

            eventElDiv.appendChild(header);
        };

    };

};

function getWeather(userZipCode) {
    let api = "https://api.openweathermap.org/data/2.5/weather?zip="+ userZipCode +",us&units=imperial&appid=3b91a5e54ccda9fd842e775f32c6e9ad"
    console.log(api)
     fetch(api)
    .then(function(response){
       return response.json()
   }).then(function(data){
       console.log(data);
     displayWeather(data);
  }).catch(function(error){
      console.log(error)
    })
};

function displayWeather (data) {
    lat = parseFloat(data.coord.lat);
    lon = parseFloat(data.coord.lon);
    console.log(lat)
    console.log(lon)
    var dataHolder = document.createElement("div");
    document.querySelector(".weather").appendChild(dataHolder)
    var weatherImage = document.createElement("img");
    var icon = data.weather[0].icon;
    weatherImage.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
    dataHolder.appendChild(weatherImage);
    var temp = document.createElement("p");
    temp.textContent = ("Temperature " + data.main.temp + " °F");
    dataHolder.appendChild(temp);
    var humidity = document.createElement("p");
    humidity.textContent = ("Humidity " + data.main.humidity + "%");
    dataHolder.appendChild(humidity);
    var windSpeed = document.createElement("p");
    windSpeed.textContent = ("Wind Speed " + data.wind.speed + "MPH");
    dataHolder.appendChild(windSpeed);
    findPlaces(lat, lon)
};

function findPlaces(lat, lon) {
 let api = "https://api.tomtom.com/search/2/categorySearch/restaurant.json?limit=15&lat=" + lat + "&lon=" + lon + " &radius=1500&categorySet=7315&view=Unified&relatedPois=off&key=PzjekmmRa9kSFSHBIrAeRKeseuZATku4"
  fetch(api)
  .then(function(response){
     return response.json()
 }).then(function(data){
     console.log(data);
     displayPlaces(data);
}).catch(function(error){
   console.log(error)
 })
};

function displayPlaces (data) {
    var placesHolder = document.createElement("div");
    document.querySelector(".restaurants").appendChild(placesHolder);
    for ( i = 0; i < data.results.length; i++) {
        var name = document.createElement("p");
        name.textContent = data.results[i].poi.name
        placesHolder.appendChild(name);
        var address = document.createElement("p");
        address.textContent = data.results[i].address.freeformAddress
        placesHolder.appendChild(address);
    }
};

function getMovie(userZipCode) {
    let api = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" +theDate+ "&zip="+ userZipCode +"&radius=15&api_key=r7ygr6gd9bm5gbhycd4acqyw"
    fetch(api)
    .then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data);
        displayMovies(data);
   }).catch(function(error){
      console.log(error)
    })
};

function displayMovies (data) {
    document.querySelector(".movie").appendChild(moviesHolder);
    moviesHolder.classList.add("row")
    for (var i = 0; i < data.length; i++) {
        var movie = document.createElement("p");
        movie.textContent = data[i].title
        moviesHolder.appendChild(movie);
       var showTimesArr = data[i].showtimes
      displayTimes(showTimesArr)
    }
};

function displayTimes (showTimesArr){
   for (var i=0; i<showTimesArr.length; i++) {
      var time = moment(showTimesArr[i].dateTime).format("LT")
      var showTime = document.createElement("p");
      showTime.textContent = time;
     // showTime.textContent = time + " " + showTimesArr[i].theatre.name;
      moviesHolder.appendChild(showTime);
    };
}

function getRecipe() {
    let api = "https://www.themealdb.com/api/json/v1/1/random.php"
     fetch(api)
     .then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data);
        displayRecipe(data);
   }).catch(function(error){
      console.log(error)
    })
};

function displayRecipe(data) {
    var recipeHolder = document.createElement("div");
    document.querySelector(".restaurants").appendChild(recipeHolder);
    var name = document.createElement("p");
    name.textContent = data.meals[0].strMeal;
    recipeHolder.appendChild(name);
    var image = document.createElement("img");
    image.setAttribute("src", data.meals[0].strMealThumb);
    recipeHolder.appendChild(image);
    var link = document.createElement("a");
    link.textContent = data.meals[0].strSource;
    link.setAttribute("href", data.meals[0].strSource);
    recipeHolder.appendChild(link);
};
