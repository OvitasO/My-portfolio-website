const windowList = [
  {
    id: 'linksWindow',
    decorationId: 'linksDecoration'
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

const contactBtn = document.getElementById('contactBtn');
const contactCloseBtn = document.getElementById('contactCloseBtn');
const contactDecoration = document.getElementById('contactDecoration');


function openWindow(i) {
  document.getElementById(`${windowList[i].id}`)
    .classList.add('openedWindow');
    }

function closeWindow(i) {
  document.getElementById(`${windowList[i].id}`)
    .classList.remove('openedWindow');
}

function moveWindow(event, i) {
  const activeWindow = document.getElementById(`${windowList[i].id}`);
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

    activeWindow.style.left = `${windowNewX}px`;
    activeWindow.style.top = `${windowNewY}px`;
  }

  function pointerUp() {
    document.removeEventListener('pointermove', pointerMove);
    document.removeEventListener('pointerup', pointerUp);
    activeWindow.classList.remove('dragging');
  }
  
  document.addEventListener('pointermove', pointerMove);
  document.addEventListener('pointerup', pointerUp);
  
}

contactBtn.addEventListener('click', () => {
  openWindow(2);
})

contactCloseBtn.addEventListener('click', () => {
  closeWindow(2);
})

contactDecoration.addEventListener('pointerdown', (event) => {
  moveWindow(event, 2);
})