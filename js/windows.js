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

// window elements

const contactWindow = document.getElementById('contactWindow');
const contactBtn = document.getElementById('contactBtn');
const contactCloseBtn = document.getElementById('contactCloseBtn');
const contactDecoration = document.getElementById('contactDecoration');

const linksWindow = document.getElementById('linksWindow');
const linksBtn = document.getElementById('linksBtn');
const linksCloseBtn = document.getElementById('linksCloseBtn');
const linksDecoration = document.getElementById('linksDecoration');

// functions

function makeActive(i) {
  document.getElementById(`${windowList[0].id}`)
    .classList.remove('active');
  // document.getElementById(`${windowList[1].id}`)
  //   .classList.remove('active');
  document.getElementById(`${windowList[2].id}`)
    .classList.remove('active');

  document.getElementById(`${windowList[i].id}`)
    .classList.add('active');
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

linksBtn.addEventListener('click', () => {
  openWindow(0);
})

linksCloseBtn.addEventListener('click', () => {
  closeWindow(0);
})

linksWindow.addEventListener('click', () => {
  makeActive(0)
})

linksDecoration.addEventListener('pointerdown', (event) => {
  moveWindow(event, 0);
})