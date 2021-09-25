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
        });
}

//=================================================================//
//                              REGISTRATION                       //
//=================================================================//

/**
 * Given an address it calulates its coordinates 
 * based on first result returned by the geo-location decoder
 */
export const getAddressCoordinates = async (address) => {
    //Request permission to validate the address
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("Location request " + status)
    //Geocode an address string to latitude-longitude location
    let location = await Location.geocodeAsync(address);
    if (location == null) { return null; }
    console.log("Selected location " + location[0].latitude + " " + location[0].longitude)

    return location[0]
}
/**
 * Signs into a user with provided credentials.
 *
 * @param email: Of user account.
 * @param password: Of user account
 */
export const emailSignup = async (name, address, email, password, onSuccess) => {
    //Preconditions
    if (requires[name, address, email, password] != null) {
        console.log("unsufficient data supplied")
        return null;
    }

    let location = getAddressCoordinates(address)

    //Default value if the address is invalid
    let latitude = location.latitude
    let longitude = location.longitude

    if (!latitude) {
        //Default location
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
        })
        .catch(error => {
            console.log(error);
        });

    addRestaurant(name, latitude, longitude)
    onSuccess()
};

//=================================================================//
//                     MENU AND MEALS OPERATIONS                   //
//=================================================================//


/**
 * Get restaurant general data 
 * Usual use:
 *  .map((doc) => {
 *      doc.data() 
 */
export const getRestaurants = async () => {
    const querySnapshot = await firebase.firestore().collection('restaurant').get()
    return querySnapshot.docs;
}

/**
 * Get meals in a menu
 */
export const getMenu = async (restaurantID) => {
    const querySnapshot = await firebase.firestore()
    .collection('restaurant').doc(restaurantID)
    .collection('menu').get()

    return querySnapshot.docs;
}

/**
 * Create a new documet folder in the database with its general information
 */
export const addRestaurant = (name, latitude, longitude) => {

    // Write a new message to the database collection "restaurant"
    var uid = firebase.auth().currentUser.uid
    firebase.firestore().collection('restaurant').doc(uid).set({
        name: name,
        latitude: latitude,
        longitude: longitude,
    })
    console.log("Restaurant added")
}

export const addMeal = (user, mealToAdd, dietTags) => {
    // Write a new message to the database collection menu for this restaurant
    var uid = firebase.auth().currentUser.uid
    console.log(mealToAdd)
    firebase.firestore().collection('restaurant').doc(uid).collection('menu').doc().set({
        name: mealToAdd,
        dietTags: dietTags,
        lastModified: Date.now()
    })
    //Alternativly firestore.FieldValue.serverTimestamp() can be used for date
    return false;
}

/**
 * This is invoked to list some tags that users will like to be added into the app
 */
export const suggestDietaryTag = (dietTag) => {
    if (dietTag == null || dietTag == "") { return null; }
    firebase.firestore().collection('diet').add({
        name: dietTag,
        submitted: Date.now()
    })
}