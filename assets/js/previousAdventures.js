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

$(document).ready(function () {
    querydatabase();
    codeAddress();
});

function querydatabase() {
    firebase.database().ref('/Posts/').once('value').then(function (snapshot) {
        var postObject = snapshot.val();
        console.log(postObject);
        var keys = Object.keys(postObject);
        var newArray = [];
        // matching user to their photos using token and pushing to new array
        for (var i = 0; i < keys.length; i++) {
            var token = firebase.auth().currentUser.uid;
            var currentObject = postObject[keys[i]];
            if (token == currentObject.Username) {
                newArray.push(currentObject)
            }
        };
        // appending photos from the new array to the page
        console.log(newArray);
        for (j = 0; j < newArray.length; j++) {
            let newDiv = $("<div>");
            newDiv.addClass("gallery-item");
            let newImg = $("<img>");
            newImg.attr("src", newArray[j].url);
            let newCaption = $("<div>");
            newCaption.addClass("desc");
            newCaption.text(newArray[j].location + ": " + newArray[j].caption);
            newDiv.append(newImg);
            newDiv.append(newCaption);
            $("#gallery").append(newDiv);
            //    call (or put) map function here?

        };
    });
};

// Clears input fields on focus
$("#locationInput").focus(function () {
    uploader.value = 0;
    document.getElementById("newp").style.visibility = "hidden"
});

// Pushes file and metadata to database
$("#filebutton").on("change", function (event) {
    var file = event.target.files[0];
    var filename = file.name
    var storageref = firebase.storage().ref(filename);
    var uploadTask = storageref.put(file);


    uploadTask.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred /
                snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
        function error(err) {
            console.log("error");
        },
        function complete() {
            // Creates a 'Posts' key to store metadata in database
            var postKey = firebase.database().ref('Posts/').push().key;
            var downloadURL = uploadTask.snapshot.downloadURL;
            var updates = {};
            var token = firebase.auth().currentUser.uid;
            var postData = {
                url: downloadURL,
                location: $("#locationInput").val(),
                caption: $("#imageCaption").val(),
                Username: token
            };
            updates['/Posts/' + postKey] = postData;
            firebase.database().ref().update(updates);
            console.log(downloadURL);
            var newp = document.createElement("p");
            $(newp).addClass("uploadComp");
            $(newp).attr('id', 'newp');
            $(newp).html("Upload Complete");
            $("#uploadComplete").append(newp);
            $("#locationInput").val('');
            $("#imageCaption").val('');
            $("#gallery").empty();
            querydatabase();
            codeAddress();
        }
    );
});

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
    firebase.database().ref('/Posts/').once('value').then(function (snapshot) {
        var postObject = snapshot.val();
        console.log(postObject);
        var keys = Object.keys(postObject);
        // var currentRow;
        // var Username = $("#name-input").val();
        var mapArray = [];

        for (var i = 0; i < keys.length; i++) {
            var token = firebase.auth().currentUser.uid;
            var currentObject = postObject[keys[i]];
            if (token == currentObject.Username) {
                mapArray.push(currentObject)
            }
        };
        console.log(mapArray);
        for (j = 0; j < mapArray.length; j++) {
            var address = mapArray[j].location;
            geocoder.geocode({
                'address': address
            }, function (results, status) {
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

// Sticky Header
$(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
        $('.main_h').addClass('sticky');
    } else {
        $('.main_h').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function () {
    if ($('.main_h').hasClass('open-nav')) {
        $('.main_h').removeClass('open-nav');
    } else {
        $('.main_h').addClass('open-nav');
    }
});

$('.main_h li a').click(function () {
    if ($('.main_h').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_h').removeClass('open-nav');
    }
});

// navigation scroll lijepo radi materem
$('nav a').click(function (event) {
    var id = $(this).attr("href");
    var offset = 70;
    var target = $(id).offset().top - offset;
    $('html, body').animate({
        scrollTop: target
    }, 500);
    event.preventDefault();
});