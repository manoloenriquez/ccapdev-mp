function login(event) {
  let username = document.getElementById('username').value
  let password = document.getElementById('password').value

  event.preventDefault()
  fetch('./users.json')
    .then((res) => res.json())
    .then((data) => {

      let valid = false

      for (user of data) {
        console.log(user)
        if (user['username'] == username && user['password'] == password) {
          valid = true
          break
        }
      }
      
      if (valid) {
        window.location.href = `dashboard/${username}/profile.html`
      } else {
        alert('Invalid credentials.')
      }
    })

}

