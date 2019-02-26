const signupHeader = document.querySelector('.container nav .signup');
const loginHeader = document.querySelector('.container nav .login');
const signupform = document.getElementById('signup');
const loginform = document.getElementById('login');
const footer = document.getElementById('authfooter');

signupHeader.addEventListener('click', () => {
  loginHeader.classList.remove('active');
  loginform.classList.remove('show');
  loginform.classList.add('hide');
  signupHeader.classList.add('active'); 
  signupform.classList.add('show');
  footer.classList.add('register');
  footer.classList.remove('login');
  
});
loginHeader.addEventListener('click', () => {
  signupHeader.classList.remove('active');
  loginHeader.classList.add('active');
  loginform.classList.add('show');
  signupform.classList.remove('show'); 
  footer.classList.add('login');
  footer.classList.remove('register');
});