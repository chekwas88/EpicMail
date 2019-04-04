/* eslint-disable import/prefer-default-export */
const composeLayout = document.getElementById('compose-new');
const layoutRF = document.getElementById('replyforward');
const compose = document.getElementById('compose');
const compoCancel = document.getElementById('compox');
// const send = document.getElementById('compose-send');
const deleteBtn = document.getElementById('compose-delete');
const rfSend = document.getElementById('rf-send');
const rfdelete = document.querySelector('a span #rf-delete');
// const replybtn = document.querySelector('div button#replybtn');
// const fowardbtn = document.querySelector('div button#forwardbtn');
const getLink = document.querySelectorAll('li.gp-list');
const addToGroupLay = document.getElementById('gp-add-page');
const membersDisplay = document.getElementById('members-modal');
const closeMembersDisplay = document.getElementById('gp-member-close');
const createGPForm = document.getElementById('ct-gp-form-page');
const ctGPFormAdd = document.getElementById('ct-gp-form-sub');
const ctGPFormCancel = document.getElementById('ct-gp-form-cancel');
const createGPBtn = document.getElementById('creategroup');
const draftDiv = document.querySelectorAll('.draft-div div');
const contactViewLists = document.querySelectorAll('.layout-div ul li.collection-item ');
const gpAddCancel = document.getElementById('gp-add-cancel');


export function removeComposeModal() {
  composeLayout.classList.add('hide');
  composeLayout.classList.remove('show');
}

function removeCTGroupform() {
  createGPForm.classList.remove('show');
  createGPForm.classList.add('hide');
}

function removeRFModal() {
  layoutRF.classList.add('hide');
  layoutRF.classList.remove('show');
}

function getGpCreateForm() {
  createGPForm.classList.remove('hide');
  createGPForm.classList.add('show');
}

// function getReplyForwardModal() {
//   layoutRF.classList.add('show');
//   layoutRF.classList.remove('hide');
// }
function getComposeLayout() {
  composeLayout.classList.add('show');
  composeLayout.classList.remove('hide');
}

function getGroupLists() {
  const spanModal = [];
  getLink.forEach((span) => {
    spanModal.push(span.getElementsByTagName('span'));
  });
  return spanModal;
}

createGPBtn.addEventListener('click', getGpCreateForm);

compose.addEventListener('click', () => {
  composeLayout.classList.add('show');
  composeLayout.classList.remove('hide');
});

// fowardbtn.addEventListener('click', getReplyForwardModal);
// replybtn.addEventListener('click', getReplyForwardModal);

const spans = getGroupLists();

spans.forEach((span) => {
  span[1].addEventListener('click', () => {
    addToGroupLay.classList.remove('hide');
    addToGroupLay.classList.add('show');
  });
});

spans.forEach((span) => {
  span[3].addEventListener('click', () => {
    composeLayout.classList.add('show');
    composeLayout.classList.remove('hide');
  });
});

spans.forEach((span) => {
  span[4].addEventListener('click', getGpCreateForm);
});
getLink.forEach((span) => {
  const membersIcon = span.getElementsByTagName('span')[2];
  membersIcon.addEventListener('click', () => {
    membersDisplay.classList.remove('hide');
    membersDisplay.classList.add('show');
  });
});

closeMembersDisplay.addEventListener('click', () => {
  membersDisplay.classList.add('hide');
  membersDisplay.classList.remove('show');
});

draftDiv.forEach((div) => {
  div.addEventListener('click', getComposeLayout);
});

contactViewLists.forEach((list) => {
  list.addEventListener('click', getComposeLayout);
});

gpAddCancel.addEventListener('click', () => {
  addToGroupLay.classList.remove('show');
  addToGroupLay.classList.add('hide');
});

// export function composeMail(token, comMail, msgD) {
//   send.addEventListener('click', () => {
//     comMail(token, msgD);
//     removeComposeModal();
//   });
// }

compoCancel.addEventListener('click', removeComposeModal);
deleteBtn.addEventListener('click', removeComposeModal);
rfSend.addEventListener('click', removeRFModal);
rfdelete.addEventListener('click', removeRFModal);
ctGPFormAdd.addEventListener('click', removeCTGroupform);
ctGPFormCancel.addEventListener('click', removeCTGroupform);
