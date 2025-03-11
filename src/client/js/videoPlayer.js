const video = document.querySelector('video')
const playBtn = document.querySelector('#play')
const playBtnIcon = playBtn.querySelector('i')
const muteBtn = document.querySelector('#mute')
const muteBtnIcon = muteBtn.querySelector('i')
const volumeRange = document.querySelector('#volume')
const currentTime = document.querySelector('#currentTime')
const totalTime = document.querySelector('#totalTime')
const timeline = document.querySelector('#timeline')
const fullScreenBtn = document.querySelector('#fullScreen')
const fullScreenIcon = fullScreenBtn.querySelector('i')
const videoContainer = document.querySelector('#videoContainer')
const videoControls = document.querySelector('#videoControls')

const TIME_STEP = 5
const CONTROLS_TIMEOUT = 3000

let volume = 0.5
video.volume = volume

let controlsTimeout = null

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(14, 19)
}

const togglePlay = () => {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
    clearTimeout(controlsTimeout)
    controlsTimeout = null
  }

  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause'
}

const toggleMute = () => {
  if (video.muted) {
    video.muted = false
  } else {
    video.muted = true
  }

  muteBtnIcon.classList = video.muted
    ? 'fas fa-volume-mute'
    : 'fas fa-volume-up'
  volumeRange.value = video.muted ? 0 : volume
}

const changeVolume = (event) => {
  const {
    target: { value },
  } = event
  if (video.muted) {
    video.mute = false
    muteBtnIcon.classList = 'fas fa-volume-up'
  }
  volume = value
  video.volume = value

  if (value == 0) {
    video.muted = true
    muteBtnIcon.classList = 'fas fa-volume-mute'
  }
}

const updateMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration))
  timeline.max = Math.floor(video.duration)
}

const updateTime = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime))
  timeline.value = Math.floor(video.currentTime)
}

const toggleFullScreen = () => {
  const fullScreen = document.fullscreenElement
  if (fullScreen) {
    document.exitFullscreen()
  } else {
    videoContainer.requestFullscreen()
  }
}

const changeFullScreenIcon = () => {
  const fullScreen = document.fullscreenElement
  fullScreenIcon.classList = fullScreen ? 'fas fa-compress' : 'fas fa-expand'
}

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout)
    controlsTimeout = null
  }
  videoControls.classList.add('showing')
  controlsTimeout = setTimeout(hideControls, CONTROLS_TIMEOUT)
}

const hideControls = () => {
  if (video.paused) return false
  videoControls.classList.remove('showing')
}

const handleKeydown = (event) => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout)
    controlsTimeout = null
  }
  videoControls.classList.add('showing')
  controlsTimeout = setTimeout(hideControls, CONTROLS_TIMEOUT)

  if (event.code === 'Space') {
    togglePlay()
  } else if (event.code === 'KeyF') {
    toggleFullScreen()
  } else if (event.code === 'KeyM') {
    toggleMute()
  } else if (event.code === 'ArrowRight') {
    video.currentTime += TIME_STEP
  } else if (event.code === 'ArrowLeft') {
    video.currentTime -= TIME_STEP
  }
}

const increaseView = async () => {
  const {
    dataset: { id },
  } = videoContainer
  await fetch(`/api/videos/${id}/view`, {
    method: 'POST',
  })
}

playBtn.addEventListener('click', togglePlay)
muteBtn.addEventListener('click', toggleMute)
volumeRange.addEventListener('input', changeVolume)
video.addEventListener('click', togglePlay)
video.readyState
  ? updateMetaData()
  : video.addEventListener('loadedmetadata', updateMetaData)
video.addEventListener('timeupdate', updateTime)
video.addEventListener('ended', increaseView)
timeline.addEventListener('input', (event) => {
  const {
    target: { value },
  } = event
  video.currentTime = value
})
fullScreenBtn.addEventListener('click', toggleFullScreen)
videoContainer.addEventListener('mousemove', handleMouseMove)
videoContainer.addEventListener('mouseleave', hideControls)
document.addEventListener('keydown', handleKeydown)
document.addEventListener('fullscreenchange', changeFullScreenIcon)
