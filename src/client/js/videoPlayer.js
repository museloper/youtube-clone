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

// 초기 볼륨
let volume = 0.5
video.volume = volume

let controlsTimeout = null
let controlsMovementTimeout = null

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(14, 19)
}

const handlePlayClick = () => {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }

  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause'
}

const handleMuteClick = () => {
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

const handleVolumeChange = (event) => {
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

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration))
  timeline.max = Math.floor(video.duration)
}

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime))
  timeline.value = Math.floor(video.currentTime)
}

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement
  if (fullScreen) {
    console.log('축소')
    document.exitFullscreen()
    fullScreenIcon.classList = 'fas fa-expand'
  } else {
    console.log('확대')
    videoContainer.requestFullscreen()
    fullScreenIcon.classList = 'fas fa-compress'
  }
}

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout)
    controlsTimeout = null
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout)
    controlsMovementTimeout = null
  }
  videoControls.classList.add('showing')
  controlsMovementTimeout = setTimeout(hideControls, 3000)
}

const hideControls = () => {
  videoControls.classList.remove('showing')
}

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000)
}

const handleKeydown = (event) => {
  if (event.code === 'Space') {
    handlePlayClick()
  } else if (event.code === 'KeyF') {
    handleFullScreen()
  } else if (event.code === 'KeyM') {
    handleMuteClick()
  } else if (event.code === 'ArrowRight') {
    video.currentTime += TIME_STEP
  } else if (event.code === 'ArrowLeft') {
    video.currentTime -= TIME_STEP
  }
}

playBtn.addEventListener('click', handlePlayClick)
muteBtn.addEventListener('click', handleMuteClick)
volumeRange.addEventListener('input', handleVolumeChange)
video.readyState
  ? handleLoadedMetadata()
  : video.addEventListener('loadedmetadata', handleLoadedMetadata)
video.addEventListener('timeupdate', handleTimeUpdate)
timeline.addEventListener('input', (event) => {
  const {
    target: { value },
  } = event
  video.currentTime = value
})
fullScreenBtn.addEventListener('click', handleFullScreen)
videoContainer.addEventListener('mousemove', handleMouseMove)
videoContainer.addEventListener('mouseleave', handleMouseLeave)
video.addEventListener('click', handlePlayClick)
document.addEventListener('keydown', handleKeydown)
