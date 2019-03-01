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
const contactFormLayout = document.getElementById('ct-form-page')
const closeMembersDisplay = document.getElementById('gp-member-close');
const contactFormSubmit  = document.getElementById('ct-form-sub');


function removeComposeModal() {
  composeLayout.classList.add('hide');
  composeLayout.classList.remove('show');
}

function removeRFModal() {
  layoutRF.classList.add('hide');
  layoutRF.classList.remove('show');
}

function removeGPForm() {
  formLayout.classList.add('hide');
  formLayout.classList.remove('show');
}

function getGroupLists() {
  let spanModal = [];
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
  let membersIcon = span.getElementsByTagName('span')[2];
  membersIcon.addEventListener('click', () => {
    membersDisplay.classList.remove('hide');
    membersDisplay.classList.add('show');
  });
});



closeMembersDisplay.addEventListener('click', () => {
  membersDisplay.classList.add('hide');
  membersDisplay.classList.remove('show');
});

profileMail.addEventListener('click', () => {
  composeLayout.classList.add('show');
  composeLayout.classList.remove('hide');
});

send.addEventListener('click', removeComposeModal);
deleteBtn.addEventListener('click', removeComposeModal);
rfSend.addEventListener('click', removeRFModal);
rfdelete.addEventListener('click', removeRFModal);
gpFormAdd.addEventListener('click', removeGPForm);
gpFormCancel.addEventListener('click', removeGPForm);



