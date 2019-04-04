/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { removeComposeModal } from '../scripts/mailModal.js';

const composeSend = document.getElementById('compose-send');

function composeMsg(messageDetails, token) {
  fetch('http://127.0.0.1:3001/api/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(messageDetails),
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 200) {
        console.log(payload);
      }
    });
}

composeSend.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const recipient = document.getElementById('recips').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const messageDetails = {
    recipient,
    subject,
    message,
  };
  composeMsg(messageDetails, token);
  setTimeout(() => {
    window.location.reload(true);
  }, 500);
  removeComposeModal();
});
