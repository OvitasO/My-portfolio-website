const windowList = [
  {
    id: 'linksWindow',
    open: false
  },

  {
    id: 'projectsWindow',
    open: false
  },

  {
    id: 'contactWindow',
    open: false
  }
]

const contactBtn = document.getElementById('contactBtn');
contactCloseBtn = document.getElementById('contactCloseBtn');

function openWindow(i) {
      document.getElementById(`${windowList[i].id}`)
        .classList.remove('closedWindow');
    }

function closeWindow(i) {
  document.getElementById(`${windowList[i].id}`)
    .classList.add('closedWindow');
}

contactBtn.addEventListener('click', () => {
  openWindow(2);
})

contactCloseBtn.addEventListener('click', () => {
  closeWindow(2);
})