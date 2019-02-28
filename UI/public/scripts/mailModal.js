const composeLayout = document.getElementById('compose-new');
const layoutRF = document.getElementById('replyforward');
const compose = document.getElementById('compose');
const send = document.getElementById('compose-send');
const deleteBtn = document.getElementById('compose-delete');
const rfSend = document.getElementById('rf-send');
const rfdelete = document.getElementById('rf-delete');
const replybtn = document.querySelector('div button#replybtn');
const fowardbtn = document.querySelector('div button#forwardbtn');
const contactViewLists = document.querySelectorAll('.layout-div ul li.collection-item ');
const addToGroup = document.querySelectorAll('li.gp-list');
const formLayout = document.getElementById('gp-form-page')

function removeComposeModal() {
  composeLayout.classList.add('hide');
  composeLayout.classList.remove('show');
}

function removeRFModal() {
  layoutRF.classList.add('hide');
  layoutRF.classList.remove('show');
}

compose.addEventListener('click', () => {
  composeLayout.classList.add('show');
  composeLayout.classList.remove('hide');
});

fowardbtn.addEventListener('click', () => {
  layoutRF.classList.add('show');
  layoutRF.classList.remove('hide');
});

replybtn.addEventListener('click', () => {
  layoutRF.classList.add('show');
  layoutRF.classList.remove('hide');
});


contactViewLists.forEach((list) =>{
  list.addEventListener('click', () => {
    composeLayout.classList.add('show');
    composeLayout.classList.remove('hide');
  });
});
console.log(addToGroup);
addToGroup.forEach((span) => {
  let spanModal = span.getElementsByTagName('span')[1];
  spanModal.addEventListener('click', () => {
    formLayout.classList.remove('hide');
    formLayout.classList.add('show');
  });
  
});

send.addEventListener('click', removeComposeModal);
deleteBtn.addEventListener('click', removeComposeModal);
rfSend.addEventListener('click', removeRFModal);
rfdelete.addEventListener('click', removeRFModal);



