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

$(document).ready(function() {
    querydatabase();
});
function querydatabase() {
    firebase.database().ref('/Posts/').once('value').then(function(snapshot) {
        var postObject = snapshot.val();
        console.log(postObject);
        var keys = Object.keys(postObject);
        // var currentRow;
        // var Username = $("#name-input").val();
        var newArray=[];
        
        for (var i=0; i<keys.length; i++) {
            var token = firebase.auth().currentUser.uid;
            var currentObject = postObject[keys[i]];
            if (token==currentObject.Username) {
                newArray.push(currentObject)
            }
            };

                console.log(newArray);
            for (j=0; j<newArray.length; j++) {
           let newDiv = $("<div>");
           newDiv.addClass("gallery-item");
           let newImg = $("<img>");
           newImg.attr("src", newArray[j].url);
           let newCaption = $("<div>");
           newCaption.addClass("desc");
           newCaption.text(newArray[j].caption);
           newDiv.append(newImg);
           newDiv.append(newCaption);
           $("#gallery").append(newDiv);
        //    call (or put) map function here?

            };
        });   
    };     

    // Clears input fields on focus
    // $("#locationInput").focus(function(){
    //     uploader.value = 0;
    //     document.getElementById("newp").style.visibility = "hidden"});

    // Pushes file and metadata to database
    $("#filebutton").on("change", function(event) {
        var file = event.target.files[0];
        var filename = file.name
        var storageref = firebase.storage().ref(filename);
        var uploadTask = storageref.put(file);
        user = result.user;
       
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
                var postData = {
                    url: downloadURL,
                    location: $("#locationInput").val(),
                    caption: $("#imageCaption").val(),
                    Username: user.uid
                    };
                updates['/Posts/' +postKey] = postData;
                firebase.database().ref().update(updates);
                console.log(downloadURL);
                querydatabase();

                // var newp = document.createElement("p");
                // $(newp).addClass("uploadComp");
                // $(newp).attr('id', 'newp');
                // $(newp).html("Upload Complete");
                // $("#uploadComplete").append(newp);
                // $("#locationInput").val('');
                // $("#imageCaption").val('');

                }
            );
        });





// Sticky Header
$(window).scroll(function() {

    if ($(window).scrollTop() > 100) {
        $('.main_h').addClass('sticky');
    } else {
        $('.main_h').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.main_h').removeClass('open-nav');
    } else {
        $('.main_h').addClass('open-nav');
    }
});

$('.main_h li a').click(function() {
    if ($('.main_h').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_h').removeClass('open-nav');
    }
});

// navigation scroll lijepo radi materem
$('nav a').click(function(event) {
    var id = $(this).attr("href");
    var offset = 70;
    var target = $(id).offset().top - offset;
    $('html, body').animate({
        scrollTop: target
    }, 500);
    event.preventDefault();
});