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

// Player
  // Music Playlist

const playlist = [
  {
    name: 'Chaos King - Toby Fox',
    isLongName: true,
    path: '../audio/music/ChaosKing.mp3'
  }
]


  // Play/Pause music

const music = new Audio(`${playlist[0].path}`);

function playMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

  // update player data

const trackMove = document.getElementById('trackMove');
const songName = document.getElementById('songName');
const secondSongName = document.getElementById('secondSongName');

function updatePlayer() {
  songName.innerHTML = playlist[0].name;
  if (playlist[0].isLongName) {
    secondSongName.innerHTML = playlist[0].name;
    trackMove.classList.add('animated');
  }
  else {
    secondSongName.innerHTML = '';
    trackMove.classList.remove('animated');
  }
}

  // Event listener for play/pause button

const playBtn = document.getElementById('playBtn');
const playBtnIcon = document.getElementById('playBtnIcon');
const playerBox = document.getElementById('playerBox');

playBtn.addEventListener('click', toggleMusic);

function toggleMusic() {
  if (soundMuted) {
    toggleAudioBtn.classList.add('alert');
    setTimeout(() => {
      toggleAudioBtn.classList.remove('alert');
    }, 500);
  } 
  else {
    playMusic();
    updatePlayer();
    togglePlayer();
  }  
}

  // show/hide Player

function togglePlayer() {
  if (!music.paused) {
    playBtnIcon.src = './images/lightMode/pause.svg';
    playerBox.classList.add('shown');
    playerBox.inert = false;
  }
  else {
    playBtnIcon.src = './images/lightMode/play.svg';
    playerBox.classList.remove('shown');
    playerBox.inert = true;
  }
}

  // Show/Hide volume slider

const trackVolumeBtn = document.getElementById('trackVolumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const trackVolumeContainer = document.getElementById('trackVolumeContainer');

let volumeSliderTimeout;

trackVolumeBtn.addEventListener('click', () => {
  clearTimeout(volumeSliderTimeout);
  volumeSlider.classList.toggle('shown');
  if (volumeSlider.classList.contains('shown')) {
    volumeSlider.inert = false;
  } else {
    volumeSlider.inert = true;
  }
});

trackVolumeContainer.addEventListener('mouseenter', () => {
  clearTimeout(volumeSliderTimeout);
})

trackVolumeContainer.addEventListener('mouseleave', () => {
  volumeSliderTimeout = setTimeout(() => {
    volumeSlider.classList.remove('shown');
  }, 1000);
})

// Toggle sound on/off

const toggleAudioBtn = document.getElementById('toggleAudio');

let soundMuted = JSON.parse(localStorage.getItem('sound')) ?? false;

toggleMute();

function toggleMute() {
  if (soundMuted) {
    toggleAudioBtn.classList.remove('notMuted');
    toggleAudioBtn.classList.add('muted');
    music.pause();
    togglePlayer();
  } else {
    toggleAudioBtn.classList.remove('muted');
    toggleAudioBtn.classList.add('notMuted');
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