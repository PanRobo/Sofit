const form = document.querySelector('#form')
const firstName = document.querySelector('#first_name');
const lastName = document.querySelector('#last_name');
const email = document.querySelector('#email');
const neighborhood = document.querySelector('#neighborhood');
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
if(localStorage.getItem('Person Logged in') === undefined || localStorage.getItem('Person Logged in') === null) {
    window.open('index.html', '_self')
}else {
    const person = localStorage.getItem('Person Logged in')
    db.collection('Users').doc(`${person}`).get().then((doc) => {
        if(doc.data().firstname === undefined) {
            firstName.setAttribute('placeholder', 'Update This!')
        }else{
            firstName.setAttribute('value', doc.data().firstname);
        }
        if(doc.data().lastname === undefined) {
            lastName.setAttribute('placeholder', 'Update This!')
        }else{
            lastName.setAttribute('value', doc.data().lastname)
        }
        if(doc.data().UserEmail === undefined) {
            email.setAttribute('placeholder', 'Update This!')
        }else{
            email.setAttribute('value', doc.data().UserEmail)
        }
        neighborhood.value = doc.data().whichNeighborhood
    }).then(function() {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            db.collection('Users').doc(`${person}`).set({
                firstname: firstName.value,
                lastname: lastName.value,
                UserEmail: email.value.toLowerCase(),
                WhichNeighborhood: neighborhood.value,
            }, { merge: true}).then(function() {
                window.open('main.html', '_self')
            })
        })
    })
}