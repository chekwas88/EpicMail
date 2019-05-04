/* eslint-disable import/prefer-default-export */
export function addMemByEmail(details, token, id) {
  fetch(`https://agentcorvinus-epic-mail.herokuapp.com/api/v1/groups/${id}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(details),
  })
    .then(res => res.json())
    .then((payload) => {
      console.log(payload);
      if (payload.status === 201) {
        return payload;
      }
      document.getElementById('alarm').innerHTML = '<p>failed to add member</p>';
      return setTimeout(() => {
        document.getElementById('alarm').innerHTML = '';
      }, 3000);
    }).catch(e => console.log(e));
}
