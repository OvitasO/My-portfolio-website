export const audioTypes =  {
  clickAudio: new Audio('./audio/audio/clickSound.mp3'),
  closeAudio: new Audio('./audio/audio/closeSound.mp3'),
  tickAudio: new Audio('../audio/audio/tick.mp3'),
  popAudio: new Audio('../audio/audio/pop.mp3'),
  imageHoverAudio: new Audio('../audio/audio/imageHover.mp3')
};


export function playAudio(audioType, volume=1, speed=1, start=0) {
  audioType.volume = volume;
  audioType.playbackRate = speed;
  audioType.currentTime = start;
  audioType.play();
}

// event listeners

const toolListItems = document.querySelectorAll('.toolName');
const imagePreviews = document.querySelectorAll('.projectImgContainer');

toolListItems.forEach((tool) => {
  tool.addEventListener('mouseenter', () => {
    playAudio(audioTypes.tickAudio, 0.05, 1.2, 0.0005);
  });
})

imagePreviews.forEach((image) => {
  image.addEventListener('mouseenter', () => {
    playAudio(audioTypes.imageHoverAudio, 0.3, 1.1, 0.02);
  })
})

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
  playAudio(audioTypes.popAudio, 0.3, 1, 0);
  localStorage.setItem('sound', `${soundMuted}`);
})

// Player

const trackVolumeBtn = document.getElementById('trackVolumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const trackVolumeContainer = document.getElementById('trackVolumeContainer');

let volumeSliderTimeout;

trackVolumeBtn.addEventListener('click', () => {
  clearTimeout(volumeSliderTimeout);
  volumeSlider.classList.toggle('shown');
});

trackVolumeContainer.addEventListener('mouseenter', () => {
  clearTimeout(volumeSliderTimeout);
})

trackVolumeContainer.addEventListener('mouseleave', () => {
  volumeSliderTimeout = setTimeout(() => {
    volumeSlider.classList.remove('shown');
  }, 1000);
})
