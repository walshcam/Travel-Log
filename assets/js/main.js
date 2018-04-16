var geocoder;
var map, infoWindow;
geocoder = new google.maps.Geocoder();
var latlng = new google.maps.LatLng(-34.397, 150.644);
var mapOptions = {
  zoom: 8,
  center: latlng
}
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(2.8,-187.3),
    mapTypeId: 'terrain'
  });
  
  function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
    // Loop through the results array and place a marker for each
// set of coordinates.
// var userCities = [{ city:"LosAngeles", coordinates: [-118.4079, 33.9434]},{city:"Paris", coordinates: [2.3490, 48.8533]}];
// //var userLocation = $("#location-input").text();
// for (var i = 0; i < userCities.length; i++) {
//   var coords = userCities[i].coordinates;
//   var latLng = new google.maps.LatLng(coords[1], coords[0]);
//   var marker = new google.maps.Marker({
//       position: latLng,
//       map: map
    // });

     marker.setMap(map);
    console.log("this is the userCities array" + userCities);
    console.log("this is coords" + coords);
    console.log("this is latlng" + latLng);
    console.log("here is the marker object" + marker);
  }
// the following block of code will located the user current location
//
  infoWindow = new google.maps.InfoWindow;
   // Try HTML5 geolocation.
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

// Create the search box and link it to the UI element.
function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });




// function on click 
$("#add-places").on("click", function(event) {
  event.preventDefault();
console.log(" The submit button has been clicked")

// var location =("#location-input").val();
// var queryurl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAEIwSV8mz7FhFBG8WpCbLO0WTwTBxpj0Q&callback=initMap";
var input = document.getElementById("pac-input");
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
$.ajax({
  url: searchBox,
  method: "GET"
}).then(function(respone) {
  console.log(response);
  // var marker = new google.maps.Marker({
  //   position: latLng,
  //   map: map
  marker.setMap(map);

  });
});
};


/*
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyAEIwSV8mz7FhFBG8WpCbLO0WTwTBxpj0Q",
  authDomain: "travel-log-1523547531552.firebaseapp.com",
  databaseURL: "https://travel-log-1523547531552.firebaseio.com",
  projectId: "travel-log-1523547531552",
  storageBucket: "",
  messagingSenderId: "85826560091"
};*/
// 
