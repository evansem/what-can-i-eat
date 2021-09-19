import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { global_style, primaryColor, secondaryColor } from '../../constants/style';
import ErrorMessage from '../../components/ErrorMessage'
import Login from './Login';
import firebase from 'firebase/app';
import { checkLogin, getDisplayName, ShowIfLoggedIn, UserContext } from '../../business/LoginManager';
import Item from '../../components/Item';
import { signOut } from '../../data/FirebaseHandler';


const Logout = ({ navigation }) => {

    return (
        <ShowIfLoggedIn pageSupplier={
            (user) => {
                var message = ""
                signOut().then((value) => message = value)
                console.log(message)
                return(<LogoutPage message={message} />)}
            } orElse={
                <LogoutPage message="You are not currently logged in" />
                //<Login navigation={navigation} />
            } />
    )
}

const LogoutPage = ({ message }) => {
    return (
        <SafeAreaView style={global_style.container}>
            <Item title={message} style={global_style.item} />
        </SafeAreaView>
    )
}


export default Logout