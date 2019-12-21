let q = x => document.querySelector(x);

//add admin 
const adminForm = q('.admin-actions');
adminForm.addEventListener('submit', e => {
    e.preventDefault();
    const adminEmail = q('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail }).then(result => {
        console.log(result);
    });
    adminForm.reset();
})

// status
auth.onAuthStateChanged(user => {  
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUi(user);
        })
        db.collection("guides").onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
        }, err => {
            console.log(err.message) });
    } else {
        setupUi();
        setupGuides([]);
    }
});

// create guides
const createForm = q("#create-form");
createForm.addEventListener('submit', e => {
    e.preventDefault();
    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        const modal = q('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        alert(err.message);
    })
})

 // singup
 const signupForm = q('#signup-form');
 signupForm.addEventListener('submit', (e) => {
     e.preventDefault();
     const email = signupForm['signup-email'].value;
     const password = signupForm['signup-password'].value;
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        });
    }).then(() => {
        const modal = q('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
 });
 
// logout
const logout = q('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = q('#login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = q('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
        }).catch(err => {
            loginForm.querySelector('.error').innerHTML = err.message;
        });
});


