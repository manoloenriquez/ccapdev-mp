console.log('dashboard script loaded')

let toggle = document.getElementById('menu-toggle')
let wrapper = document.getElementById('wrapper')
let toggled = false

toggle.onclick = () => {
  if (!toggled) {
    wrapper.classList.add('toggled')
  } else {
    wrapper.classList.remove('toggled')
  }

  toggled = !toggled
}

let del = document.getElementById('delete-item')

del.onclick = () => {
  let ans = confirm('Are you sure you want to delete your account?')

  if (!ans) return

  // redirect to home page signed out

  let xhttp = new XMLHttpRequest()

  xhttp.open('POST', '/dashboard/deleteaccount', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send()

  window.location.href = '/'
}

const updateName = event => {
  event.preventDefault()

  let form = document.forms.nameForm

  data = {
    fName: form.elements.fName.value === '' ? form.elements.fName.placeholder : form.elements.fName.value,
    lName: form.elements.lName.value === '' ? form.elements.lName.placeholder : form.elements.lName.value
  }

  let xhttp = new XMLHttpRequest()

  xhttp.open('POST', '/dashboard/editaccount', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(data))
}

const updateEmail = event => {
  event.preventDefault()

  let form = document.forms.emailForm

  data = {
    email: form.elements.email.value === '' ? form.elements.email.placeholder : form.elements.email.value
  }

  let xhttp = new XMLHttpRequest()

  xhttp.open('POST', '/dashboard/editaccount', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(data))
}

const updateBio = event => {
  event.preventDefault()

  let form = document.forms.bioForm

  data = {
    bio: form.elements.bio.value
  }

  let xhttp = new XMLHttpRequest()

  xhttp.open('POST', '/dashboard/editaccount', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(data))
}

const updateUsername = event => {
  event.preventDefault()

  let form = document.forms.usernameForm

  data = {
    username: form.elements.username.value === '' ? form.elements.username.placeholder : form.elements.username.value
  }

  let xhttp = new XMLHttpRequest()

  xhttp.open('POST', '/dashboard/editaccount', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(data))
}

const updateImg = event => {
  event.preventDefault()

  let form = document.forms.imgForm

  if (form.elements.imgUrl.value === '') return

  let url = form.elements.imgUrl.value
  let isPath = url.includes('/images/')
  let isLink = url.includes('https://') || url.includes('http://')

  if (!isPath && !isLink) {
    url = `/images/${url}`
  }

  data = {
    avatar: url
  }

  let xhttp = new XMLHttpRequest()

  xhttp.open('POST', '/dashboard/editaccount', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(data))

  window.location.href = '/dashboard/editaccount'
}