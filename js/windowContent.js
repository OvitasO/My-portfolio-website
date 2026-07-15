// projects window

  // code for showing demos/full images when clicking on preview

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

  // copying email to clipboard

const emailAdress = document.getElementById('adress');
const adressTooltip = document.getElementById('adressTooltip');
let tooltipTimer;
emailAdress.addEventListener('click', () => {
  navigator.clipboard.writeText(`${emailAdress.textContent}`);

  clearTimeout(tooltipTimer);
  adressTooltip.textContent = 'copied!';
  tooltipTimer = setTimeout(() => {
    adressTooltip.textContent = 'copy to clipboard';
  }, 1500)
})