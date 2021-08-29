import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Welcome from './Welcome';

const HomeScreen = ({ navigation }) => {
    return (
        //Go to welcome only if no prefences are stored
        <Welcome navigation={navigation}/>
    );
}

export default HomeScreen