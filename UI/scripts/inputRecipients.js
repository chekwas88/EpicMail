const compoReci = document.getElementById('recips');
const rfcReci = document.getElementById('rfc');

function tabSpaceC(e) {
  if (e.keyCode === 9 || e.keyCode === 33) {
    e.preventDefault();
    const txt = compoReci.value;
    compoReci.value = `${txt} `;
  }
}

function tabSpacerfc(e) {
  if (e.keyCode === 9 || e.keyCode === 33) {
    e.preventDefault();
    const txt = rfcReci.value;
    rfcReci.value = `${txt} `;
  }
}
compoReci.addEventListener('keydown', tabSpaceC);
rfcReci.addEventListener('keydown', tabSpacerfc);
