import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    connectAuthEmulator,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    AuthErrorCodes,
    onAuthStateChanged,
    signOut
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

const divMainContent = document.getElementById("main-content");
const divLoginDiv = document.getElementById("loginDiv");
const divSignupDiv = document.getElementById("signupDiv");

const loggedInData = document.querySelectorAll(".loggedin-data");

const txtUsername = document.getElementById("username");
const txtPassword = document.getElementById("password");
const btnLogin = document.getElementById("login-button");
const divLoginError = document.getElementById("login-error");
const btnLogout = document.getElementById("logout-button");

const divSignupCreate = document.getElementById("signup-create");
const divSignupComplete = document.getElementById("signup-complete");
const txtSignupUsername = document.getElementById("signup-username");
const txtSignupPassword = document.getElementById("signup-password");
const txtSignupConfirmPassword = document.getElementById("signup-confirmpassword");
const btnSignup = document.getElementById("signup-button");
const divSignupError = document.getElementById("signup-error");

const createAccountLink = document.getElementById("createAccountLink");
const goBackCreateAccountLink = document.getElementById("goBackCreateAccountLink");

const loadingSpinner = document.getElementById("loading-spinner");

const hideLoginError = () => {
    divLoginError.style.display = 'none';
    divLoginError.innerHTML = '';
}

const showLoginError = (error) => {
    divLoginError.style.display = 'block';
    if(error.code == AuthErrorCodes.INVALID_PASSWORD) {
        divLoginError.innerHTML = 'Wrong password. Try again.';
    } else if(error.code == AuthErrorCodes.INVALID_EMAIL) {
        divLoginError.innerHTML = 'Invalid e-mail. Try again.';
    } else if(error.code == AuthErrorCodes.USER_DELETED) {
        divLoginError.innerHTML = 'User not found.';
    } else if(error.code == 'custom') {
        divLoginError.innerHTML = error.message;
    } 
    else {
        divLoginError.innerHTML = `Error.`;
    }
}

const showSignupError = (error) => {
    divSignupError.style.display = 'block';
    if(error.code == AuthErrorCodes.INVALID_PASSWORD) {
        divSignupError.innerHTML = 'Wrong password. Try again.';
    } else if(error.code == AuthErrorCodes.INVALID_EMAIL) {
        divSignupError.innerHTML = 'Invalid e-mail. Try again.';
    } else if(error.code == AuthErrorCodes.EMAIL_EXISTS) {
        divSignupError.innerHTML = 'E-mail already exists. Try again.';
    } else if(error.code == AuthErrorCodes.WEAK_PASSWORD) {
        divSignupError.innerHTML = 'Password should be at least 6 characters.';
    }  else if(error.code == 'custom') {
        divSignupError.innerHTML = error.message;
    } else {
        divSignupError.innerHTML = `Error.`;
    }
}

const showLogin = async(e) => {
    if(e)
        e.preventDefault();
    
    divMainContent.style.display = 'none';
    divLoginDiv.style.display = '';
    divSignupDiv.style.display = 'none';
};

const showCreateAccount = async(e) => {
    if(e)
        e.preventDefault();
    
    divMainContent.style.display = 'none';
    divLoginDiv.style.display = 'none';
    divSignupDiv.style.display = '';
};

const showCalendar = () => {
    divMainContent.style.display = 'flex';
    divLoginDiv.style.display = 'none';
    divSignupDiv.style.display = 'none';
}

const changeUsername = (newUsername) => {
    const headerUsername = document.getElementById('header-username');
    headerUsername.innerHTML = newUsername;
}


const loginEmailPassword = async() => {
    const loginEmail = txtUsername.value;
    const loginPassword = txtPassword.value;

    btnLogin.setAttribute("disabled", "disabled");
    loadingSpinner.style.display = '';

    if(loginEmail == '' || loginPassword == '') {
        showLoginError({ code: 'custom', message: 'Please fill in all fields.'});
        
    } else {
        try 
        {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(userCredential.user);
        } catch(error) {
            showLoginError(error);
            console.log(error);
        }
    }

    btnLogin.removeAttribute("disabled");
    loadingSpinner.style.display = 'none';
    
}

const createAccountEmailPassword = async(e) => {
    const signupEmail = txtSignupUsername.value;
    const signupPassword = txtSignupPassword.value;
    const signupConfirmPassword = txtSignupConfirmPassword.value;
    
    if(signupEmail == '' || signupPassword == '' || signupConfirmPassword == '') {
        showSignupError({ code: 'custom', message: 'Please fill in all fields.'});
        return;
    }

    if(signupPassword != signupConfirmPassword) {
        showSignupError(error);
        console.log({ code: 'custom', message: 'Passwords do not match.' });
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
        divSignupCreate.style = "display:none";
        divSignupComplete.style = "";
        console.log(userCredential.user);

    } catch(error) {
        showSignupError(error);
        console.log(error);
    }
    
};

const monitorAuthState = async() => {
    onAuthStateChanged(auth, user => {
        if(user) {
            changeUsername(user.email);
            showCalendar();
            console.log(user);
            loggedInData.forEach(el => {
                el.style.display = '';
              });
        } else {
            loggedInData.forEach(el => {
                el.style.display = 'none';
              });
        }
    });
}

const logout = async () => {
    await signOut(auth);
    showLogin();
}

btnLogin.addEventListener("click", loginEmailPassword);
btnSignup.addEventListener("click", createAccountEmailPassword);
createAccountLink.addEventListener("click", showCreateAccount);
goBackCreateAccountLink.addEventListener("click", showLogin);
btnLogout.addEventListener("click", logout);

monitorAuthState();