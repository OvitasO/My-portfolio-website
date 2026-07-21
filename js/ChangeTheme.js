import { audioTypes, playAudio } from "./audio.js";

const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const toggleThemeIcon = document.getElementById('toggleThemeIcon');

let darkTheme = JSON.parse(localStorage.getItem('theme')) ?? false;
updateTheme();

toggleThemeBtn.addEventListener('click', () => {
  darkTheme = !darkTheme
  
  if (darkTheme) {
    playAudio(audioTypes.darkThemeAudio, 0.2, 1, 0);
  }
  else {
    playAudio(audioTypes.lightThemeAudio, 0.2, 1, 0);
  }
  updateTheme();
  localStorage.setItem('theme', `${darkTheme}`);
})

function updateTheme() {
  if (darkTheme) {
    document.body.classList.add('dark');
    toggleThemeIcon.src = '../images/darkMode/moon.svg';
  }
  else {
    document.body.classList.remove('dark');
    toggleThemeIcon.src = '../images/lightMode/brightness.svg';
  }
}