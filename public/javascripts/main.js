$(document).ready(() => {

  $('#search').keyup(() => {
    $.get('/search/check', { content: $('#search').val() }, (result) => {

      $('#results').empty()
      for (post of result) {
        let elem = `<a href="/post/${post.slug}" class="px-3 py-2 text-start">${post.title}</a>`

        $('#results').append(elem)
      }

      if ($('#search').val() === '') {
        $('#results').empty()
      }
    })
  })

  $('#postComment').submit((event) => {
    event.preventDefault()

    let content = $('#comment').val()
    
    if (content === '') return
    
    $.post(`${window.location.pathname}/postcomment`, { content: content }, (result) => {
      if (!result) return
      $.get('/getavatar', (avatar) => {
        let content = 
          `<a href="/user/${result.username}" class="d-flex">` +
            `<img src="${avatar}" alt="${result.username}" class="avatar me-2">` +
            '<div>' + 
              `<h4>${result.username}</h4>` +
              `<h4 class="fw-lighter">${new Date(result.date).toDateString()}</h4>` + 
            '</div>' +
          '</a>' +
          `<p class="m-0 lead">${result.content}</p>` + 
          '<hr>'

        $('#comments-container').append(content)

        $('#comment').val('')
      })
    })
  })
})