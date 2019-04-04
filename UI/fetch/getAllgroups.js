async function getAllgroups(token) {
  let output = '<div class="layout-div">';
  let groups;
  const groupSet = document.getElementById('group-set');
  await fetch('http://127.0.0.1:3001/api/v1/messages/sent', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 200 && payload.data[0].data === 'No sent messages') {
        sent = payload.data[0].data;
        output += `<span>${sent}</span>`;
        sentBox.innerHTML = output;
        return sentBox;
      }
      if (payload.status === 200 && payload.data[0].data.length > 0) {
        sent = payload.data[0].data;
        sent.forEach((s) => {
          output += `
          <div id=${s.id} class="msgs">
            <span>${s.receivername}</span>
            <span>${s.subject}-${s.message.substring(0, 100)}...</span>
            <span>${s.createdon}</span>
          </div>
          <span class="delSpan"><i id="rf-delete" class="fas fa-trash delete"></i></span>`;
        });
      }
      output += '</div>';
      sentBox.innerHTML += output;
      return sentBox;
    }).catch(err => console.log(err));
}