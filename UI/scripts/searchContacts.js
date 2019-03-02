const filterInput = document.getElementById('filterable');
// add event listener
function filterContact() {
  const filterValue = document.getElementById('filterable').value.toUpperCase();
  const li = document.querySelectorAll('.layout-div ul li.collection-item');
  li.forEach((list) => {
    const a = list.getElementsByTagName('a')[0];
    const ctlist = list;

    if (a.innerHTML.toUpperCase().includes(filterValue)) {
      ctlist.style.display = '';
    } else {
      ctlist.style.display = 'none';
    }
  });
}

filterInput.addEventListener('keyup', filterContact);
