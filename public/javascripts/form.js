async function checkusername() {
  let username = document.getElementById('username').value

  let result = await fetch(`/api/checkusername?username=${username}`).then(res => res.json())

  if (result) {
    document.getElementById('username').classList.remove('is-invalid')
    document.getElementById('submit').disabled = false
  } else {
    document.getElementById('username').classList.add('is-invalid')
    document.getElementById('submit').disabled = true
  }
}

async function checkemail() {
  let email = document.getElementById('email').value

  let result = await fetch(`/api/checkemail?email=${email}`).then(res => res.json())

  if (result) {
    document.getElementById('email').classList.remove('is-invalid')
    document.getElementById('submit').disabled = false
  } else {
    document.getElementById('email').classList.add('is-invalid')
    document.getElementById('submit').disabled = true
  }
}

async function checkform(event) {
  event.preventDefault()

  let elements = event.target.elements

  let valid = true

  for (let i of elements) {
    if (i.value === '') {
      i.classList.add('is-invalid')
      valid = false
    } else {
      i.classList.remove('is-invalid')
    }
  }

  if (valid) {
    let data = {
      username: elements.username.value,
      password: elements.password.value,
      fName: elements.fName.value,
      lName: elements.lName.value,
      email: elements.email.value
    }

    console.log(data)

    let result = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())

    if (result) {
      window.location.href = '/enterinfo'
    }
  }
}