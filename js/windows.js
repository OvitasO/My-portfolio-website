const windowList = [
  {
    id: 'aboutWindow',
    decorationId: 'aboutDecoration'
  },

  {
    id: 'projectsWindow',
    decorationId: 'projectsDecoration'
  },

  {
    id: 'contactWindow',
    decorationId: 'contactDecoration'
  }
]

// window elements

const contactWindow = document.getElementById('contactWindow');
const contactBtn = document.getElementById('contactBtn');
const contactCloseBtn = document.getElementById('contactCloseBtn');
const contactDecoration = document.getElementById('contactDecoration');

const aboutWindow = document.getElementById('aboutWindow');
const aboutBtn = document.getElementById('aboutBtn');
const aboutCloseBtn = document.getElementById('aboutCloseBtn');
const aboutDecoration = document.getElementById('aboutDecoration');

const projectsWindow = document.getElementById('projectsWindow');
const projectsBtn = document.getElementById('projectsBtn');
const projectsCloseBtn = document.getElementById('projectsCloseBtn');
const projectsDecoration = document.getElementById('projectsDecoration');

// functions

let highZindex = 100

function makeActive(i) {
  const activeWindow = document.getElementById(`${windowList[i].id}`);

  activeWindow.style.zIndex = ++highZindex;
}

function openWindow(i) {
  makeActive(i)
  document.getElementById(`${windowList[i].id}`)
    .classList.add('openedWindow');
    }

function closeWindow(i) {
  document.getElementById(`${windowList[i].id}`)
    .classList.remove('openedWindow');
}

function moveWindow(event, i) {
  makeActive(i);
  
  const activeWindow = document.getElementById(`${windowList[i].id}`);
  const windowDecoration = document.getElementById(`${windowList[i].decorationId}`);
  const pointerInitial = {'X': event.clientX, 'Y': event.clientY};
  const windowInitial = activeWindow.getBoundingClientRect();
  const windowInitialX = windowInitial.left;
  const windowInitialY = windowInitial.top;

  activeWindow.classList.add('dragging');

  function pointerMove(event) {
    const pointerMoveX = event.clientX - pointerInitial.X;
    const pointerMoveY = event.clientY - pointerInitial.Y;

    const windowNewX = windowInitialX + pointerMoveX; 
    const windowNewY = windowInitialY + pointerMoveY;

    const MaxX = window.innerWidth - windowDecoration.getBoundingClientRect().width;
    const MaxY = window.innerHeight - windowDecoration.getBoundingClientRect().height;

    const newLimitedX = Math.min(Math.max(windowNewX, 0), MaxX);
    const newLimitedY = Math.min(Math.max(windowNewY, 0), MaxY);

    activeWindow.style.left = `${newLimitedX}px`;
    activeWindow.style.top = `${newLimitedY}px`;
  }

  function pointerUp() {
    document.removeEventListener('pointermove', pointerMove);
    document.removeEventListener('pointerup', pointerUp);
    activeWindow.classList.remove('dragging');
  }
  
  document.addEventListener('pointermove', pointerMove);
  document.addEventListener('pointerup', pointerUp);
  
}

// Window Event Listeners

contactBtn.addEventListener('click', () => {
  openWindow(2);
})

contactCloseBtn.addEventListener('click', () => {
  closeWindow(2);
})

contactWindow.addEventListener('click', () => {
  makeActive(2)
})

contactDecoration.addEventListener('pointerdown', (event) => {
  moveWindow(event, 2);
})


aboutBtn.addEventListener('click', () => {
  openWindow(0);
})

aboutCloseBtn.addEventListener('click', () => {
  closeWindow(0);
})

aboutWindow.addEventListener('click', () => {
  makeActive(0)
})

aboutDecoration.addEventListener('pointerdown', (event) => {
  moveWindow(event, 0);
})



projectsBtn.addEventListener('click', () => {
  openWindow(1);
})

projectsCloseBtn.addEventListener('click', () => {
  closeWindow(1);
})

projectsWindow.addEventListener('click', () => {
  makeActive(1)
})

projectsDecoration.addEventListener('pointerdown', (event) => {
  moveWindow(event, 1);
})

// closing project modals

import { youtubeViewer, hotkeyViewer } from './windowContent.js';

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') { return };

  youtubeViewer.classList.remove('shown');
  hotkeyViewer.classList.remove('shown');
});