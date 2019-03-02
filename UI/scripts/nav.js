const bars = document.getElementById('bars');
const burger = document.getElementById('burger');

burger.addEventListener('click', () => {
  bars.classList.toggle('show');
  bars.classList.toggle('hide');
});
