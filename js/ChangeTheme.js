import * as audio from "./audio.js";

const toggleThemeBtn = document.getElementById('toggleThemeBtn');

const webIconPng = document.getElementById('webIconPng');
const webIconSvg = document.getElementById('webIconSvg');

function updateTheme() {
  if (darkTheme) {
    document.body.classList.add('dark');
    webIconPng.href = './images/websiteIcons/websiteIconDark.png';
    webIconSvg.href = './images/websiteIcons/websiteIconDark.svg';
  }
  else {
    document.body.classList.remove('dark');
    webIconPng.href = './images/websiteIcons/websiteIcon.png';
    webIconSvg.href = './images/websiteIcons/websiteIcon.svg';
  }
  updateIcons();
}

// ICONS

  // panel icons

const musicRewind = document.getElementById('musicRewind');
const musicForward = document.getElementById('musicForward');
const playBtnIcon = document.getElementById('playBtnIcon');
const toggleThemeIcon = document.getElementById('toggleThemeIcon');

  // footer icons

const githubQuickLink = document.getElementById('githubQuickLink');

  // mainWindow icons

const aboutWindowIcon = document.getElementById('aboutWindowIcon');
const projectsWindowIcon = document.getElementById('projectsWindowIcon');
const contactWindowIcon = document.getElementById('contactWindowIcon');

function updateIcons() {
  if (darkTheme) {
    // panel icons
    toggleThemeIcon.src = './images/darkMode/moon.svg';
    musicRewind.src = './images/darkMode/rewind.svg';
    musicForward.src = './images/darkMode/forward.svg';
    audio.togglePlayer();
    audio.toggleMute();
    // player icons
    audio.toggleLoop();
    audio.updateVolumeIcon();
    // footer icons
    githubQuickLink.src = './images/darkMode/icons/github.svg'
    // mainWindow icons
    aboutWindowIcon.src = './images/darkMode/windowIcons/about.svg'
    projectsWindowIcon.src = './images/darkMode/windowIcons/projects.svg'
    contactWindowIcon.src = './images/darkMode/windowIcons/contact.svg'
  }
  else {
    // panel icons
    toggleThemeIcon.src = './images/lightMode/brightness.svg';
    musicRewind.src = './images/lightMode/rewind.svg';
    musicForward.src = './images/lightMode/forward.svg';
    audio.togglePlayer();
    audio.toggleMute();
    // player icons
    audio.toggleLoop();
    audio.updateVolumeIcon();
    // footer icons
    githubQuickLink.src = './images/lightMode/icons/github.svg'
    // mainWindow icons
    aboutWindowIcon.src = './images/lightMode/windowIcons/about.svg'
    projectsWindowIcon.src = './images/lightMode/windowIcons/projects.svg'
    contactWindowIcon.src = './images/lightMode/windowIcons/contact.svg'
  }
}

let darkTheme = JSON.parse(localStorage.getItem('theme')) ?? false;
updateTheme();

toggleThemeBtn.addEventListener('click', () => {
  darkTheme = !darkTheme
  localStorage.setItem('theme', JSON.stringify(darkTheme));

  if (darkTheme) {
    audio.playAudio(audio.audioTypes.darkThemeAudio, 0.2);
  }
  else {
    audio.playAudio(audio.audioTypes.lightThemeAudio, 0.2);
  }
  updateTheme();
})