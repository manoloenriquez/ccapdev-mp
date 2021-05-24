async function deleteComment(event) {
  let id = event.target.getAttribute('data-commentid')

  await fetch('/api/deletecomment', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id })
  })

  document.getElementById(id).remove()
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
          `<button data-commentid="${result._id}" class="btn" onclick="deleteComment(event)">...</button>` +
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