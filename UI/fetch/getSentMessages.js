/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { convertTime } from '../scripts/mail.js';

export function getSentMsgs(token, sentboxLayout) {
  const sentBox = sentboxLayout;
  let output = '<div class="layout-div">';
  fetch('https://agentcorvinus-epic-mail.herokuapp.com/api/v1/messages/sent', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((payload) => {
      const sent = payload.data[0].data;
      if (sent.length === 0 || sent === undefined) {
        output += `<div class="spinner">
                    <span><i class="fas fa-circle-notch"></i></span>
                    <p>LOADING</p>
                  <div>
                  </div>`;
        sentBox.innerHTML = output;
        return sentBox;
      }
      if (payload.status === 200 && sent === 'No sent messages') {
        output += `<main id="empty"><span>${sent}</span></main>`;
       sentBox.innerHTML = output;
        return sentBox;
      }
      if (payload.status === 200 && sent.length > 0) {
        sent.forEach((s) => {
          output += `
          <div id=${s.id} class="msgs">
            <span>${s.receivername}</span>
            <span>${s.subject}-${s.message.substring(0, 50)}...</span>
            <span>${convertTime(s.createdon)}</span>
          </div>
          <span class="delSpan"><i id="rf-delete" class="fas fa-trash delete"></i></span>`;
        });
      }
      output += ' </div>';
      sentBox.innerHTML = output;
      return sentBox;
    }).catch(err => console.log(err));
}
