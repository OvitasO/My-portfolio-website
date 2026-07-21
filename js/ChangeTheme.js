import { audioTypes, playAudio } from "./audio.js";

const toggleThemeBtn = document.getElementById('toggleThemeBtn');

let darkTheme = false;

toggleThemeBtn.addEventListener('click', () => {
  darkTheme = !darkTheme
  
  if (darkTheme) {
    playAudio(audioTypes.darkThemeAudio, 0.2, 1, 0);
  }
  else {
    playAudio(audioTypes.lightThemeAudio, 0.2, 1, 0);
  }
})