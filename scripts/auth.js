let q = (x) => document.querySelector(x);

 // singup

 const signupForm = q('#signup-form');
 signupForm.addEventListener('submit', (e) => {
     e.preventDefault();
     const email = signupForm['signup-email'].value;
     const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = q('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
 });

// logout

const logout = q('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('The User has Signed Out');
    });
});

// login

const loginForm = q('#login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        const modal = q('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        });
});
