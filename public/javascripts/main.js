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