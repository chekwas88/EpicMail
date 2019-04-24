/* eslint-disable import/prefer-default-export */
export async function getAllContacts(token) {
  let output = '';
  const contactList = document.querySelector('#gp-add-page .memselect');
  await fetch('http://127.0.0.1:3001/api/v1/contacts', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 200 && !payload.data[0].contacts) {
        output += '<p>You have no contacts yet</p>';
        contactList.innerHTML += output;
        return contactList;
      }
      if (payload.status === 200 && payload.data[0].contacts.length > 0) {
        const { contacts } = payload.data[0];
        contacts.forEach((c) => {
          output += `
                      <div>
                        <input id=${c.id} type="checkbox" name="members" value="${c.firstname} ${c.lastname}" />
                        <div class="memlabel">
                          <label for=${c.id}>${c.firstname} ${c.lastname}</label>
                        </div>
                      </div>
                      `;
        });
      }
      output += ` 
                  <button id="addgp" class="addg" type="submit">Add</button>
                `;
      contactList.innerHTML += output;
      const emailMemAddbtn = document.getElementById('email-gp-add');
      const addMemToGroup = document.getElementById('add-member-email');
      emailMemAddbtn.addEventListener('click', () => {
        addMemToGroup.classList.remove('hide');
        addMemToGroup.classList.add('show');
      });
      const gpAddCancel = document.getElementById('gp-add-cancel');
      const addToGroupLay = document.getElementById('gp-add-page');
      gpAddCancel.addEventListener('click', () => {
        addToGroupLay.classList.remove('show');
        addToGroupLay.classList.add('hide');
      });
      return contactList;
    }).catch(err => console.log(err));
}
