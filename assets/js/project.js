var lat = "";
var lon = "";
var theDate = moment().format("YYYY-MM-DD");  
console.log(theDate);
var moviesHolder = document.createElement("div");

function getUserLocation () { // Function that grabs user inputted zip-code, and inserts it into the API calls to get event suggestions for the user
    var userZipCode = document.getElementById("zip-code").value;
    
    callApi(userZipCode);
    
    getWeather(userZipCode);
    
    getMovie(userZipCode);

}

<<<<<<< HEAD
$(document).on("click", "#btn-t", function (event) {
    document.querySelector(".title-1").classList.remove("is-hidden")
    document.querySelector(".title-2").classList.remove("is-hidden")
    document.querySelector(".title-3").classList.remove("is-hidden")
=======
$(document).on("click", "#btn-t", function (event) {  // The listener attached to the night out button

>>>>>>> 9b7287e3da4f073cb1e22c97767878898c281b16
    getUserLocation();

});

<<<<<<< HEAD
$(document).on("click", "#btn-i", function (event) {
    getRecipe();
});


var callApi = function (userZipCode) {
=======
var callApi = function (userZipCode) {  // The call API function that pulls the data from TicketMaster's API
>>>>>>> 9b7287e3da4f073cb1e22c97767878898c281b16

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

var displayData = function (data) { // The function that displays event information from TicketMaster's API when user choses to plan a night out 

    if (!data._embedded) {
        var noEvent = document.createElement("p");
        noEvent.textContent = ("No events near you, please try another zip code");
        document.getElementById("fetch-container").appendChild(noEvent);

        //alert("No events near you, please try another zip code");

    } else {

        for (var i = 0; i < data._embedded.events.length; i++) {

            const eventEl = data._embedded.events[i];

            const eventElDiv = document.getElementById("fetch-container");
            eventElDiv.classList.add("box");

            const event1 = eventEl.name;

            const header = document.createElement("h1");
            header.classList.add("title");
            header.classList.add("is-5");

            const eventUrl = eventEl.url;

            const urlContainer = document.createElement("a");
            urlContainer.classList.add("box");
            urlContainer.classList.add("has-background-light");
            urlContainer.classList.add("has-text-link");
            urlContainer.id = "event-link";

            urlContainer.innerHTML = eventUrl;

            header.innerHTML = event1;

            // Need to fix this to load links in new tab, issue is it keeps loading the same link no matter which one is clicked
            // 
            // $(document).on("click", "#event-link", function(event) { 
            //     window.open(urlContainer.text);
            // });
                
            eventElDiv.appendChild(header);

            eventElDiv.appendChild(urlContainer);
            
        };

    };
};

function getWeather(userZipCode) {  // This pulls the weather information of the day a user decides they want to plan a night out
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

function displayWeather (data) {  // Displays the weather of the day a user plans a night out
    lat = parseFloat(data.coord.lat);
    lon = parseFloat(data.coord.lon);
    console.log(lat)
    console.log(lon)
    var dataHolder = document.createElement("div");
    document.querySelector(".weather").appendChild(dataHolder)
    var title = document.createElement("h4");
    title.classList.add("is-size-4")
    title.classList.add("has-text-weight-bold")
    title.textContent = "Weather"
    dataHolder.appendChild(title);
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

function findPlaces(lat, lon) {  // Pulls information of local restaurants based on the zip code entered when user decides to plan a night out 
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

function displayPlaces (data) {  // Displays the restaurants in radius of user inputed zip-code
    var placesHolder = document.createElement("div");
    placesHolder.classList.add("box");
    document.querySelector(".restaurants").appendChild(placesHolder);
    for ( i = 0; i < data.results.length; i++) {
        var name = document.createElement("p");
        name.classList.add("title");
        name.classList.add("is-5");
        name.textContent = data.results[i].poi.name
        name.classList.add("has-text-weight-semibold");
        placesHolder.appendChild(name);
        var address = document.createElement("p");
        address.classList.add("box");
        address.classList.add("has-background-light");
        address.classList.add("is-size-6");
        address.classList.add("has-text-primary");
        address.textContent = data.results[i].address.freeformAddress
        address.classList.add("has-text-weight-normal")
        placesHolder.appendChild(address);
    }
};

function getMovie(userZipCode) {  // Pulls information on the movies in theaters near users inputted zip-code
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

function displayMovies (data) {  // Displays information on the movies in theaters near user zip-code
    var moviesHolder = document.createElement("div");
    document.querySelector(".movie").appendChild(moviesHolder);
    moviesHolder.classList.add("row")
    moviesHolder.classList.add("is-flex")
    moviesHolder.classList.add("is-flex-wrap-wrap")
    for (var i = 0; i < data.length; i++) {
        var movie = document.createElement("p");
        movie.classList.add("box");
        movie.classList.add("title");
        movie.classList.add("is-size-5");
        movie.textContent = data[i].title
        movie.classList.add("row")
        moviesHolder.appendChild(movie);
       var newLine = document.createElement("div")
       newLine.classList.add("is-flex")
       newLine.classList.add("column")
       newLine.classList.add("is-12")
      moviesHolder.appendChild(newLine);
       var showTimesArr = data[i].showtimes
      displayTimes(showTimesArr)
    }
};

$(document).on("click", "#btn-i", function (event) {  // The listener attached to the night in button 

    getRecipe();

});

function displayTimes (showTimesArr){
   for (var i=0; i<showTimesArr.length; i++) {
      var time = moment(showTimesArr[i].dateTime).format("LT")
      var showTime = document.createElement("p");
      showTime.classList.add("column")
      showTime.classList.add("has-text-primary")
      showTime.textContent = time;
     // showTime.textContent = time + " " + showTimesArr[i].theatre.name;
      moviesHolder.appendChild(showTime);
    };
    var newLine = document.createElement("div")
    newLine.classList.add("is-flex")
    newLine.classList.add("column")
    newLine.classList.add("is-12")
   moviesHolder.appendChild(newLine);
}

function getRecipe() { // The API call to provide a recipie when user decides to stay in
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

function displayRecipe(data) { // The function that displays the recipe
    var recipeHolder = document.createElement("div");
    document.querySelector(".food").appendChild(recipeHolder);
    var name = document.createElement("p");
    name.textContent = data.meals[0].strMeal;
    name.classList.add("has-text-weight-bold")
    name.classList.add("is-4")
    recipeHolder.appendChild(name);
    var image = document.createElement("img");
    image.setAttribute("src", data.meals[0].strMealThumb);
    recipeHolder.appendChild(image);
    var newLine = document.createElement("br")
    recipeHolder.appendChild(newLine);
    var link = document.createElement("a");
    link.textContent = data.meals[0].strSource;
    link.setAttribute("href", data.meals[0].strSource);
    recipeHolder.appendChild(link);
}
