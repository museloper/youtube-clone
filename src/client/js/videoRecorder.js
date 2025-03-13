import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

const recordBtn = document.querySelector('#record')
const preview = document.querySelector('#preview')

const files = {
  input: 'recording.webm',
  output: 'recording.mp4',
  thumbnail: 'thumbnail.jpg',
}

const download = (url, name) => {
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
}

let stream
let recorder
let video
let ffmpeg
let isLoaded = false

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

  await loadFFmpeg()
}

const loadFFmpeg = async () => {
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
  ffmpeg = new FFmpeg()

  ffmpeg.on('log', ({ message }) => {
    console.log(message)
  })

  const ffmpegCoreUrl = await toBlobURL(
    `${baseURL}/ffmpeg-core.js`,
    'text/javascript'
  )
  const ffmpegWasmUrl = await toBlobURL(
    `${baseURL}/ffmpeg-core.wasm`,
    'application/wasm'
  )

  await ffmpeg.load({
    coreURL: ffmpegCoreUrl,
    wasmURL: ffmpegWasmUrl,
  })

  isLoaded = true
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

const downloadVideo = async () => {
  if (!isLoaded) {
    console.error('FFmpeg is not loaded yet.')
    return
  }

  recordBtn.removeEventListener('click', downloadVideo)
  recordBtn.innerText = 'Transcoding...'
  recordBtn.disabled = true

  await ffmpeg.writeFile(files.input, await fetchFile(video))

  await ffmpeg.exec(['-i', files.input, '-r', '60', files.output])
  await ffmpeg.exec([
    '-i',
    files.input,
    '-ss',
    '00:00:01',
    '-frames:v',
    '1',
    files.thumbnail,
  ])

  const mp4_binary = await ffmpeg.readFile(files.output)
  const thumbnail_binary = await ffmpeg.readFile(files.thumbnail)

  const mp4_blob = new Blob([mp4_binary.buffer], { type: 'video/mp4' })
  const thumbnail_blob = new Blob([thumbnail_binary.buffer], {
    type: 'image/jpg',
  })

  const mp4_url = URL.createObjectURL(mp4_blob)
  const thumbnail_url = URL.createObjectURL(thumbnail_blob)

  download(mp4_url, files.output)
  download(thumbnail_url, files.thumbnail)

  URL.revokeObjectURL(video)
  URL.revokeObjectURL(mp4_url)
  URL.revokeObjectURL(thumbnail_url)

  recordBtn.addEventListener('click', startRecording)
  recordBtn.innerText = 'Start Recording'
  recordBtn.disabled = false
}

init()

recordBtn.addEventListener('click', startRecording)
