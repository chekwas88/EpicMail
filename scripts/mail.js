/* eslint-disable import/prefer-default-export */
const inboxLayout = document.getElementById('inbox-set');
const sentLayout = document.getElementById('sent-set');
const profilelist = document.getElementById('profile-list');
const grouplist = document.getElementById('group-list');
const inboxlist = document.getElementById('inbox-list');
const sentlist = document.getElementById('sent-list');
const draftlist = document.getElementById('draft-list');
const contactlist = document.getElementById('contact-list');
const mailView = document.getElementById('mailView');

profilelist.addEventListener('click', () => {
  profilelist.classList.add('visited');
  inboxlist.classList.remove('visited');
  sentlist.classList.remove('visited');
  draftlist.classList.remove('visited');
  contactlist.classList.remove('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
  grouplist.classList.remove('visited');
});

inboxlist.addEventListener('click', () => {
  inboxLayout.classList.remove('hideView');
  inboxlist.classList.add('visited');
  sentlist.classList.remove('visited');
  draftlist.classList.remove('visited');
  contactlist.classList.remove('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
  profilelist.classList.remove('visited');
  grouplist.classList.remove('visited');
});

sentlist.addEventListener('click', () => {
  inboxlist.classList.remove('visited');
  sentlist.classList.add('visited');
  sentLayout.classList.remove('hideView');
  draftlist.classList.remove('visited');
  contactlist.classList.remove('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
  profilelist.classList.remove('visited');
  grouplist.classList.remove('visited');
});

draftlist.addEventListener('click', () => {
  inboxlist.classList.remove('visited');
  sentlist.classList.remove('visited');
  draftlist.classList.add('visited');
  contactlist.classList.remove('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
  profilelist.classList.remove('visited');
  grouplist.classList.remove('visited');
});
grouplist.addEventListener('click', () => {
  inboxlist.classList.remove('visited');
  sentlist.classList.remove('visited');
  sentLayout.classList.remove('hideView');
  draftlist.classList.remove('visited');
  contactlist.classList.remove('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
  profilelist.classList.remove('visited');
  grouplist.classList.add('visited');
});

contactlist.addEventListener('click', () => {
  inboxlist.classList.remove('visited');
  sentlist.classList.remove('visited');
  draftlist.classList.remove('visited');
  contactlist.classList.add('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
  profilelist.classList.remove('visited');
  grouplist.classList.remove('visited');
});

export function groupPage() {
  inboxlist.classList.remove('visited');
  sentlist.classList.add('visited');
  draftlist.classList.remove('visited');
  contactlist.classList.remove('visited');
  mailView.classList.add('hide');
  mailView.classList.remove('show');
  profilelist.classList.remove('visited');
  grouplist.classList.add('visited');
}

export function linkedDivMsg(linkedDiv, mView, msg, token, rfmodal, inbox, sentbox) {
  linkedDiv.forEach((div) => {
    div.addEventListener('click', () => {
      const id = div.getAttribute('id');
      msg(token, id, rfmodal, mView, inbox, sentbox);
      mView.classList.add('show');
      mView.classList.remove('hide');
      inboxlist.classList.remove('visited');
      inboxLayout.classList.add('hideView');
      sentlist.classList.remove('visited');
      sentLayout.classList.add('hideView');
      draftlist.classList.remove('visited');
      contactlist.classList.remove('visited');
      profilelist.classList.remove('visited');
      grouplist.classList.remove('visited');
    });
  });
}
export function divDelMsg(linkedDiv, delMsg, token) {
  linkedDiv.forEach((div) => {
    const id = div.getAttribute('id');
    div.nextElementSibling.querySelector('i').addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById(`${id}`).remove();
      // setTimeout(() => {
      //   window.location.reload(true);
      // }, 200);
      delMsg(token, id);
    });
  });
}

export function divDelGrp(linkedDiv, delGrp, token) {
  linkedDiv.forEach((div) => {
    const id = div.getAttribute('id');
    div.children[5].querySelector('i').addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById(`${id}`).remove();
      // setTimeout(() => {
      //   window.location.reload(true);
      // }, 200);
      delGrp(token, id);
    });
  });
}

export function loadGroupMembers(lists, getMembers, token) {
  lists.forEach((list) => {
    const memberId = list.getAttribute('id');
    list.children[2].addEventListener('click', () => {
      setTimeout(() => {
        getMembers(token, memberId);
      }, 200);
    });
  });
}

export function storeGroupId(element) {
  const groupId = element.parentNode.getAttribute('id');
  localStorage.setItem('groupId', groupId);
}

export function displayChunkMsg(chunkmsg) {
  let element = '<div>';
  chunkmsg.forEach((cm) => {
    element += `<p>${cm}</p>`;
  });
  element += '</div>';
  return element;
}

export function convertTime(time) {
  const date = new Date(time);
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: 'numeric',
  };
  const localeDate = new Intl.DateTimeFormat('en-GB', options).format(date);

  return localeDate;
}

export function onLoadVisited(url) {
  if (url.includes('mail.html#inbox-set')) {
    inboxlist.classList.add('visited');
  } else if (url.includes('mail.html#sent-set')) {
    sentlist.classList.add('visited');
  } else if (url.includes('mail.html#profile-set')) {
    profilelist.classList.add('visited');
  } else if (url.includes('mail.html#contact-set')) {
    contactlist.classList.add('visited');
  } else if (url.includes('mail.html#group-set')) {
    grouplist.classList.add('visited');
  } else if (url.includes('mail.html#draft-set')) {
    draftlist.classList.add('visited');
  }
}
