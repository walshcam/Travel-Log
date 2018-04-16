var config = {
  apiKey: "AIzaSyCQVxKjVxfe7tck-V5cB_TdhpbWYKsBO-0",
  authDomain: "travel-log-b5b5d.firebaseapp.com",
  databaseURL: "https://travel-log-b5b5d.firebaseio.com",
  projectId: "travel-log-b5b5d",
  storageBucket: "travel-log-b5b5d.appspot.com",
  messagingSenderId: "1021747749689"
};
firebase.initializeApp(config);
var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();
var user;

var geocoder;
var map;
function initMap() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 9,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
};


function codeAddress() {
  firebase.database().ref('/Posts/').once('value').then(function(snapshot) {
    var postObject = snapshot.val();
    console.log(postObject);
    var keys = Object.keys(postObject);
    // var currentRow;
    // var Username = $("#name-input").val();
    var mapArray=[];

    for (var i=0; i<keys.length; i++) {
      var token = firebase.auth().currentUser.uid;
      var currentObject = postObject[keys[i]];
      if (token==currentObject.Username) {
          mapArray.push(currentObject)
      }
      };
      console.log(mapArray);
      for (j=0; j<mapArray.length; j++) {
  var address = mapArray[j].location;
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
};
  });
};
