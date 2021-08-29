import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SideDrawerMenu from './screens/SideDrawerMenu';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBMyVA_URwEDHHTgmuVUPg09Wg727OU0Qk",
  authDomain: "what-can-i-eat-6280c.firebaseapp.com",
  projectId: "what-can-i-eat-6280c",
  storageBucket: "what-can-i-eat-6280c.appspot.com",
  messagingSenderId: "24047731276",
  appId: "1:24047731276:web:898c491369ab917fd2eae9",
  measurementId: "G-NJP5VS871B"
};

// Check if firebase have already been intialize 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();




function LogoTitle() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'}}>
      <Image
        resizeMode="contain"
        style={{
          //alignSelf: "center",
          flex: 1,
          width: 50, 
          height: 50,
          // flexDirection: 'column',
          // height: '100%',
          margin: 5,
        }}
        source={require('./assets/logo.png')}
      />
    </View>
  );
}

const primaryColor = '#008037'
const secondaryColor = '#FF914D'

//const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SideDrawerMenu/>
  );
}
/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );

  function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
