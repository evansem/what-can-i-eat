import React, { createContext, useEffect, useState } from "react";
import { DrawerItem } from '@react-navigation/drawer';
import firebase from "firebase/app";
import {databaseInit} from '../data/FirebaseHandler'

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
        console.log('Manager: setting user');
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
 * Inform users if they have logged in as restaurants
 */
export const loginLabel = (user) => {
    if (user != null) return <DrawerItem
            label={"Logged in as: "+user.displayName+" (restaurant access granted)"}/>
    //         onPress={() => console.log("hi")}
}

export default UserProvider;