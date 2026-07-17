export const audioTypes =  {
  clickAudio: new Audio('./audio/audio/clickSound.mp3'),
  closeAudio: new Audio('./audio/audio/closeSound.mp3')
};


export function playAudio(audioType, volume=1, speed=1, start=0) {
  audioType.volume = volume;
  audioType.playbackRate = speed;
  audioType.currentTime = start;
  audioType.play();
}

// Toggle sound on/off

const toggleAudioBtn = document.getElementById('toggleAudio');
const audioIcon = document.getElementById('audioIcon');

let soundMuted = JSON.parse(localStorage.getItem('sound')) ?? false;

toggleMute();

function toggleMute() {
  if (soundMuted) {
    audioIcon.src = '../images/lightMode/volume-mute.svg';
  } else {
    audioIcon.src = '../images/lightMode/volume.svg'
  }
    Object.values(audioTypes).forEach((sound) => {
      sound.muted = soundMuted;
    })
}


toggleAudioBtn.addEventListener('click', () => {
  soundMuted = !soundMuted

  toggleMute();
  localStorage.setItem('sound', `${soundMuted}`);
})