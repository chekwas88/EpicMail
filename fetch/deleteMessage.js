/* eslint-disable import/prefer-default-export */
export function deleteMsg(token, id) {
  fetch(`https://agentcorvinus-epic-mail.herokuapp.com/api/v1/messages/${id}`, {
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
