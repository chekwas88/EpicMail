let filterInput = document.getElementById('filterable');
// add event listener
filterInput.addEventListener('keyup', filterContact);

function filterContact() {
  let filterValue = document.getElementById('filterable').value.toUpperCase();
  let li = document.querySelectorAll('.layout-div ul li.collection-item');
  li.forEach((list) => {
      let a = list.getElementsByTagName('a')[0];

      if (a.innerHTML.toUpperCase().includes(filterValue)) {
          list.style.display = "";

      } else {
          list.style.display = "none";
      }
      
  });
   
}