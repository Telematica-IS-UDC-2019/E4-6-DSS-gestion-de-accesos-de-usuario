const testBtn = document.getElementById('test');


testBtn.addEventListener('click', () => {
    fetch('http://localhost:4006/login/callback')
    .then(response => {
        console.log(response)
    })
    // .then(data => console.log(data))
});

// console.log(document.cookie)