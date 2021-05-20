function checkusername(event) {
  let username = event.target.value
  let xhttp = new XMLHttpRequest()

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      if (xhttp.responseText !== '') {
        document.getElementById('username').classList.add('is-invalid')
        document.getElementById('submit').disabled = true
      } else {
        document.getElementById('username').classList.remove('is-invalid')
        document.getElementById('submit').disabled = false
      }
    }
  }

  xhttp.open('GET', `/getusername?username=${username}`, true)
  xhttp.send()
}

function checkemail(event) {
  let email = event.target.value
  let xhttp = new XMLHttpRequest()

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      if (xhttp.responseText !== '') {
        document.getElementById('email').classList.add('is-invalid')
        document.getElementById('submit').disabled = true
      } else {
        document.getElementById('email').classList.remove('is-invalid')
        document.getElementById('submit').disabled = false
      }
    }
  }

  xhttp.open('GET', `/getemail?email=${email}`, true)
  xhttp.send()
}