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

$("#signIn").on("click", function () {

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
});

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location = 'assets/html/previousAdventures.html';
    }
});

$("#signout").on("click", function () {
    firebase.auth().signOut().then(function () {
        $("#login").show();
        $("#welcome").hide();
    }).catch(function (error) {
        console.log("logout error");
    });
});

$("#locationInput").focus(function () {
    uploader.value = 0;
    document.getElementById("newp").style.visibility = "hidden"
});