const youtubeView = document.getElementById('youtubeView');
const youtubeViewer = document.getElementById('youtubeViewer');


youtubeView.addEventListener('click', () => {
  youtubeViewer.classList.add('shown');
});

youtubeViewer.addEventListener('click', () => {
  youtubeViewer.classList.remove('shown');
})