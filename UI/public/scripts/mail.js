const inboxLayout = document.getElementById('inbox-set');
const sentLayout = document.getElementById('sent-set');
const draftLayout = document.getElementById('draft-set');
const contactLayout = document.getElementById('contact-set')
const inboxlist = document.getElementById('inbox-list');
const sentlist = document.getElementById('sent-list');
const draftlist = document.getElementById('draft-list');
const contactlist = document.getElementById('contact-list');
const inbox = document.getElementById('inbox');
const sent= document.getElementById('sent');
const draft = document.getElementById('draft');
const contact = document.getElementById('contact');
const linkedDiv = document.querySelectorAll('div.table-div .layout-div > div');
const mailView = document.getElementById('mailView');



inbox.addEventListener('click', () =>{
  inboxLayout.classList.add('show');
  inboxLayout.classList.remove('hide');
  inboxlist.classList.add('visited');
  sentLayout.classList.remove('show');
  sentLayout.classList.add('hide');
  sentlist.classList.remove('visited');
  draftLayout.classList.add('hide');
  draftLayout.classList.remove('show');
  draftlist.classList.remove('visited');
  contactLayout.classList.add('hide');
  contactLayout.classList.remove('show');
  contactlist.classList.remove('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
});

sent.addEventListener('click', () =>{
  inboxLayout.classList.remove('show');
  inboxLayout.classList.add('hide');
  inboxlist.classList.remove('visited');
  sentLayout.classList.add('show');
  sentLayout.classList.remove('hide');
  sentlist.classList.add('visited');
  draftLayout.classList.add('hide');
  draftLayout.classList.remove('show');
  draftlist.classList.remove('visited');
  contactLayout.classList.add('hide');
  contactLayout.classList.remove('show');
  contactlist.classList.remove('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
});

draft.addEventListener('click', () =>{
  inboxLayout.classList.remove('show');
  inboxLayout.classList.add('hide');
  inboxlist.classList.remove('visited');
  sentLayout.classList.remove('show');
  sentLayout.classList.add('hide');
  sentlist.classList.remove('visited');
  draftLayout.classList.remove('hide');
  draftLayout.classList.add('show');
  draftlist.classList.add('visited');
  contactLayout.classList.add('hide');
  contactLayout.classList.remove('show');
  contactlist.classList.remove('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
});

contact.addEventListener('click', () =>{
  inboxLayout.classList.remove('show');
  inboxLayout.classList.add('hide');
  inboxlist.classList.remove('visited');
  sentLayout.classList.remove('show');
  sentLayout.classList.add('hide');
  sentlist.classList.remove('visited');
  draftLayout.classList.add('hide');
  draftLayout.classList.remove('show');
  draftlist.classList.remove('visited');
  contactLayout.classList.remove('hide');
  contactLayout.classList.add('show');
  contactlist.classList.add('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
});


linkedDiv.forEach((div) => {
  div.addEventListener('click', () => {
    mailView.classList.add('show');
    mailView.classList.remove('hide');
    inboxLayout.classList.remove('show');
    inboxLayout.classList.add('hide');
    inboxlist.classList.remove('visited');
    sentLayout.classList.remove('show');
    sentLayout.classList.add('hide');
    sentlist.classList.remove('visited');
    draftLayout.classList.add('hide');
    draftLayout.classList.remove('show');
    draftlist.classList.remove('visited');
    contactLayout.classList.add('hide');
    contactLayout.classList.remove('show');
    contactlist.classList.remove('visited');
  });
});


