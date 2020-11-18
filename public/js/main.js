const greeting = document.querySelector('#greeting');
const invit = document.querySelector('#Invitedexercises')
const active = document.querySelector('#activeExercises')
const addnoties = document.querySelector('#add-noties')
const noThanks = document.querySelector('#no-thanks');
const goSettings = document.querySelector('#go-settings');
let accept;
let i;
let docid;
let del;
let email;
let doccyid;
let dater;
let date_now;
let notification;
let date_tommorow;
let noteneeds;
let rejected;

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
let person
if(localStorage.getItem('Person Logged in')) {
    person = localStorage.getItem('Person Logged in');
    let docRef = db.collection('Users').doc(`${person}`)
    docRef.get().then(function(doc) {
        if(doc.exists || doc != null){
            if(doc.data().UserEmail === undefined|| doc.data().whichNeighborhood === undefined|| doc.data().firstname === undefined || doc.data().lastname === undefined ){
              $('#modal1').modal('open');
              goSettings.addEventListener('click', (e) => {
                e.preventDefault()
                window.open('settings.html', '_self')
              })
            }
            email = doc.data().UserEmail
            if(doc.data().notifications === false) {
              document.querySelector('#notifications').remove()
            }
            noThanks.addEventListener('click', (e) => {
              e.preventDefault()
              document.querySelector('#notifications').remove()
              db.collection('Users').doc(`${email}`).set({
                notifications: false
              }, { merge: true })
            })
            if(Notification.permission == 'granted') {
              document.querySelector('#notifications').remove()
              noteneeds = false;
            }
            if(noteneeds) {

              addnoties.addEventListener('click', (e) => {
                e.preventDefault()
                console.log('hi');
                Notification.requestPermission().then(function(result) {
                  console.log(result);
                  
                })
            })
          }else{
            db.collection('Users').doc(`${email}`).collection('Accepted Invitations').onSnapshot((snaps) => {
              snaps.forEach((doc) => {
                dater = new Date(doc.data().date)
                date_now = new Date()
                date_tommorow = new Date(date_now)
                date_tommorow.setDate(date_tommorow.getDate() + 1)
                console.log(date_tommorow.getDate(), dater.getDate());
                if(dater.getDate() === date_tommorow.getDate()) {
                  notification = new Notification('Your Exercise is Tommorow', {
                    body: `Your Exercise ${doc.data().name} is starting tommorow!`,
                    icon: './Icon/circle-cropped.png'
                  })
                }
              })
            })
            }
            greeting.textContent = `Hello there ${doc.data().firstname}`
            db.collection('Users').doc(`${email}`).collection('deleted exercises')
            db.collection('Users').doc(`${email}`).collection('Accepted Invitations').onSnapshot((snaps) => { 
              active.innerHTML = ''
                snaps.forEach((doc) => {
                    active.innerHTML += `
                    <div class="row" id="docid${doc.data().id}">
                    <div class="col s12 m6">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <span class="card-title">${doc.data().name}</span>
                          <p>This Exercise was created by ${doc.data().creator} it begins at ${doc.data().time} on ${doc.data().date}</p>
                        </div>
                        <div class="card-action">
                          <a role="button" href="#" docId="${doc.data().id}" class="Delete ${doc.data().id}">Delete</a>
                        </div>
                      </div>
                    </div>
                  </div>
                    `
                })
                del = document.querySelectorAll('.Delete')
                del.forEach((del) => {
                  del.addEventListener('click', (e) => {
                    e.preventDefault()
                    doccid = del.getAttribute('docId')
                    document.querySelector(`#docid${doccid}`).remove()
                    db.collection('Users').doc(`${email}`).collection('Accepted Invitations').doc(`${doccid}`).delete()
                  })
                })
            })
            db.collection('Users').doc(`${doc.data().UserEmail}`).collection('Invited Exercises').onSnapshot((snaps) => {
                invit.innerHTML = ''
                snaps.forEach((doc) => {
                    invit.innerHTML = invit.innerHTML + `
                    <div class="row" id="docid${doc.data().id}">
                    <div class="col s12 m6">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <span class="card-title">${doc.data().name}</span>
                          <p>This Exercise was created by ${doc.data().createdby} it begins at ${doc.data().time} on ${doc.data().date}</p>
                        </div>
                        <div class="card-action">
                          <a role="button" href="#" docId="${doc.data().id}" class="accept">Accept</a>
                          <a role="button" href="#" docId="${doc.data().id}" class="Reject ${doc.data().id}">Reject</a>
                        </div>
                      </div>
                    </div>
                  </div>
                    `
                })
                accept = document.querySelectorAll('.accept')
                accept.forEach((accept) => {
                    accept.addEventListener('click', (e) => {
                        e.preventDefault()
                        docid = accept.getAttribute('docId')
                        document.querySelector(`#docid${docid}`).remove()
                        docref = db.collection('Users').doc(`${email}`).collection('Invited Exercises').doc(`${docid}`)
                        docref.get().then(function(doc) {
                            db.collection('Users').doc(`${email}`).collection('Accepted Invitations').doc(`${docid}`).set({
                                creator: doc.data().createdby,
                                name: doc.data().name,
                                id: doc.data().id,
                                date: doc.data().date,
                                time: doc.data().time
                            })
                            docref.delete()
                        })
                    })
                })
                rejected = document.querySelectorAll('.Reject')
                rejected.forEach((reject) => {
                  reject.addEventListener('click', (e) => {
                    e.preventDefault()
                    docid=reject.getAttribute('docId')
                    document.querySelector(`#docid${docid}`).remove()
                    docref = db.collection('Users').doc(`${email}`).collection('Invited Exercises').doc(`${docid}`)
                    docref.get().then((doc) => {
                      db.collection('Users').doc(`${email}`).collection('deleted exercises').doc(`${docid}`).set({
                        creator: doc.data().createdby,
                        name: doc.data().name,
                        id: doc.data().id,
                        date: doc.data().date,
                        time: doc.data().time
                      })
                      docref.delete()
                    })
                  })
                })

            })
            
            
        }
    });
    
    
}else {
    console.log("You didn't sign in")
    window.open('index.html', '_self')
}
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.setItem('Person Logged in', null)
    window.open('index.html', '_self')
})
