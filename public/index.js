firebase.initializeApp({
  apiKey: 'AIzaSyAAcTUjY48zVRT0Nv9a7faIZZYKdso5SLk',
  authDomain: 'pwa2-62c14.firebaseapp.com',
  databaseURL: 'https://pwa2-62c14.firebaseio.com',
  projectId: 'pwa2-62c14',
  storageBucket: '',
  messagingSenderId: '434572588146',
  appId: '1:434572588146:web:4beee6de7f5dad9c'
});
// Initialize Firebase

const auth = firebase.auth();

const txtemail = document.getElementById('email');
const txtpass = document.getElementById('pass');
const login = document.getElementById('login');
const signup = document.getElementById('signup');
const logout = document.getElementById('logout');

//login event

login.addEventListener('click', () => {
  //get email and password
  const email = txtemail.value;
  const pass = txtpass.value;

  //sign in
  auth.signInWithEmailAndPassword(email, pass).catch(console.warn);
});

signup.addEventListener('click', () => {
  //get email and password
  const email = txtemail.value;
  const pass = txtpass.value;

  //sign in
  auth.createUserWithEmailAndPassword(email, pass).catch(console.warn);
});

auth.onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    window.location = 'main.html';
  } else {
    console.log('not logged in');
  }
});
