const videoContainer = document.querySelector('#videoContainer')

const form = document.querySelector('#commentForm')

const submit = (event) => {
  event.preventDefault()

  const textarea = form.querySelector('textarea')
  const videoId = videoContainer.dataset.id
  const text = textarea.value

  if (!text) {
    return
  }

  fetch(`/api/videos/${videoId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })
}

if (form) form.addEventListener('submit', submit)
