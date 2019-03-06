const composeLayout = document.getElementById('compose-new');
const layoutRF = document.getElementById('replyforward');
const compose = document.getElementById('compose');
const send = document.getElementById('compose-send');
const deleteBtn = document.getElementById('compose-delete');
const gpFormAdd = document.getElementById('gp-form-sub');
const gpFormCancel = document.getElementById('gp-form-cancel');
const rfSend = document.getElementById('rf-send');
const rfdelete = document.querySelector('a span #rf-delete');
const replybtn = document.querySelector('div button#replybtn');
const fowardbtn = document.querySelector('div button#forwardbtn');
const profileMail = document.getElementById('profile-mail');
const getLink = document.querySelectorAll('li.gp-list');
const formLayout = document.getElementById('gp-form-page');
const membersDisplay = document.getElementById('members-modal');
const addcontact = document.getElementById('addcontact');
const contactFormLayout = document.getElementById('ct-form-page');
const closeMembersDisplay = document.getElementById('gp-member-close');
const contactFormSubmit = document.getElementById('ct-form-sub');
const createGPForm = document.getElementById('ct-gp-form-page');
const ctGPFormAdd = document.getElementById('ct-gp-form-sub');
const ctGPFormCancel = document.getElementById('ct-gp-form-cancel');
const createGPBtn = document.getElementById('creategroup');
const draftDiv = document.querySelectorAll('.draft-div div');


function removeComposeModal() {
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

function removeGPForm() {
  formLayout.classList.add('hide');
  formLayout.classList.remove('show');
}

function getReplyForwardModal() {
  layoutRF.classList.add('show');
  layoutRF.classList.remove('hide');
}
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

addcontact.addEventListener('click', () => {
  contactFormLayout.classList.add('show');
  contactFormLayout.classList.remove('hide');
});

contactFormSubmit.addEventListener('click', () => {
  contactFormLayout.classList.add('hide');
  contactFormLayout.classList.remove('show');
});

createGPBtn.addEventListener('click', () => {
  createGPForm.classList.remove('hide');
  createGPForm.classList.add('show');
});

compose.addEventListener('click', () => {
  composeLayout.classList.add('show');
  composeLayout.classList.remove('hide');
});

fowardbtn.addEventListener('click', getReplyForwardModal);
replybtn.addEventListener('click', getReplyForwardModal);

const spans = getGroupLists();

spans.forEach((span) => {
  span[1].addEventListener('click', () => {
    formLayout.classList.remove('hide');
    formLayout.classList.add('show');
  });
});

spans.forEach((span) => {
  span[3].addEventListener('click', () => {
    composeLayout.classList.add('show');
    composeLayout.classList.remove('hide');
  });
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

profileMail.addEventListener('click', getComposeLayout);

send.addEventListener('click', removeComposeModal);
deleteBtn.addEventListener('click', removeComposeModal);
rfSend.addEventListener('click', removeRFModal);
rfdelete.addEventListener('click', removeRFModal);
gpFormAdd.addEventListener('click', removeGPForm);
gpFormCancel.addEventListener('click', removeGPForm);
ctGPFormAdd.addEventListener('click', removeCTGroupform);
ctGPFormCancel.addEventListener('click', removeCTGroupform);
