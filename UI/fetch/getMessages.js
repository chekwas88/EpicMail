/* eslint-disable import/extensions */
import { linkedDivMsg, divDel } from '../scripts/mail.js';

const mailView = document.getElementById('mailView');

async function getReceivedMsgs(token) {
  let output = ' <div class="layout-div">';
  let inbox;
  const inboxSet = document.getElementById('inbox-set');
  await fetch('http://127.0.0.1:3001/api/v1/messages', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 200 && payload.data[0].data === 'Your inbox is empty') {
        inbox = payload.data[0].data;
        output += `<span>${inbox}</span>`;
        inboxSet.innerHTML = output;
        return inboxSet;
      }
      if (payload.status === 200 && payload.data[0].data.length > 0) {
        inbox = payload.data[0].data;
        inbox.forEach((i) => {
          output += `
              <div id=${i.id} class="msgs">
                <span>${i.sendername}</span>
                <span>${i.message.substring(0, 50)}...</span>
                <span>${i.createdon}</span>
              </div>
              <span class="delSpan"><i id="rf-delete" class="fas fa-trash delete"></i></span>`;
        });
      }
      output += '</div>';
      inboxSet.innerHTML += output;
      return inboxSet;
    }).catch(err => console.log(err));
}

async function getSentMsgs(token) {
  let output = '<div class="layout-div">';
  let sent;
  const sentBox = document.getElementById('sent-set');
  await fetch('http://127.0.0.1:3001/api/v1/messages/sent', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 200 && payload.data[0].data === 'No sent messages') {
        sent = payload.data[0].data;
        output += `<span>${sent}</span>`;
        sentBox.innerHTML = output;
        return sentBox;
      }
      if (payload.status === 200 && payload.data[0].data.length > 0) {
        sent = payload.data[0].data;
        sent.forEach((s) => {
          output += `
          <div id=${s.id} class="msgs">
            <span>${s.receivername}</span>
            <span>${s.subject}-${s.message.substring(0, 100)}...</span>
            <span>${s.createdon}</span>
          </div>
          <span class="delSpan"><i id="rf-delete" class="fas fa-trash delete"></i></span>`;
        });
      }
      output += '</div>';
      sentBox.innerHTML += output;
      return sentBox;
    }).catch(err => console.log(err));
}

function getMsg(token, id) {
  let output = `<div class="rfbttn">
                  <section class="messageView">`;
  fetch(`http://127.0.0.1:3001/api/v1/messages/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 200 && payload.data[0].data) {
        const result = payload.data[0].data;
        output += `
          <h3>${result.subject}</h3>
          <div>
            <p>${result.sendername} to<i>:${result.recipient}</i></p>
            <span>${result.createdon}</span>
          </div>
          <div>
            <p>${result.message}</p>
            <div>
              <button id="replybtn">Reply</button>
              <button id="forwardbtn">forward</button>
            </div>
          </div>
          `;
      }
      output += ` </section>
                </div>`;
      mailView.innerHTML = output;
    }).catch(err => console.log(err));
}

function deleteMsg(token, id) {
  fetch(`http://127.0.0.1:3001/api/v1/messages/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 200) {
        const result = payload.data[0].message;
        console.log(result);
      }
    }).catch(err => console.log(err));
}

window.addEventListener('load', async () => {
  const token = localStorage.getItem('token');
  await getReceivedMsgs(token);
  await getSentMsgs(token);
  const eventDiv = document.querySelectorAll('div.table-div .layout-div > div');
  linkedDivMsg(eventDiv, mailView, getMsg, token);
  divDel(eventDiv, deleteMsg, token);
});
