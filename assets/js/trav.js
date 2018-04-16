
 
//   (function() {

 // Initialize Firebase
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
// provider.setCustomParameters({
//     prompt: 'select_account'
//  });

// $(document).ready(function() {
  

// function signIn() {
// firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     user = result.user;
    // showWelcomeContainer();
   
$("#signIn").on("click", function() {

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
// })
    
    // ...
  }).catch(function(error) {
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
// });








// function showWelcomeContainer() {
//   $("#login").hide();
//   $("#welcome").show();
//   $("#welcomeText").html("Hello, " + user.displayName);
// }
//   $("#addName").on("click", function(event) {
//     event.preventDefault();
//     name = $("#name-input").val().trim();});

//     database.ref().push({
//         name: name
//     });

$("#signout").on("click", function() {
    firebase.auth().signOut().then(function() {
        $("#login").show();
        $("#welcome").hide();
      }).catch(function(error) {
        console.log("logout error");
      });
});

$("#locationInput").focus(function(){
    uploader.value = 0;
    document.getElementById("newp").style.visibility = "hidden"});




$("#filebutton").on("change", function(event) {
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
            },
        function complete() {
            // Creates a 'Posts' key to store metadata
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
            showWelcomeContainer();
            var newp = document.createElement("p");
            $(newp).addClass("uploadComp");
            $(newp).attr('id', 'newp');
            $(newp).html("Upload Complete");
            $("#uploadComplete").append(newp);
            $("#locationInput").val('');
            $("#imageCaption").val('');
            }
        );
    });


// function querydatabase() {
//    firebase.database().ref('/Posts/').once('value').then(function(snapshot) {
//        var postObject = snapshot.val();
//        console.log(postObject);
//        var keys = Object.keys(postObject);
//        var currentRow;
//        var Username = $("#name-input").val();
    
//        for (i=0; i<keys.length; i++) {
           
//            var currentObject = postObject[keys[i]];
//            console.log(currentObject.Username);
//            if (i % 3 == 0) {
//                currentRow = document.createElement("div");
//                $(currentRow).addClass("row");
//                $("#imagecontainer").append(currentRow);
//            }
//            var col = document.createElement("div");
//            $(col).addClass("col-lg-4");
//            var image = document.createElement("img");
//            image.src = currentObject.url;
//            $(image).addClass("contentImage");
//            var p = document.createElement("p");
//            $(p).html(currentObject.caption);
//            $(p).addClass("contentCaption");
//            $(col).append(image);
//            $(col).append(p);
//            $(currentRow).append(col);
//        }
//    });
   
// }
  
//   querydatabase();









// const txtmail= document.getElementById('txtEmail');
// const txtPassword = document.getElementById('txtPassword');
// const btnLogin = document.getElementById('btnLogin');
// const btnSignUp = document.getElementById('btnSignUp');
// const btnLogout = document.getElementById('btnLogout');

// $("#btnLogin").on("click", function(event) {
//     const email = $("#txtEmail").val();
//     const pass = $("#txtPassword").val();
//     const auth = firebase.auth();


// const promise = auth.signInWithEmailAndPassword(email, pass);
// promise.catch(e => console.log(e.message));
// // $("#txtEmail")[0].reset();
// //     $("#txtPassword")[0].reset();
// });

// $("#btnSignUp").on("click", function(event) {
//     // Todo check for real email
//     const email = $("#txtEmail").val();
//     const pass = $("#txtPassword").val();
//     const auth = firebase.auth();

//     const promise = auth.createUserWithEmailAndPassword(email, pass);
// promise.catch(e => console.log(e.message));
// // $("#txtEmail")[0].reset();  
// // $("#txtPassword")[0].reset();

// });

// $("#btnLogout").on("click", function(event) {
//     firebase.auth().signOut();
// });



//   firebase.auth().onAuthStateChanged(firebaseUser => { 
//       if(firebaseUser) {
//         btnLogout.classList.remove('hide');
//           console.log(firebaseUser);
      
//         }
//           else {
//               console.log('not logged in')
//           }
//   });
