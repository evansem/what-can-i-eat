import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

export const firebaseConfig = {
    apiKey: "AIzaSyBMyVA_URwEDHHTgmuVUPg09Wg727OU0Qk",
    authDomain: "what-can-i-eat-6280c.firebaseapp.com",
    projectId: "what-can-i-eat-6280c",
    storageBucket: "what-can-i-eat-6280c.appspot.com",
    messagingSenderId: "24047731276",
    appId: "1:24047731276:web:898c491369ab917fd2eae9",
    measurementId: "G-NJP5VS871B"
};

export const databaseInit = () => {


    // Check if firebase have already been intialize 
    if (!firebase.apps.length) {
        console.log("h")
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    //const auth = firebase.auth();
    //const firestore = firebase.firestore();
}



/**
 * Signs into a user with provided credentials.
 *
 * @param email: Of user account.
 * @param password: Of user account
 * @return AuthenticationResponse: Containing success / failure and error message.
 */
export const emailSignup = async (name, email, password) => {
    //Preconditions
    if (!email) return new AuthenticationResponse(false, 'Email is required');
    if (!password) return new AuthenticationResponse(false, 'Password is required')

    if (email !== '' && password !== '') {
        await firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                return userCredential.user.updateProfile({
                    displayName: name
                }).finally()
                console.log(name)
                // Signed in 
                const user = userCredential.user;
                alert("Sign Up Successfully")
                //navigation.navigate("Add Menu")
                return new AuthenticationResponse(true);
            })
            .catch(error => {
                //console.log(error);
                //setSignupError(error.message);
                return new AuthenticationResponse(false, error.message);
            });
    }
};



/**
 * Describes the return type of requests.
 */
export class AuthenticationResponse {
    //public success: boolean;
    //public errorMessage: string | null;

    /**
     * Describes the return type of requests.
     *
     * @param success: `true` if successful, `false` otherwise.
     * @param errorMessage: (Optional) to notify user.
     */
    constructor(success, errorMessage) {
        this.success = success;
        this.errorMessage = (errorMessage) ? errorMessage : null;
    }
}