const recordBtn = document.querySelector('#record')
const preview = document.querySelector('#preview')

let stream
let recorder
let video

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: 400,
      height: 300,
    },
    audio: false,
  })
  preview.srcObject = stream
  preview.play()
}

const startRecording = () => {
  recordBtn.innerText = 'Stop Recording'

  recordBtn.removeEventListener('click', startRecording)
  recordBtn.addEventListener('click', stopRecording)

  recorder = new MediaRecorder(stream)
  recorder.ondataavailable = (event) => {
    video = URL.createObjectURL(event.data)
    preview.srcObject = null
    preview.src = video
    preview.loop = true
    preview.play()
  }
  recorder.start()
}

const stopRecording = () => {
  recordBtn.innerText = 'Download Video'

  recordBtn.removeEventListener('click', stopRecording)
  recordBtn.addEventListener('click', downloadVideo)

  recorder.stop()
}

const downloadVideo = () => {
  const a = document.createElement('a')
  a.href = video
  a.download
  document.body.appendChild(a)
  a.click()
}

init()

recordBtn.addEventListener('click', startRecording)
