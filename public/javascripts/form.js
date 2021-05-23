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