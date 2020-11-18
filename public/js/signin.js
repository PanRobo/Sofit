let email = document.querySelector('#email')
const form = document.querySelector('#form')
const pass = document.querySelector("#password")
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
form.addEventListener('submit', (e) => {
    const email_value = email.value.toLowerCase()
    let docRef = db.collection('Users').doc(`${email_value}`)
    e.preventDefault()
    docRef.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().userPassword === pass.value) {
                window.open('main.html', '_self')
            }else{
                if(doc.data().userPassword === undefined) {
                    var $toastContent = $(`<span>You don't have a password, head on over to signup to get one</span>`).add($('<a class="btn-flat toast-action" href="./signup.html">Signup</a>'));
  Materialize.toast($toastContent, 10000);
                }else{
                    Materialize.toast('Wrong password', 4000)
                }
            }
            localStorage.setItem('Person Logged in', `${email.value}`)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
})