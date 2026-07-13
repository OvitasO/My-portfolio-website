const youtubeView = document.getElementById('youtubeView');
const youtubeViewer = document.getElementById('youtubeViewer');

const hotkeyView = document.getElementById('hotkeyView');
const hotkeyViewer = document.getElementById('hotkeyViewer');


youtubeView.addEventListener('click', () => {
  youtubeViewer.classList.add('shown');
});

youtubeViewer.addEventListener('click', () => {
  youtubeViewer.classList.remove('shown');
})

hotkeyView.addEventListener('click', () => {
  hotkeyViewer.classList.add('shown');
});

hotkeyViewer.addEventListener('click', () => {
  hotkeyViewer.classList.remove('shown');
})