const video = document.getElementById('video');
const playBtn = document.getElementById('playBtn');
const muteBtn = document.getElementById('muteBtn');
const volume = document.getElementById('volume');
const progress = document.getElementById('progress');
const timeDisplay = document.getElementById('time');
const speed = document.getElementById('speed');
const fsBtn = document.getElementById('fsBtn');

// Play / Pause
playBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});
video.addEventListener('play', () => playBtn.textContent = '⏸️');
video.addEventListener('pause', () => playBtn.textContent = '▶️');

// Mute
muteBtn.addEventListener('click', () => {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? '🔈' : '🔊';
});

// Volume
volume.addEventListener('input', () => {
  video.volume = volume.value;
});

// Progress bar update
video.addEventListener('timeupdate', () => {
  progress.value = video.currentTime;
  updateTime();
});

// Seek
video.addEventListener('loadedmetadata', () => {
  progress.max = video.duration;
  updateTime();
});
progress.addEventListener('input', () => {
  video.currentTime = progress.value;
});

// Time display
function formatTime(sec) {
  sec = Math.floor(sec);
  let m = Math.floor(sec / 60);
  let s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
function updateTime() {
  let current = formatTime(video.currentTime);
  let total = formatTime(video.duration);
  timeDisplay.textContent = `${current} / ${total}`;
}

// Playback speed
speed.addEventListener('change', () => {
  video.playbackRate = speed.value;
});

// Fullscreen
fsBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});