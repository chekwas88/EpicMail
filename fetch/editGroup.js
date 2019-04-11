/* eslint-disable import/prefer-default-export */
export function editGroup(name, token, id) {
  fetch(`https://agentcorvinus-epic-mail.herokuapp.com/api/v1/groups/${id}/name`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(name),
  })
    .then(res => res.json())
    .then((payload) => {
      console.log(payload);
      if (payload.status === 200) {
        return payload;
      }
      document.getElementById('alarm').innerHTML = '<p>Group name was not updated</p>';
      return setTimeout(() => {
        document.getElementById('alarm').innerHTML = '';
      }, 3000);
    }).catch(e => console.log(e));
}
