const inboxLayout = document.getElementById('inbox-set');
const sentLayout = document.getElementById('sent-set');
const draftLayout = document.getElementById('draft-set');
const contactLayout = document.getElementById('contact-set');
const profileLayout = document.getElementById('profile-set');
const groupLayout = document.getElementById('group-set');
const profilelist = document.getElementById('profile-list');
const grouplist = document.getElementById('group-list');
const inboxlist = document.getElementById('inbox-list');
const sentlist = document.getElementById('sent-list');
const draftlist = document.getElementById('draft-list');
const contactlist = document.getElementById('contact-list');
const linkedDiv = document.querySelectorAll('div.table-div .layout-div > div');
const draftDiv = document.querySelectorAll('.draft-div div');
const mailView = document.getElementById('mailView');
const draftMailView = document.getElementById('draft-open');
const contactViewLists = document.querySelectorAll('.layout-div ul li.collection-item ');


function getProfileSet() {
  profileLayout.classList.add('show');
  profileLayout.classList.remove('hide');
  profilelist.classList.add('visited');
  inboxLayout.classList.add('hide');
  inboxLayout.classList.remove('show');
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
  mailView.classList.add('hide');
  mailView.classList.remove('show');
  groupLayout.classList.remove('show');
  groupLayout.classList.add('hide');
  grouplist.classList.remove('visited');
  draftMailView.classList.add('hide');
  draftMailView.classList.remove('show');
}

inboxlist.addEventListener('click', () => {
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
  profileLayout.classList.add('hide');
  profileLayout.classList.remove('show');
  profilelist.classList.remove('visited');
  groupLayout.classList.remove('show');
  groupLayout.classList.add('hide');
  grouplist.classList.remove('visited');
  draftMailView.classList.add('hide');
  draftMailView.classList.remove('show');
});

profilelist.addEventListener('click', getProfileSet);

sentlist.addEventListener('click', () => {
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
  profileLayout.classList.add('hide');
  profileLayout.classList.remove('show');
  profilelist.classList.remove('visited');
  groupLayout.classList.remove('show');
  groupLayout.classList.add('hide');
  grouplist.classList.remove('visited');
  draftMailView.classList.add('hide');
  draftMailView.classList.remove('show');
});

draftlist.addEventListener('click', () => {
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
  profileLayout.classList.add('hide');
  profileLayout.classList.remove('show');
  profilelist.classList.remove('visited');
  groupLayout.classList.remove('show');
  groupLayout.classList.add('hide');
  grouplist.classList.remove('visited');
  draftMailView.classList.add('hide');
  draftMailView.classList.remove('show');
});

contactlist.addEventListener('click', () => {
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
  profileLayout.classList.add('hide');
  profileLayout.classList.remove('show');
  profilelist.classList.remove('visited');
  groupLayout.classList.remove('show');
  groupLayout.classList.add('hide');
  grouplist.classList.remove('visited');
  draftMailView.classList.add('hide');
  draftMailView.classList.remove('show');
});

grouplist.addEventListener('click', () => {
  inboxLayout.classList.remove('show');
  inboxLayout.classList.add('hide');
  inboxlist.classList.remove('visited');
  sentLayout.classList.remove('show');
  sentLayout.classList.add('hide');
  sentlist.classList.remove('visited');
  draftLayout.classList.add('hide');
  draftLayout.classList.remove('show');
  draftlist.classList.remove('visited');
  contactLayout.classList.remove('show');
  contactLayout.classList.add('hide');
  contactlist.classList.remove('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
  profileLayout.classList.add('hide');
  profileLayout.classList.remove('show');
  profilelist.classList.remove('visited');
  groupLayout.classList.add('show');
  groupLayout.classList.remove('hide');
  grouplist.classList.add('visited');
  draftMailView.classList.add('hide');
  draftMailView.classList.remove('show');
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
    profileLayout.classList.add('hide');
    profileLayout.classList.remove('show');
    profilelist.classList.remove('visited');
    groupLayout.classList.remove('show');
    groupLayout.classList.add('hide');
    grouplist.classList.remove('visited');
    draftMailView.classList.add('hide');
    draftMailView.classList.remove('show');
  });
});

draftDiv.forEach((div) => {
  div.addEventListener('click', () => {
    draftMailView.classList.remove('hide');
    draftMailView.classList.add('show');
    mailView.classList.remove('show');
    mailView.classList.add('hide');
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
    profileLayout.classList.add('hide');
    profileLayout.classList.remove('show');
    profilelist.classList.remove('visited');
    groupLayout.classList.remove('show');
    groupLayout.classList.add('hide');
    grouplist.classList.remove('visited');
  });
});

contactViewLists.forEach((list) => {
  list.addEventListener('click', () => {
    profileLayout.classList.add('show');
    profileLayout.classList.remove('hide');
    profilelist.classList.remove('visited');
    inboxLayout.classList.add('hide');
    inboxLayout.classList.remove('show');
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
    mailView.classList.add('hide');
    mailView.classList.remove('show');
    groupLayout.classList.remove('show');
    groupLayout.classList.add('hide');
    grouplist.classList.remove('visited');
    draftMailView.classList.add('hide');
    draftMailView.classList.remove('show');
  });
});