/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { convertTime } from '../scripts/mail.js';

export function getReceivedMsgs(token, inboxLayout) {
  const inboxSet = inboxLayout;
  let output = ' <div class="layout-div">';
  fetch('https://agentcorvinus-epic-mail.herokuapp.com/api/v1/messages', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((payload) => {
      const inbox = payload.data[0].data;
      if (inbox.length === 0 || inbox === undefined) {
        output += `<main class="spinner">
                    <span><i class="fas fa-circle-notch"></i></span>
                    <p>LOADING</p>
                  <main>
                  </div>`;
        inboxSet.innerHTML = output;
        return inboxSet;
      }
      if (payload.status === 200 && inbox === 'Your inbox is empty') {
        output += `<main id="empty"><span>${inbox}</span><main>`;
        inboxSet.innerHTML = output;
        return inboxSet;
      }
      if (payload.status === 200 && inbox.length > 0) {
        inbox.forEach((i) => {
          output += `
              <div id=${i.id} class="msgs">
                <span>${i.sendername}</span>
                <span>${i.message.substring(0, 50)}...</span>
                <span>${convertTime(i.createdon)}</span>
              </div>
              <span class="delSpan"><i class="fas fa-trash delete"></i></span>`;
        });
      }
      output += ' </div>';
      inboxSet.innerHTML = output;
      return inboxSet;
    }).catch(err => console.log(err));
}
