let bioForm = document.getElementById('bioForm')
let fNameForm = document.getElementById('fNameForm')
let lNameForm = document.getElementById('lNameForm')
let usernameForm = document.getElementById('usernameForm')
let emailForm = document.getElementById('emailForm')
let editableDP = document.getElementById('editableDP')

let bio = document.getElementById('bio')
let fName = document.getElementById('fName')
let lName = document.getElementById('lName')
let email = document.getElementById('email')
let dp = document.getElementById('dp')

fetch('./data.json')
  .then((res) => res.json())
  .then((data) => {

    // Edit account details page
    try {
      fNameForm.setAttribute('placeholder', data.name.first)
      lNameForm.setAttribute('placeholder', data.name.last)
      bioForm.innerText = data.bio
      usernameForm.setAttribute('placeholder', data.username)
      emailForm.setAttribute('placeholder', data.email)
      editableDP.setAttribute('src', data.img)
    } catch(err) {}

    // Profile page
    try {
      bio.innerText = data.bio
      fName.innerText = data.name.first
      lName.innerText = data.name.last
      email.setAttribute('href', `mailto:${data.email}`)
      email.innerText = data.email
      dp.setAttribute('src', data.img)
    } catch (err) {}
  })