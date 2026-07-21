function isDarkTheme() {
  return JSON.parse(localStorage.getItem('theme')) ?? false;
}

export const audioTypes =  {
  clickAudio: new Audio('./audio/audio/clickSound.mp3'),
  closeAudio: new Audio('./audio/audio/closeSound.mp3'),
  tickAudio: new Audio('../audio/audio/tick.mp3'),
  popAudio: new Audio('../audio/audio/pop.mp3'),
  imageHoverAudio: new Audio('../audio/audio/previewHover.mp3'),
  lightThemeAudio: new Audio('../audio/audio/lightTheme.mp3'),
  darkThemeAudio: new Audio('../audio/audio/darkTheme.mp3')
};


export function playAudio(audioType, volume=1, start=0) {
  audioType.volume = volume;
  audioType.playbackRate = 1;
  audioType.currentTime = start;
  audioType.play();
}

// event listeners

const toolListItems = document.querySelectorAll('.toolName');
const imagePreviews = document.querySelectorAll('.projectImgContainer');

toolListItems.forEach((tool) => {
  tool.addEventListener('mouseenter', () => {
    playAudio(audioTypes.tickAudio, 0.05, 0.0005);
  });
})

imagePreviews.forEach((image) => {
  image.addEventListener('mouseenter', () => {
    playAudio(audioTypes.imageHoverAudio, 0.02, 0.09);
  })
})

// Player
  // Music Playlist

const playlist = [
  {
    name: 'Chaos King - Toby Fox',
    isLongName: false,
    path: '../audio/music/ChaosKing.mp3'
  },
  {
    name: "Don't Forget (feat. Laura Shigihara) - Toby Fox",
    isLongName: true,
    animSpeed: 12,
    path: '../audio/music/dontForget.mp3'
  },
  {
    name: "It's Raining Somewhere Else - Toby Fox",
    isLongName: true,
    animSpeed: 9,
    path: "../audio/music/it'sRainingSomewhereElse.mp3"
  }
]


  // Play/Pause music

let musicIndex = 0;
const music = new Audio(`${playlist[musicIndex].path}`);

function playMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

  // Switch to next music when finished

music.addEventListener('ended', () => {
  nextTrack();
  updatePlayer();
  playMusic();
})

function nextTrack() {
  if (musicIndex >= playlist.length - 1) {
    musicIndex = 0
  }
  else {
    musicIndex++
  }
  music.src = playlist[musicIndex].path;
}

function previousTrack() {
  if (musicIndex === 0) {
    musicIndex = playlist.length - 1;
  }
  else {
    musicIndex--;
  }
  music.src = playlist[musicIndex].path;
}

  // forward/rewind buttons event listeners

const forwardBtn = document.getElementById('forwardBtn');
const rewindBtn = document.getElementById('rewindBtn');

forwardBtn.addEventListener('click', () => {
  if (soundMuted) {
    toggleAudioBtn.classList.add('alert');
    setTimeout(() => {
      toggleAudioBtn.classList.remove('alert');
    }, 500);
  }
  else {
    nextTrack();
    updatePlayer();
    playMusic();
    togglePlayer();
  }
})

rewindBtn.addEventListener('click', () => {
  if (soundMuted) {
    toggleAudioBtn.classList.add('alert');
    setTimeout(() => {
      toggleAudioBtn.classList.remove('alert');
    }, 500);
  }
  else {
    previousTrack();
    updatePlayer();
    playMusic();
    togglePlayer();
  }
})

  // update player data

const trackMove = document.getElementById('trackMove');
const songName = document.getElementById('songName');
const secondSongName = document.getElementById('secondSongName');

function updatePlayer() {
  songName.innerHTML = playlist[musicIndex].name;
  if (playlist[musicIndex].isLongName) {
    secondSongName.innerHTML = playlist[musicIndex].name;
    trackMove.classList.add('animated');
    trackMove.style.animationDuration = `${playlist[musicIndex].animSpeed}s`;
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

export function togglePlayer() {
  if (!music.paused) {
    playBtnIcon.src = isDarkTheme() ? './images/darkMode/pause.svg' : './images/lightMode/pause.svg';
    playerBox.classList.add('shown');
    playerBox.inert = false;
  }
  else {
    playBtnIcon.src = isDarkTheme() ? './images/darkMode/play.svg' : './images/lightMode/play.svg';
    playerBox.classList.remove('shown');
    playerBox.inert = true;
  }
}

  // Player progress bar and timers

const trackProgress = document.getElementById('trackProgress');
const playerSlider = document.getElementById('playerSlider');
const trackDuration = document.getElementById('trackDuration');

let isMoving = false;

music.addEventListener('loadedmetadata', () => {
  playerSlider.max = music.duration;

  playerSlider.style.setProperty('--progress', '0%');

  const maxMinutes = Math.floor(music.duration / 60);
  const maxSeconds = Math.floor(music.duration % 60);

  const formattedTime = `${maxMinutes}:${String(maxSeconds).padStart(2, '0')}`;

  trackDuration.textContent = formattedTime;
})

music.addEventListener('timeupdate', () => {
  if (!isMoving) {
    playerSlider.value = String(music.currentTime);

    const progress = playerSlider.value / playerSlider.max * 100;
    playerSlider.style.setProperty('--progress', `${progress}%`);
  }

  const minutes = Math.floor(music.currentTime / 60);
  const seconds = Math.floor(music.currentTime % 60);

  const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;

  trackProgress.textContent = formattedTime;
})

playerSlider.addEventListener('change', () => {
  music.currentTime = Number(playerSlider.value);
})

playerSlider.addEventListener('pointerdown', () => {
  isMoving = true;
})

playerSlider.addEventListener('pointerup', () => {
  isMoving = false;
})

playerSlider.addEventListener('input', () => {
  const progress = playerSlider.value / playerSlider.max * 100;
  playerSlider.style.setProperty('--progress', `${progress}%`);
})

  // loop Button

const loopBtn = document.getElementById('loopBtn');

loopBtn.addEventListener('click', () => {
  music.loop = !music.loop

  toggleLoop();
})

export function toggleLoop() {
  isDarkTheme() ? loopBtn.classList.add('dark') : loopBtn.classList.remove('dark');
  if (music.loop) {
    loopBtn.classList.add('active');
    music.loop = true;
  }
  else {
    loopBtn.classList.remove('active');
    music.loop = false;
  }
}

  // Show/Hide volume slider

const trackVolumeBtn = document.getElementById('trackVolumeBtn');
export const trackVolumeIcon = document.getElementById('trackVolumeIcon');
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

  // Change music volume

volumeSlider.value = music.volume;
volumeSlider.style.setProperty('--progress', `${Number(volumeSlider.value) * 100}%`);

volumeSlider.addEventListener('input', () => {
  music.volume = Number(volumeSlider.value);
  volumeSlider.style.setProperty('--progress', `${Number(volumeSlider.value) * 100}%`);
  updateVolumeIcon();
})

export function updateVolumeIcon() {
  if (isDarkTheme()) {
    if (music.volume === 0) {
    trackVolumeIcon.src = '../images/darkMode/volume-mute.svg';
    }
    else {
      trackVolumeIcon.src = '../images/darkMode/volume.svg';
    }
  }
  else {
    if (music.volume === 0) {
    trackVolumeIcon.src = '../images/lightMode/volume-mute.svg';
    }
    else {
      trackVolumeIcon.src = '../images/lightMode/volume.svg';
    }
}
  
}

// Toggle sound on/off

const toggleAudioBtn = document.getElementById('toggleAudio');

let soundMuted = JSON.parse(localStorage.getItem('sound')) ?? false;

export function toggleMute() {
  if (isDarkTheme()) {
    toggleAudioBtn.classList.add('dark');
    }
  else {
    toggleAudioBtn.classList.remove('dark');
  }
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
  playAudio(audioTypes.popAudio, 0.3);
  localStorage.setItem('sound', JSON.stringify(soundMuted));
})

  // copy song name to the clipboard

const playerTooltip = document.getElementById('playerTooltip');

let playerTooltipTimer;
playerBox.addEventListener('click', () => {
  navigator.clipboard.writeText(`${playlist[musicIndex].name}`);
  
  clearTimeout(playerTooltipTimer);
  playerTooltip.textContent = 'copied!';
  playerTooltipTimer = setTimeout(() => {
    playerTooltip.textContent = 'copy name';
  }, 1500);
})