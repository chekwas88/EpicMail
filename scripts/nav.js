const bars = document.getElementById('bars');
const burger = document.getElementById('burger');
const mailCompo = document.getElementById('mailCompo');


burger.addEventListener('click', () => {
  if (mailCompo === null) {
    bars.classList.toggle('show');
    bars.classList.toggle('hide');
  } else {
    bars.classList.toggle('show');
    bars.classList.toggle('hide');
    mailCompo.classList.toggle('show');
    mailCompo.classList.toggle('hide');
  }
});
