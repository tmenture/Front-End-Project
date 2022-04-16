var userZipCode = $("#zip-code").val();
   
var callApi = function () {

             fetch('https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=u0qeyJGVcW318hNAeQdpuAQrDfoV5v5R&&postalCode='+ userZipCode +'&&radius=15&&unit=miles')

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

    for (var i = 0; i < data._embedded.events.length; i++) {

        const eventEl = data._embedded.events[i];

        const eventElDiv = document.getElementById("fetch-container");

        const event = eventEl.name;

        const header = document.createElement("h1");

        header.innerHTML = event;

        eventElDiv.appendChild(header);

    };

};

$(document).on("click", "#btn-t", function (event) {

    event.preventDefault();

    callApi();

});