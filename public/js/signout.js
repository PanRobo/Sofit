document.querySelector('#logout').addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.setItem('Person Logged in', null)
    window.open('index.html', '_self')
})