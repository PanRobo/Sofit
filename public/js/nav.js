
if(localStorage.getItem('Person Logged in') === undefined) {
    window.open('index.html', '_self')
}else{
    console.log(document.querySelector('.name'));
    db.collection('Users').doc(`${localStorage.getItem('Person Logged in')}`).get().then((doc) => {
        document.querySelector('.name').innerHTML = `${doc.data().firstname} ${doc.data().lastname}`;
        document.querySelector('.name').style.color = `deeppink`;
        document.querySelector('.email').innerHTML = `${doc.data().UserEmail}`;
        document.querySelector('.email').style.color = `deeppink`;

    })
    
}