const composeSend = document.getElementById('compose-send');

function composeMsg(messageDetails, token) {
  fetch('https://agentcorvinus-epic-mail.herokuapp.com/api/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(messageDetails),
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 201) {
        return payload;
      }
      document.getElementById('alarm').innerHTML = '<p>Message not Sent</p>';
      return setTimeout(() => {
        document.getElementById('alarm').innerHTML = '';
      }, 3000);
    });
}

composeSend.addEventListener('click', () => {
  const token = localStorage.getItem('token');
  const recipient = document.getElementById('recips').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const messageDetails = {
    recipient,
    subject,
    message,
  };
  composeMsg(messageDetails, token);
  setTimeout(() => {
    window.location.reload(true);
  }, 500);
});
