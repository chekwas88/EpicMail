/* eslint-disable import/prefer-default-export */
// const groupSend = document.getElementById('grp-compose-send');

export function sendGroupMsg(messageDetails, token, id) {
  fetch(`https://agentcorvinus-epic-mail.herokuapp.com/api/v1/groups/${id}/messages`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(messageDetails),
  })
    .then(res => res.json())
    .then((payload) => {
      console.log(payload);
      if (payload.status === 201) {
        return payload;
      }
      document.getElementById('alarm').innerHTML = '<p>Message not Sent</p>';
      return setTimeout(() => {
        document.getElementById('alarm').innerHTML = '';
      }, 3000);
    });
}
