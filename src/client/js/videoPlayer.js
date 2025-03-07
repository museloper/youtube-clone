const video = document.querySelector('video')
const playBtn = document.querySelector('#play')
const muteBtn = document.querySelector('#mute')
const time = document.querySelector('#time')
const volumeRange = document.querySelector('#volume')

// 초기 볼륨
let volume = 0.5
video.volume = volume

const handlePlayClick = (event) => {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }

  playBtn.innerText = video.paused ? 'Play' : 'Pause'
}

const handleMuteClick = (event) => {
  if (video.muted) {
    video.muted = false
  } else {
    video.muted = true
  }

  muteBtn.innerText = video.muted ? 'Unmute' : 'Mute'
  volumeRange.value = video.muted ? 0 : volume
}

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event
  if (video.muted) {
    video.mute = false
    muteBtn.innerText = 'Mute'
  }
  volume = value
  video.volume = value
}

playBtn.addEventListener('click', handlePlayClick)
muteBtn.addEventListener('click', handleMuteClick)
volumeRange.addEventListener('input', handleVolumeChange)
