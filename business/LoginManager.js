import React, { createContext, useEffect, useState } from "react";
import { DrawerItem } from '@react-navigation/drawer';
import firebase from "firebase/app";
import { databaseInit } from '../data/FirebaseHandler'

/**
 * The context containing the user profile to be exposed to the rest of the application.
 */
export const UserContext = createContext(null);

/**
 * Component used to provide the user context to the rest of the app.
 * It also includes call-back functions to facilitate the modification of the context
 */
export const UserProvider = (props) => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    databaseInit();

    async function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    // Subscribe to any auth changes.
    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    // Provider to expose UserContext to rest of the application.
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}

/**
 * Wrapper for conditional rendering based on user context
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

export const checkLogin = (navigation, user) => {
    if (user != null) {
        console.log("Already logged in")
    } else {
        // No user is signed in, allow them to enter thier credential
        navigation.navigate("Restaurant Login");
    }
}

/**
 * Inform users if they have logged in as restaurants
 */
export const getDisplayName = (user) => {
    if (user != null) return "Logged in as: " + user.displayName + " (restaurant access granted)"

}

/**
 * A bar which is used to conviniently remind the user when they are signed in
 */
export const loginLabel = (user) => {
    return (
        <ShowIfLoggedIn pageSupplier={
            (user) => {
                return (
                    <DrawerItem label={"Logged in as: " + user.displayName + " (restaurant access)"} />
                )
            }
        } orElse={<></>} />
    )
}

export default UserProvider;