/* eslint-disable import/prefer-default-export */
export function createGroup(name, token) {
  fetch('http://127.0.0.1:3001/api/v1/groups', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(name),
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 201) {
        return payload;
      }
      document.getElementById('alarm').innerHTML = '<p>Group was not created</p>';
      return setTimeout(() => {
        document.getElementById('alarm').innerHTML = '';
      }, 3000);
    });
}
