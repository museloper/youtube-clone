const videoContainer = document.querySelector('#videoContainer')

const form = document.querySelector('#commentForm')

const addComment = (comment, newCommentId) => {
  const videoComments = document.querySelector('.video__comments ul')

  const newComment = document.createElement('li')
  newComment.className = 'video__comment'
  newComment.dataset.id = newCommentId

  const icon = document.createElement('i')
  icon.className = 'fas fa-comment'

  const span = document.createElement('span')
  span.innerText = ` ${comment}`

  const span2 = document.createElement('span')
  span.innerText = ' ❌'

  newComment.appendChild(icon)
  newComment.appendChild(span)
  newComment.appendChild(span2)

  videoComments.prepend(newComment)
}

const submit = async (event) => {
  event.preventDefault()

  const textarea = form.querySelector('textarea')
  const videoId = videoContainer.dataset.id
  const text = textarea.value

  if (!text) {
    return
  }

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })

  if (response.status === 201) {
    const { newCommentId } = await response.json()
    addComment(comment, newCommentId)
    textarea.value = ''
  }
}

if (form) form.addEventListener('submit', submit)
