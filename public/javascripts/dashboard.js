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

del.onclick = async () => {
  let ans = confirm('Are you sure you want to delete your account?')

  if (!ans) return

  // redirect to home page signed out

  await fetch('/api/deleteaccount', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })

  window.location.href = '/'
  
}

async function updateName(event) {
  event.preventDefault()

  let form = document.forms.nameForm

  data = {
    fName: form.elements.fName.value === '' ? form.elements.fName.placeholder : form.elements.fName.value,
    lName: form.elements.lName.value === '' ? form.elements.lName.placeholder : form.elements.lName.value
  }

  await fetch('/api/updateaccount', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  form.elements.fName.value = ''
  form.elements.fName.placeholder = data.fName

  form.elements.lName.value = ''
  form.elements.lName.placeholder = data.lName
}

async function updateEmail(event) {
  event.preventDefault()

  let form = document.forms.emailForm

  data = {
    email: form.elements.email.value === '' ? form.elements.email.placeholder : form.elements.email.value
  }

  await fetch('/api/updateaccount', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  form.elements.email.value = ''
  form.elements.email.placeholder = data.email
}

async function updateBio(event) {
  event.preventDefault()

  let form = document.forms.bioForm

  data = {
    bio: form.elements.bio.value
  }

  await fetch('/api/updateaccount', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

async function updateUsername(event) {
  event.preventDefault()

  let form = document.forms.usernameForm

  data = {
    username: form.elements.username.value === '' ? form.elements.username.placeholder : form.elements.username.value
  }

  await fetch('/api/updateaccount', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  form.elements.username.value = ''
  form.elements.username.placeholder = data.username
}

async function updateImg(event) {
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

  await fetch('/api/updateaccount', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  window.location.href = '/dashboard/editaccount'
}

async function updatePassword(event) {
  event.preventDefault()

  let form = document.forms.passwordForm

  let data = {
    password: form.elements.newPwd.value
  }

  if (data.newPwd === '') {
    form.elements.newPwd.classList.add('is-invalid')
    return
  }

  form.elements.newPwd.classList.remove('is-invalid')

  await fetch('/api/updatepassword', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  window.location.href = '/dashboard/editaccount'
}

async function checkEmail() {
  let email = document.forms.emailForm.elements.email
  let submitBtn = document.forms.emailForm.elements.submit

  let result = await fetch(`/api/checkemail?email=${email.value}`).then(res => res.json())

  if (result) {
    email.classList.remove('is-invalid')
    email.classList.add('is-valid')
    submitBtn.disabled = false
  } else {
    email.classList.remove('is-valid')
    email.classList.add('is-invalid')
    submitBtn.disabled = true
  }
}

async function checkUsername() {
  let username = document.forms.usernameForm.elements.username
  let submitBtn = document.forms.usernameForm.elements.submit

  let result = await fetch(`/api/checkusername?username=${username.value}`).then(res => res.json())

  if (result) {
    username.classList.remove('is-invalid')
    username.classList.add('is-valid')
    submitBtn.disabled = false
  } else {
    username.classList.remove('is-valid')
    username.classList.add('is-invalid')
    submitBtn.disabled = true
  }
}

async function checkPassword() {
  let oldPwd = document.forms.passwordForm.elements.oldPwd
  let submitBtn = document.forms.passwordForm.elements.submit

  let result = await fetch(`/api/checkpassword?password=${oldPwd.value}`).then(res => res.json())

  if (result) {
    oldPwd.classList.remove('is-invalid')
    oldPwd.classList.add('is-valid')
    submitBtn.disabled = false
  } else {
    oldPwd.classList.remove('is-valid')
    oldPwd.classList.add('is-invalid')
    submitBtn.disabled = true
  }
}