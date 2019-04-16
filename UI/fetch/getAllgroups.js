/* eslint-disable import/prefer-default-export */
export async function getAllgroups(token) {
  let output = '';
  const groupUl = document.getElementById('groupUl');
  await fetch('http://127.0.0.1:3001/api/v1/groups', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((payload) => {
      if (payload.status === 200 && payload.data[0].groups.length === 0) {
        output += '<span>You are not a member of any group</span>';
        groupUl.innerHTML = output;
        return groupUl;
      }
      if (payload.status === 200 && payload.data[0].groups.length > 0) {
        const { groups } = payload.data[0];
        groups.forEach((g) => {
          output += `<li id=${g.id} class="gp-list">
                      <span class="gp-li-ch">${g.name}</span>
                      <span class="gp-li-ch"><i title="add to group" class="fas fa-plus-circle"></i></span>
                      <span class="gp-li-ch"><i title="members" class="fas fa-users"></i></span>
                      <span class="gp-li-ch"><i title="send message" class="fas fa-comment-alt"></i></span>
                      <span class="gp-li-ch"><i class="fas fa-edit gp-edit"></i></span>
                      <span class="gp-li-ch"><i class="fas fa-trash delete"></i></span>  
                    </li>`;
        });
      }
      output += '</div>';
      groupUl.innerHTML += output;
      return groupUl;
    }).catch(err => console.log(err));
}
