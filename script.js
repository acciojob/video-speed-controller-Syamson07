document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.player__video');
  const toggle = document.querySelector('.toggle');
  const skipButtons = document.querySelectorAll('.skip');
  const volumeSlider = document.querySelector('input[name="volume"]');
  const speedSlider = document.querySelector('input[name="playbackRate"]');
  const progress = document.querySelector('.progress');
  const progressBar = document.querySelector('.progress__filled');

  function togglePlay() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
  }

  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  function handleRangeUpdate() {
    video[this.name] = this.value;
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  if (video) {
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', handleProgress);

    toggle.addEventListener('click', togglePlay);
    skipButtons.forEach(button => button.addEventListener('click', skip));
    volumeSlider.addEventListener('input', handleRangeUpdate);
    speedSlider.addEventListener('input', handleRangeUpdate);

    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
  }
});
