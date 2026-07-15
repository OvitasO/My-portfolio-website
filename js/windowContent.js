// projects window

const youtubeView = document.getElementById('youtubeView');
const youtubeViewer = document.getElementById('youtubeViewer');

const hotkeyView = document.getElementById('hotkeyView');
const hotkeyViewer = document.getElementById('hotkeyViewer');
const hotkeyDemo = document.getElementById('hotkeyDemo');


youtubeView.addEventListener('click', () => {
  youtubeViewer.classList.add('shown');
});

youtubeViewer.addEventListener('click', () => {
  youtubeViewer.classList.remove('shown');
})

hotkeyView.addEventListener('click', () => {
  hotkeyViewer.classList.add('shown');
  hotkeyDemo.currentTime = 0;
  hotkeyDemo.play();
});

hotkeyViewer.addEventListener('click', () => {
  hotkeyViewer.classList.remove('shown');
})

// contact window

