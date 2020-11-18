
// // Write Javascript code!
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const neighborhood = document.querySelector("#neighborhood");
const form = document.querySelector("#form");
const first_name = document.querySelector("#first_name");
const last_name = document.querySelector("#last_name");
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTbG4Q4dgjviI7yKZQne0IE78W9wk0JeE",
  authDomain: "sofit-cc1f1.firebaseapp.com",
  databaseURL: "https://sofit-cc1f1.firebaseio.com",
  projectId: "sofit-cc1f1",
  storageBucket: "sofit-cc1f1.appspot.com",
  messagingSenderId: "641436990806",
  appId: "1:641436990806:web:5719e87b10df058c676af7",
  measurementId: "G-LVWFF4W39X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
var auth = firebase.auth()
firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
form.addEventListener("submit", (e) => {
  email_value = email.value.toLowerCase() 
  e.preventDefault();
  console.log('hola');
  if(email_value === db.collection('Users').where('email', '==', `${email_value}`)) {
    console.log('sorry your account is already made');
  } else {
    db.collection("Users").doc(`${email_value}`)
      .set({
        whichNeighborhood: neighborhood.value,
        firstname: first_name.value,
        lastname: last_name.value
      })
      .then(function(docRef) {
        console.log("Document written ");
        window.open('main.html', '_self')
        localStorage.setItem('Person Logged in', `${email_value}`)
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
});
