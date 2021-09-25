import firebase from 'firebase/app';
import { collection, query, where, getDocs } from "firebase/firestore";
import 'firebase/firestore'
import 'firebase/auth'
import { requires } from '../business/GeneralLogic';
import * as Location from 'expo-location';


//=================================================================//
//                        DATABASE SETUP                           //
//=================================================================//

const firebaseConfig = {
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
        //console.log("Initializing Firebase app...")
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    //const auth = firebase.auth();
    //const firestore = firebase.firestore();
}

//=================================================================//
//                         LOGIN OPERATIONS                        //
//=================================================================//

export async function signOut() {
    var message = ''
    await firebase.auth().signOut().then(() => {
        // Sign-out successful.
        message = "Logout successfully"
    }).catch((error) => {
        // An error happened.
        message = "Couldn't logout"
    });
    return message
}

// Listen for authentication state to change.
//   firebase.auth().onAuthStateChanged(user => {
//     if (user != null) {
//       console.log('We are authenticated now!');
//     }

//     // Do other things
//   });


export async function signInWithEmail(email, password) {
    await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("logged in");
            //this.onLoginSuccess.bind(this)
        })
        .catch(error => {
            console.log(error.message);
            // let errorCode = error.code;
            // let errorMessage = error.message;
            // if (errorCode == 'auth/weak-password') {
            //     this.onLoginFailure.bind(this)('Weak Password!');
            // } else {
            //     console.log("Err coming")
            //     this.onLoginFailure.bind(this)(errorMessage);
            // }
        });
}

//=================================================================//
//                              REGISTRATION                       //
//=================================================================//
/**
 * Signs into a user with provided credentials.
 *
 * @param email: Of user account.
 * @param password: Of user account
 */
export const emailSignup = async (name, address, email, password, onSuccess) => {
    if (requires[name, address, email, password] != null) {
        console.log("unsufficient data supplied")
        return null;
    }
    //Preconditions
    //if (!email) return new AuthenticationResponse(false, 'Email is required');
    //if (!password) return new AuthenticationResponse(false, 'Password is required')

    //Request permission to validate the address
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("Location request " + status)
    //Geocode an address string to latitude-longitude location
    let location = await Location.geocodeAsync(address);
    if (location == null) { return null; }
    console.log("Selected location " + location.latitude + " " + location.longitude)

    //Default value if the address is invalid
    let latitude = location.latitude
    let longitude = location.longitude

    if (!latitude) {
        latitude = '-41.29017925997491'
        longitude = '174.76838958609653'
    }

    console.log("Ready to add a user")

    await firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            userCredential.user.updateProfile({
                displayName: name
            })
            //.finally()


            console.log("Added login for " + name)
            // // Signed in 
            // const user = userCredential.user;
            // alert("Sign Up Successfully")
            // //navigation.navigate("Add Menu")
            // return new AuthenticationResponse(true);
        })
        .catch(error => {
            console.log(error);
            //setSignupError(error.message);
            //return new AuthenticationResponse(false, error.message);
        });

    addRestaurant(latitude, longitude)
    console.log("Added restaurant page")
    onSuccess()
};

//=================================================================//
//                     MENU AND MEALS OPERATIONS                   //
//=================================================================//



export const getRestaurants = async () => {
    //const q = query(firebase.firestore().collection('restaurant')); //, where("capital", "==", true)

    const querySnapshot = await firebase.firestore().collection('restaurant').get()//await getDocs(q);
    // querySnapshot.docs.map((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id + " => " + JSON.stringify(doc.data()));
    // });
    return querySnapshot.docs;
}

export const getMenu = async (restaurantID) => {
    //const q = query(firebase.firestore().collection('restaurant')); //, where("capital", "==", true)

    const querySnapshot = await firebase.firestore()
    .collection('restaurant').doc(restaurantID)
    .collection('menu').get()//await getDocs(q);
    // querySnapshot.docs.map((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id + " => " + JSON.stringify(doc.data()));
    // });
    return querySnapshot.docs;
}



export const addRestaurant = (latitude, longitude) => {
    const user = firebase.auth().currentUser;

    // Prevent the default form redirect
    //meal.preventDefault();
    // Write a new message to the database collection "restaurant"
    var uid = firebase.auth().currentUser.uid
    //console.log(user)
    firebase.firestore().collection('restaurant').doc(uid).set({
        name: user.displayName,
        latitude: latitude,
        longitude: longitude,
    })
    console.log("Restaurant added")
}

export const addMeal = (user, mealToAdd) => {
    // Prevent the default form redirect
    //meal.preventDefault();
    // Write a new message to the database collection menu for this restaurant
    var uid = firebase.auth().currentUser.uid
    console.log(mealToAdd)
    firebase.firestore().collection('restaurant').doc(uid).collection('menu').doc().set({
        name: mealToAdd,
        lastModified: Date.now()
    })
    //firestore.FieldValue.serverTimestamp()
    console.log("Meal added")

    // .add({ //doc(user.uid).set({
    //     text: mealToAdd,
    //     timestamp: Date.now(),
    //     name: user.displayName
    // }).then(() => {
    //     console.log('User added!');
    // }).catch(() =>
    //     console.log(firebase.firestore().collection('restaurant'))
    // )



    // clear message input field
    //input.value = '';
    // Return false to avoid redirect
    return false;
}

export const suggestDietaryTag = (dietTag) => {
    if (dietTag == null || dietTag == "") { return null; }
    // Prevent the default form redirect
    //meal.preventDefault();
    //console.log(user)
    firebase.firestore().collection('diet').add({
        name: dietTag,
        submitted: Date.now()
    })
    console.log("Suggestion added")
}