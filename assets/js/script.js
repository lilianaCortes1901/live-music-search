//Google Maps API fetch & searchTerm Intergration 
function searchLocal(){
    var searchTermLocal = document.querySelector('#userInput').value;

    fetch(
        'https://www.google.com/maps/embed/v1/place?api_key=AIzaSyBcsR3u8CFQz51MueJdmvZvTyF8MWwvegw&q=' +
        searchTermLocal
    )
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var responseContainerEL = document.querySelector('#google-maps-section');
            var mapImg = document.createElement('img');
            mapImg.setAttribute('src', response.data.image_url);
            responseContainerEL.appendChild(mapImg);
        });

        if (searchTermLocal.text) {
            if (searchTermLocal.byBand) {
                searchByBand();
            } else if (searchTerm.byLocation) {
                searchByLocation();
            } else {
                console.log("error, please choose band or location");
            }
        } else {
            console.log("error, please enter a search term");
        }
}

function addMarkerMap(){
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let labelIndex = 0;

    function initMap() {
        const bangalore = { lat: 12.97, lng: 77.59 };
        const map = new google.maps.Map(document.getElementById("map"), {
         zoom: 12,
         center: bangalore,
    });
  // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, "click", (event) => {
    addMarker(event.latLng, map);
     });
  // Add a marker at the center of the map.
     addMarker(bangalore, map);
}

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
  });
}
}


var searchTerm = {
    text: "",
    byBand: false,
    byLocation: false,
};

var resultsListEl = $("#results-list");

var getSearchTerm = function(event) {
    event.preventDefault();

    searchTerm.text = $("#search").val();
    searchTerm.byBand = $("#by-band").prop("checked");
    searchTerm.byLocation = $("#by-location").prop("checked");

    console.log(searchTerm);

    if (searchTerm.text) {
        if (searchTerm.byBand) {
            searchByBand();
        } else if (searchTerm.byLocation) {
            searchByLocation();
        } else {
            console.log("error, please choose band or location");
        }
    } else {
        console.log("error, please enter a search term");
    }
    
};

var searchByLocation = function() {
    console.log("searching by location");


};

var searchByBand = function() {
    console.log("searching by band");

    fetch("https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + searchTerm.text + "&apikey=FzG0HQggXUshU8XPjoL51Vx9xKDyW0r9")
        .then(function(response) {
            return response.json();
        })
        .then(function(response){
            console.log(response._embedded.events);
            var eventsArray = response._embedded.events;
            for (i = 0; i < eventsArray.length; i++) {
                $(`<li id="${eventsArray[i].id}"><a href="./results.html?id=${eventsArray[i].id}">${eventsArray[i].name}</a></li>`).appendTo(resultsListEl);
            }
        })    
};

$("#search-button").on("click", getSearchTerm);
