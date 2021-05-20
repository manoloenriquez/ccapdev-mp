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

  console.log(ans)

  // redirect to home page signed out
  if (ans) {
    window.location.href = '../../../index.html'
  }
}