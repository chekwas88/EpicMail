/* eslint-disable import/extensions */
import { getReceivedMsgs } from './getReceivedMessages.js';
import { getMsg } from './getMessage.js';
import { getSentMsgs } from './getSentMessages.js';
import { deleteMsg } from './deleteMessage.js';
import { addMemByEmail } from './addMemberByEmail.js';
import {
  linkedDivMsg, divDelMsg, divDelGrp, onLoadVisited, loadGroupMembers, storeGroupId,
} from '../scripts/mail.js';
import { getAllgroups } from './getAllgroups.js';
import { getAllGroupMembers } from './getAllGroupMembers.js';
import { createGroup } from './createGroup.js';
import { editGroup } from './editGroup.js';
import { sendGroupMsg } from './groupCompose.js';
import { deleteGroup } from './deleteGroup.js';
import { getAllContacts } from './getAllContacts.js';

window.addEventListener('load', async () => {
  const inboxSet = document.getElementById('inbox-set');
  const mailView = document.getElementById('mailView');
  const sentBox = document.getElementById('sent-set');
  const token = localStorage.getItem('token');


  await getReceivedMsgs(token, inboxSet);
  await getSentMsgs(token, sentBox);
  await getAllgroups(token);
  await onLoadVisited(window.location.href);

  const composeLayout = document.getElementById('compose-new');
  const groupComposeLayout = document.getElementById('group-compose');
  const layoutRF = document.getElementById('replyforward');
  const compose = document.getElementById('compose');
  const groupSend = document.getElementById('grp-compose-send');
  const compoCancel = document.getElementById('compox');
  const grpCompoCancel = document.getElementById('grp-compox');
  const composeDeleteBtn = document.getElementById('compose-delete');
  const grpComposeDeleteBtn = document.getElementById('grp-compose-delete');
  const rfSend = document.getElementById('rf-send');
  const rfdelete = document.querySelector('span #rf-delete');
  const getLink = document.querySelectorAll('li.gp-list');
  const addToGroupLay = document.getElementById('gp-add-page');
  const membersDisplay = document.getElementById('members-modal');
  const createGPForm = document.getElementById('ct-gp-form-page');
  const updateGPForm = document.getElementById('ed-gp-form-page');
  const ctGPForm = document.querySelector('#ct-gp-form-page .gp-form');
  const edGPForm = document.querySelector('#ed-gp-form-page .gp-form');
  const ctGPFormCancel = document.getElementById('ct-gp-form-cancel');
  const edGPFormCancel = document.getElementById('ed-gp-form-cancel');
  const createGPBtn = document.getElementById('creategroup');
  const draftDiv = document.querySelectorAll('.draft-div div');
  const contactViewLists = document.querySelectorAll('.layout-div ul li.collection-item ');
  const gpAddMemCancel = document.getElementById('add-mem-cancel');
  const addMemToGroup = document.getElementById('add-member-email');
  const addMemForm = document.querySelector('#add-member-email .gp-form');

  const msgDiv = document.querySelectorAll('div.table-div .layout-div > div');
  const groupDiv = document.querySelectorAll('div.table-div .layout-div > ul .gp-list');
  linkedDivMsg(msgDiv, mailView, getMsg, token, layoutRF, inboxSet, sentBox);
  divDelMsg(msgDiv, deleteMsg, token);
  divDelGrp(groupDiv, deleteGroup, token);
  loadGroupMembers(getLink, getAllGroupMembers, token);
  getAllContacts(token);

  function getGroupLists() {
    const spanModal = [];
    getLink.forEach((span) => {
      spanModal.push(span.getElementsByTagName('span'));
    });
    return spanModal;
  }

  const spans = getGroupLists();

  function removeComposeModal() {
    composeLayout.classList.add('hide');
    composeLayout.classList.remove('show');
  }
  function removeGroupComposeModal() {
    groupComposeLayout.classList.add('hide');
    groupComposeLayout.classList.remove('show');
  }
  function removeCTGroupform() {
    createGPForm.classList.remove('show');
    createGPForm.classList.add('hide');
  }
  function removeEDGroupform() {
    updateGPForm.classList.remove('show');
    updateGPForm.classList.add('hide');
  }

  function removeRFModal() {
    layoutRF.classList.add('hide');
    layoutRF.classList.remove('show');
    mailView.classList.add('hide');
    mailView.classList.remove('show');
    if (inboxSet.className.includes('hideView')) {
      inboxSet.classList.remove('hideView');
    }

    if (sentBox.className.includes('hideView')) {
      sentBox.classList.remove('hideView');
    }
  }

  function getGpCreateForm() {
    createGPForm.classList.remove('hide');
    createGPForm.classList.add('show');
  }

  function getGpUpdateForm() {
    updateGPForm.classList.remove('hide');
    updateGPForm.classList.add('show');
  }

  function getComposeLayout() {
    composeLayout.classList.add('show');
    composeLayout.classList.remove('hide');
  }

  createGPBtn.addEventListener('click', getGpCreateForm);

  compose.addEventListener('click', () => {
    composeLayout.classList.add('show');
    composeLayout.classList.remove('hide');
  });

  spans.forEach((span) => {
    span[1].querySelector('i').addEventListener('click', () => {
      storeGroupId(span[1]);
      addToGroupLay.classList.remove('hide');
      addToGroupLay.classList.add('show');
    });
  });

  spans.forEach((span) => {
    span[3].querySelector('i').addEventListener('click', () => {
      storeGroupId(span[3]);
      groupComposeLayout.classList.add('show');
      groupComposeLayout.classList.remove('hide');
    });
  });

  spans.forEach((span) => {
    span[4].querySelector('i').addEventListener('click', () => {
      storeGroupId(span[4]);
      getGpUpdateForm();
    });
  });

  spans.forEach((span) => {
    span[2].querySelector('i').addEventListener('click', () => {
      membersDisplay.classList.remove('hide');
      membersDisplay.classList.add('show');
    });
  });

  draftDiv.forEach((div) => {
    div.addEventListener('click', getComposeLayout);
  });

  contactViewLists.forEach((list) => {
    list.addEventListener('click', getComposeLayout);
  });

  compoCancel.addEventListener('click', removeComposeModal);
  composeDeleteBtn.addEventListener('click', removeComposeModal);
  grpCompoCancel.addEventListener('click', removeGroupComposeModal);
  grpComposeDeleteBtn.addEventListener('click', removeGroupComposeModal);
  rfSend.addEventListener('click', removeRFModal);
  rfdelete.addEventListener('click', removeRFModal);

  ctGPForm.addEventListener('submit', (e) => {
    const name = document.getElementById('ct-gpr-name').value;
    const groupName = { name };
    createGroup(groupName, token);
    removeCTGroupform();
    setTimeout(() => {
      window.location.reload(true);
      window.location.href = './mail.html#group-set';
    }, 500);
    e.preventDefault();
  });
  ctGPFormCancel.addEventListener('click', removeCTGroupform);

  edGPForm.addEventListener('submit', (e) => {
    const name = document.getElementById('ed-gpr-name').value;
    const groupName = { name };
    const groupId = localStorage.getItem('groupId');
    editGroup(groupName, token, groupId);
    removeEDGroupform();
    setTimeout(() => {
      window.location.reload(true);
      window.location.href = './mail.html#group-set';
    }, 500);
    e.preventDefault();
  });
  edGPFormCancel.addEventListener('click', removeEDGroupform);

  groupSend.addEventListener('click', () => {
    const subject = document.getElementById('grp-subject').value;
    const message = document.getElementById('grp-message').value;
    const groupId = localStorage.getItem('groupId');
    const messageDetails = {
      subject,
      message,
    };
    sendGroupMsg(messageDetails, token, groupId);
    setTimeout(() => {
      window.location.reload(true);
    }, 200);
  });

  addMemForm.addEventListener('submit', () => {
    const email = document.getElementById('add-mem-email').value;
    const roleSelect = document.getElementById('role-select');
    const role = roleSelect.options[roleSelect.selectedIndex].value;
    const groupId = localStorage.getItem('groupId');
    const memberDetails = {
      email,
      role,
    };
    addMemByEmail(memberDetails, token, groupId);
    setTimeout(() => {
      window.location.reload(true);
    }, 200);
  });
  gpAddMemCancel.addEventListener('click', () => {
    addMemToGroup.classList.remove('show');
    addMemToGroup.classList.add('hide');
  });
});
