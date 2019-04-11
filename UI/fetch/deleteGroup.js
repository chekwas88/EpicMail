/* eslint-disable import/prefer-default-export */
export function deleteGroup(token, id) {
  fetch(`https://agentcorvinus-epic-mail.herokuapp.com/api/v1/groups/${id}`, {
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
        return result;
      }
      return null;
    }).catch(err => console.log(err));
}
