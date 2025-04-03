function getUiConfig() {

    return {

        'callbacks': {

          // Called when the user has been successfully signed in.
          'signInSuccessWithAuthResult': function(authResult, redirectUrl) {
            if (authResult.user) {
              handleSignedInUser(authResult.user);
            }
            if (authResult.additionalUserInfo) {
              document.getElementById('is-new-user').textContent =
                  authResult.additionalUserInfo.isNewUser ?
                  'New User' : 'Existing User';
            }
            // Do not redirect.
            return false;
          }
        },
        // Opens IDP Providers sign-in flow in a popup.
        'signInFlow': 'popup',
        'signInOptions': [
          // TODO(developer): Remove the providers you don't need for your app.
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // Required to enable ID token credentials for this provider.
            clientId: '947310780287-6dvhnalfb7mcg71jh94csapipp4bddhl.apps.googleusercontent.com'
          },
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // Whether the display name should be displayed in Sign Up page.
            requireDisplayName: true,
            signInMethod: getEmailSignInMethod(),
            disableSignUp: {
              status: getDisableSignUpStatus()
            }
          }
        ],
        // Terms of service url.
        'tosUrl': 'https://www.google.com',
        // Privacy policy url.
        'privacyPolicyUrl': 'https://www.google.com',
        'credentialHelper': CLIENT_ID && CLIENT_ID != 'YOUR_OAUTH_CLIENT_ID' ?
            firebaseui.auth.CredentialHelper.GOOGLE_YOLO :
            firebaseui.auth.CredentialHelper.NONE,
        'adminRestrictedOperation': {
          status: getAdminRestrictedOperationStatus()
        }
      };

}



var config = {
    apiKey: "YOUR_APIAIzaSyCruv86ZGTbEqg72iu3jB4w59Xxk76H_S4_KEY",
    authDomain: "your-app.firebaseapp.com",
    databaseURL: "https://your-app.firebaseio.com",
    storageBucket: "your-app.appspot.com",
  };
  firebase.initializeApp(config);


