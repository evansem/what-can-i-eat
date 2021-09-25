import React, { createContext, useEffect, useState } from "react";
import { DrawerItem } from '@react-navigation/drawer';
import firebase from "firebase/app";
import { databaseInit } from '../data/FirebaseHandler'
import { Text } from "react-native";
import Login from "../screens/restaurant/Login";

/**
 * The context containing the user profile to be exposed to the rest of the application.
 */
export const UserContext = createContext(null);

/**
 * This component is responsible for exposing the `UserContext` to the rest of the application. This component can have
 * one of three states (see `UserContextType`) and will update on user state change.
 *
 * @param props - None used.
 */
export const UserProvider = (props) => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    databaseInit();

    // Handle user state changes
    // Listen for authentication state to change.
    // firebase.auth().onAuthStateChanged(user => {
    //     if (user != null) {
    //     console.log('We are authenticated now!');
    // }
    async function onAuthStateChanged(user) {
        //if (user != null) {
        //console.log('Manager: setting user');
        setUser(user);
        if (initializing) setInitializing(false);
        //await generateUserDocument(user).then(() => syncSavedData(user));
    }

    // Subscribe to any auth changes.
    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    // Provider to expose UserContext to rest of the application.
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}

/**
 * 
 * @param pageSupplier a function which given a user returns a component
 * @param orElse a componnt to display if the user is not logged in
 */

export const ShowIfLoggedIn = ({ pageSupplier, orElse }) => {
    return (
        <UserContext.Consumer>
            {(user) => {
                if (user == null) {
                    return orElse;
                } else {
                    return pageSupplier(user);
                }
            }}
        </UserContext.Consumer>
    )
}

// export const ShowIfLoggedIn = ({ pageSupplier }) => {

//     return <ShowIfLoggedInOrElse pageSupplier={pageSupplier}
//         orElse={(user) => <Login navigation={navigation} />} />
// }

export const checkLogin = (navigation, user) => {
    if (user != null) {
        console.log("Already logged in")
        // User is signed in; allows user to sign out
        //signOut(auth);
    } else {
        // No user is signed in; allows user to sign in
        navigation.navigate("Restaurant Login");
    }

}

/**
 * Inform users if they have logged in as restaurants
 */
export const getDisplayName = (user) => {
    if (user != null) return "Logged in as: " + user.displayName + " (restaurant access granted)"

}

// export const loginLabel = (user) => {
//     <DrawerItem label={"Logged in as: " + user.displayName + " (restaurant access granted)"} />
//     //         onPress={() => console.log("hi")}
// }

export const loginLabel = (user) => {
    if (user != null) return <DrawerItem
        label={"Logged in as: " + user.displayName + " (restaurant access)"} />
        //
        // style={{alignContent: 'center'}}/>
    //         onPress={() => console.log("hi")}
}

export default UserProvider;