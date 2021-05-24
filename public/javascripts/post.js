async function deleteComment(event) {
  let id = event.target.getAttribute('data-commentid')

  await fetch('/api/deletecomment', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id })
  })

  document.getElementById(id).remove()
}

function editComment(event) {
  let id = event.target.getAttribute('data-commentid')
  let content = $(`#${id} p`).text()
  console.log(content)
  $(`#${id} p`).remove()
  $(`#${id} hr`).remove()

  let textarea = $(`<textarea data-commenteditid="${id}" class="form-control mb-3">${content}</textarea>`)
  let editBtn = $(`<button data-commenteditid="${id}" class="btn btn-primary" onclick="updateComment(event)">Edit Comment</button>`)

  $(`#${id}`).append(textarea, editBtn, '<hr>')
}

async function updateComment(event) {
  let id = event.target.getAttribute('data-commenteditid')
  let content = $(`textarea[data-commenteditid=${id}]`).val()

  await fetch('/api/updatecomment', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id, data: { content: content } })
  })

  let p = $(`<p class="m-0 lead">${content}</p>`)

  $(`textarea[data-commenteditid=${id}]`).remove()
  $(`button[data-commenteditid=${id}]`).remove()
  $(`#${id} hr`).remove()

  $(`#${id}`).append(p, '<hr>')
}

$('#postComment').submit((event) => {
  event.preventDefault()

  let content = $('#comment').val()
  
  if (content === '') return
  
  $.post(`${window.location.pathname}/postcomment`, { content: content }, (result) => {
    if (!result) return
    $.get('/api/getavatar', (avatar) => {
      let content = 
        `<div id="${result._id}">` +
          `<div class="d-flex justify-content-between">` +
            `<a href="/user/${result.username}" class="d-flex">` +
              `<img src="${avatar}" alt="${result.username}" class="avatar me-2">` +
              '<div>' + 
                `<h4>${result.username}</h4>` +
                `<h4 class="fw-lighter">${new Date(result.date).toDateString()}</h4>` + 
              '</div>' +
            '</a>' +
            `<div class="dropdown">` +
              `<button class="btn btn-light border p-3 d-flex align-items-center justify-content-center" style="height: 10px;" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                ...
              </button>` +
              `<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">` +
                `<li>
                  <button class="dropdown-item" data-commentid="${result._id}" onclick="editComment(event)">Edit</button>
                </li>` +
                `<li>
                  <button class="dropdown-item" data-commentid="${result._id}" onclick="deleteComment(event)">Delete</button>
                </li>` +
              `</ul>` +
            `</div>` +
          '</div>' +
          `<p class="m-0 lead">${result.content}</p>` + 
          '<hr>' +
        '</div>'

      $('#comments-container').append(content)
      $('#comment').val('')
    })
  })
})

$('input[name="title"]').keyup((event) => {
  let title = event.target.value
  let slug = title.replace(/\s+/g, '-').toLowerCase()

  $.get('/api/checkslug', { slug: slug }, result => {
    if (result > 0) {
      slug = slug.concat(`-${result}`)
    }

    $('input[name="slug"]').val(slug)
  })
})

$('form[name="createpost"]').submit((event) => {
  event.preventDefault()

  let title = $('input[name="title"]').val()
  let content = $('textarea[name="content"]').val()
  let headerimg = $('input[name="headerimg"]').val()
  let slug = $('input[name="slug"]').val()

  let isPath = headerimg.includes('/images/')
  let isLink = headerimg.includes('https://') || headerimg.includes('http://')

  if (!isPath && !isLink) {
    headerimg = `/images/${headerimg}`
  }

  let data = {
    title: title,
    content: content,
    headerimg: headerimg,
    slug: slug,
    date: new Date(Date.now())
  }

  $.post('/post/create', data, result => {
    window.location.href = '/'
  })
})