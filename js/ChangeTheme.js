import * as audio from "./audio.js";

const toggleThemeBtn = document.getElementById('toggleThemeBtn');

function updateTheme() {
  if (darkTheme) {
    document.body.classList.add('dark');
  }
  else {
    document.body.classList.remove('dark');
  }
  updateIcons();
}

// ICONS

  // panel icons

const musicRewind = document.getElementById('musicRewind');
const musicForward = document.getElementById('musicForward');
const playBtnIcon = document.getElementById('playBtnIcon');
const toggleThemeIcon = document.getElementById('toggleThemeIcon');

function updateIcons() {
  if (darkTheme) {
    // panel icons
    toggleThemeIcon.src = '../images/darkMode/moon.svg';
    musicRewind.src = '../images/darkMode/rewind.svg';
    musicForward.src = '../images/darkMode/forward.svg';
    audio.togglePlayer();
    audio.toggleMute();
  }
  else {
    // panel icons
    toggleThemeIcon.src = '../images/lightMode/brightness.svg';
    musicRewind.src = '../images/lightMode/rewind.svg';
    musicForward.src = '../images/lightMode/forward.svg';
    audio.togglePlayer();
    audio.toggleMute();
  }
}

let darkTheme = JSON.parse(localStorage.getItem('theme')) ?? false;
updateTheme();

toggleThemeBtn.addEventListener('click', () => {
  darkTheme = !darkTheme
  localStorage.setItem('theme', JSON.stringify(darkTheme));

  if (darkTheme) {
    audio.playAudio(audio.audioTypes.darkThemeAudio, 0.2, 1, 0);
  }
  else {
    audio.playAudio(audio.audioTypes.lightThemeAudio, 0.2, 1, 0);
  }
  updateTheme();
})