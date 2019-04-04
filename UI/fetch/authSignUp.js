/* eslint-disable quote-props */
const signUpF = document.getElementById('signupForm');

function register(userDetails) {
  fetch('http://127.0.0.1:3001/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(userDetails),
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 201) {
        const { token, user } = payload.data[0];
        localStorage.setItem('token', token);
        localStorage.setItem('fullname', `${user.firstname} ${user.lastname}`);
        window.location.href = './mail.html';
      }
    });
}

signUpF.addEventListener('submit', (e) => {
  e.preventDefault();
  const firstName = document.getElementById('fname').value;
  const lastName = document.getElementById('lname').value;
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpSecret').value;
  const confirmPassword = document.getElementById('psecret').value;


  const user = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  };
  register(user);
});
