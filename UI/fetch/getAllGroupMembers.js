/* eslint-disable import/prefer-default-export */
export async function getAllGroupMembers(token, id) {
  let output = `<div class="gp-members">
                  <ul id="mLists">`;
  const membersList = document.getElementById('members-modal');
  await fetch(`http://127.0.0.1:3001/api/v1/groups/${id}/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 200 && payload.data[0].members.length === 0) {
        output += '<p>This group has no members yet</p>';
        membersList.innerHTML = output;
        return membersList;
      }
      if (payload.status === 200 && payload.data[0].members.length > 0) {
        const { members } = payload.data[0];
        members.forEach((m) => {
          output += `
                        <li class="member-item">
                          <span>${m.firstname} ${m.lastname}</span>  
                        </li>
                      `;
        });
      }
      output += ` </ul>
                  <div>
                    <button id="gp-member-close">Close</button>
                  </div>
                </div>`;
      if (membersList.children.length === 0) {
        membersList.innerHTML += output;
        const membersUl = document.querySelector('.gp-members');
        document.getElementById('gp-member-close').addEventListener('click', () => {
          membersUl.remove();
          membersList.classList.add('hide');
          membersList.classList.remove('show');
        });
      }
      return membersList;
    }).catch(err => console.log(err));
}
