const loginForm = document.getElementById('loginForm');

function login(userDetails) {
  fetch('http://127.0.0.1:3001/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(userDetails),
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 200) {
        const { token, user } = payload.data[0];
        localStorage.setItem('token', token);
        localStorage.setItem('fullname', `${user.firstname} ${user.lastname}`);
        window.location.href = './mail.html#inbox-set';
        console.log(payload);
      }
    });
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('useremail').value;
  const password = document.getElementById('secret').value;
  const user = {
    email,
    password,
  };
  login(user);
});
