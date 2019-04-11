/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { displayChunkMsg, convertTime } from '../scripts/mail.js';

export function getMsg(token, id, rfModal, mView, inboxSet, sentBox) {
  const mailView = mView;
  let output = `<div class="rfbttn">
                  <section class="messageView">`;
  fetch(`https://agentcorvinus-epic-mail.herokuapp.com/api/v1/messages/${id}`, {
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
        const mailMessage = result.message;
        const chunkMailMessages = mailMessage.match(/(.|[\r\100]){1,100}/g);
        output += `
          <h3>${result.subject}</h3>
          <div class="sr">
            <p>${result.sendername}  <i>to: ${result.recipient}</i></p>
            <span>${convertTime(result.createdon)}</span>
          </div>
          <div>
            ${displayChunkMsg(chunkMailMessages)}
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
      const replybtn = document.querySelector('div button#replybtn');
      const fowardbtn = document.querySelector('div button#forwardbtn');
      function getReplyForwardModal() {
        rfModal.classList.add('show');
        rfModal.classList.remove('hide');
        const url = window.location.href;
        if (url === './mail.html#sent-set') {
          sentBox.classList.add('hideView');
        }
        inboxSet.classList.add('hideView');
      }
      fowardbtn.addEventListener('click', getReplyForwardModal);
      replybtn.addEventListener('click', getReplyForwardModal);
    }).catch(err => console.log(err));
}
