const searchInput = document.getElementById('filter');
// add event listener
function filterGroup() {
  const inputValue = document.getElementById('filter').value.toUpperCase();
  const gpl = document.querySelectorAll('.layout-div ul li.gp-list');
  console.log(gpl);
  gpl.forEach((li) => {
    const a = li.getElementsByTagName('span')[0];
    const gplist = li;

    if (a.innerHTML.toUpperCase().includes(inputValue)) {
      gplist.style.display = '';
    } else {
      gplist.style.display = 'none';
    }
  });
}

searchInput.addEventListener('keyup', filterGroup);
