const videoContainer = document.querySelector('#videoContainer')

const form = document.querySelector('#commentForm')
const deleteBtns = document.querySelectorAll('.video__comments--delete')

const addComment = (text, newCommentId) => {
  const videoComments = document.querySelector('.video__comments ul')

  const newComment = document.createElement('li')
  newComment.className = 'video__comment'
  newComment.dataset.id = newCommentId

  const icon = document.createElement('i')
  icon.className = 'fas fa-comment'

  const span = document.createElement('span')
  span.innerText = ` ${text}`

  const span2 = document.createElement('span')
  span2.innerText = ' ❌'

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
    addComment(text, newCommentId)
    textarea.value = ''
  }
}

const deleteComment = async (event) => {
  const targetNode = event.target
  const li = targetNode.parentNode
  const commentId = li.dataset.id

  if (confirm('이 댓글을 삭제하시겠습니까?')) {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    })

    if (response.status === 200) {
      li.remove()
    }
  }
}

if (form) form.addEventListener('submit', submit)
deleteBtns.forEach((btn) => {
  btn.addEventListener('click', deleteComment)
})
