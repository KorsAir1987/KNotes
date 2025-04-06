import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    connectAuthEmulator,
    signInWithEmailAndPassword,
    AuthErrorCodes
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCruv86ZGTbEqg72iu3jB4w59Xxk76H_S4",
    authDomain: "kjournal-98395.firebaseapp.com",
    projectId: "kjournal-98395",
    storageBucket: "kjournal-98395.firebasestorage.app",
    messagingSenderId: "947310780287",
    appId: "1:947310780287:web:585206b435a5692de2444a"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  connectAuthEmulator(auth, "http://localhost:9099");

const txtUsername = document.getElementById("username");
const txtPassword = document.getElementById("password");
const btnLogin = document.getElementById("login-button");
const divLoginError = document.getElementById("login-error");

const divMainContent = document.getElementById("main-content");
const divLoginForm = document.getElementById("login-form");

const hideLoginError = () => {
    divLoginError.style.display = 'none';
    divLoginError.innerHTML = '';
}

const showLoginError = (error) => {
    divLoginError.style.display = 'block';
    if(error.code == AuthErrorCodes.INVALID_PASSWORD) {
        divLoginError.innerHTML = 'Wrong password. Try again.';
    } else {
        divLoginError.innerHTML = `Error: ${error.message}`;
    }
}

const loginEmailPassword = async() => {
    const loginEmail = txtUsername.value;
    const loginPassword = txtPassword.value;

    try 
    {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
        divMainContent.style.display = 'flex';
        divLoginForm.style.display = 'none';
    } catch(error) {
        showLoginError(error);
        console.log(error);
    }
    
}

const createAccount = async() => {

};

btnLogin.addEventListener("click", loginEmailPassword);
