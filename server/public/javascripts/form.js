const handleLogin = event => {
  event.preventDefault()

  let xhttp = new XMLHttpRequest()

  xhttp.open('POST', '/login', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.onreadystatechange = () => {
    if (this.readyState == 4 && this.status == 200) {
      window.location.href = '/'
    }
  }

  let user = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  }

  xhttp.send(JSON.stringify(user))
}

const handleRegister = event => {
  event.preventDefault()

  let xhttp = new XMLHttpRequest()

  xhttp.open('POST', '/register', true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  let user = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    fName: document.getElementById('fname').value,
    lName: document.getElementById('lname').value,
    email: document.getElementById('email').value
  }

  xhttp.send(JSON.stringify(user))
}