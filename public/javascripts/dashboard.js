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

  let result = await fetch('/api/updateaccount', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json())

  form.elements.fName.value = ''
  form.elements.lName.value = ''

  if (result) {
    form.elements.fName.placeholder = data.fName
    form.elements.lName.placeholder = data.lName
    document.getElementById('updatenamemsg').innerText = 'Successfully updated name!'
    document.getElementById('updatenamemsg').classList.remove('text-danger')
    document.getElementById('updatenamemsg').classList.add('text-success')
  } else {
    document.getElementById('updatenamemsg').innerText = 'Failed to update name.'
    document.getElementById('updatenamemsg').classList.remove('text-success')
    document.getElementById('updatenamemsg').classList.add('text-danger')
  }
}

async function updateEmail(event) {
  event.preventDefault()

  let form = document.forms.emailForm

  data = {
    email: form.elements.email.value === '' ? form.elements.email.placeholder : form.elements.email.value
  }

  let result = await fetch('/api/updateaccount', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  form.elements.email.value = ''

  if (result) {
    form.elements.email.placeholder = data.email
    document.getElementById('updateemailmsg').innerText = 'Successfully updated email!'
    document.getElementById('updateemailmsg').classList.remove('text-danger')
    document.getElementById('updateemailmsg').classList.add('text-success')
  } else {
    document.getElementById('updateemailmsg').innerText = 'Failed to update email.'
    document.getElementById('updateemailmsg').classList.remove('text-success')
    document.getElementById('updateemailmsg').classList.add('text-danger')
  }
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

  let result = await fetch('/api/updateaccount', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json())

  form.elements.username.value = ''
  if (result) {
    form.elements.username.placeholder = data.username
    document.getElementById('loggedInUser').innerText = data.username
    document.getElementById('updateusermsg').innerText = 'Successfully updated username!'
    document.getElementById('updateusermsg').classList.remove('text-danger')
    document.getElementById('updateusermsg').classList.add('text-success')
  } else {
    document.getElementById('updateusermsg').innerText = 'Failed to update username.'
    document.getElementById('updateusermsg').classList.remove('text-success')
    document.getElementById('updateusermsg').classList.add('text-danger')
  }
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

  let result = await fetch('/api/updatepassword', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  // window.location.href = '/dashboard/editaccount'
  if (result) {
    document.getElementById('updatepasswordmsg').innerText = 'Successfully updated password!'
    document.getElementById('updatepasswordmsg').classList.remove('text-danger')
    document.getElementById('updatepasswordmsg').classList.add('text-success')
  } else {
    document.getElementById('updatepasswordmsg').innerText = 'Failed to update password.'
    document.getElementById('updatepasswordmsg').classList.remove('text-success')
    document.getElementById('updatepasswordmsg').classList.add('text-danger')
  }
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

async function deletePost(event) {
  let ans = confirm('Are you sure you want to delete this post?')

  if (!ans) {
    return
  }

  let slug = event.target.getAttribute('data-slug')

  await fetch('/api/deletepost', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug: slug })
  })

  document.getElementById(slug).remove()
}

async function editPost(event) {
  event.preventDefault()
  let oldslug = event.target.getAttribute('data-slug')
  let form = document.forms.editpost
  let headerimg = form.elements.headerimg.value
  let isPath = headerimg.includes('/images/')
  let isLink = headerimg.includes('https://') || headerimg.includes('http://')

  if (!isPath && !isLink) {
    headerimg = `/images/${headerimg}`
  }

  let data = {
    slug: oldslug,
    data: {
      title: form.elements.title.value,
      content: form.elements.content.value,
      headerimg: headerimg,
      slug: form.elements.slug.value
    }
  }

  let result = await fetch('/api/updatepost', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json())

  if (!result) {
    document.getElementById('editmsg').innerText = 'Error editing post.'
    return
  }

  window.location.href = '/dashboard/manageposts'
}

async function updateSlug(event) {
  let form = document.forms.editpost
  let title = event.target.value
  let slug = title.replace(/[^\w\s]/gi, '')
  slug = slug.replace(/\s+/g, '-').toLowerCase()
  

  if (title.toLowerCase() == form.elements.title.value.toLowerCase()) {
    form.elements.slug.value = slug
    return
  }

  let result = await fetch(`/api/checkslug?slug=${slug}`).then(res => res.json())

  if (result > 0) {
    slug = slug.concat(`-${result}`)
  }

  form.elements.slug.value = slug
}