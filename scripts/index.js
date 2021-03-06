// data
const guideList = q(".guides");
const loggedInLinks = document.querySelectorAll(".logged-in");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const accountDetails = q('.account-details');
const adminiTems = document.querySelectorAll('.admin');

const setupUi = (user) => {
  if (user) {
    if (user.admin) {
      adminiTems.forEach(item => item.style.display = 'block');
    }
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
          <div>Logged in as ${user.email}</div>
          <div>${doc.data().bio}</div>
          <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
        `;
      accountDetails.innerHTML = html;
    })
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    adminiTems.forEach(item => item.style.display = 'none');
    accountDetails.innerHTML = '';
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

const setupGuides = data => {
  if (data.length) {
    let html = "";
    data.forEach(doc => {
      const guide = doc.data();
      html += `
        <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white">${guide.content}</div>
        </li>
      `;
    });

    guideList.innerHTML = html
  } else {
    guideList.innerHTML = "<h5 class='center-align'>Login to View the Guides</h5>"
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});