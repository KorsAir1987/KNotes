import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    connectAuthEmulator,
    signInWithEmailAndPassword
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

const loginEmailPassword = async() => {
    const loginEmail = txtUsername.value;
    const loginPassword = txtPassword.value;

    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
}

btnLogin.addEventListener("click", loginEmailPassword);
