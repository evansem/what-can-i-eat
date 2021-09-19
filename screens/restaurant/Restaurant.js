import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { signInWithEmail } from '../../data/FirebaseHandler';
import { global_style, primaryColor, secondaryColor } from '../../constants/style';
import Login from './Login';
import { ShowIfLoggedIn, UserContext } from '../../business/LoginManager';
import Item from '../../components/Item';

const Restaurant = ({ navigation }) => {
    return (
        <ShowIfLoggedIn pageSupplier={
            (user) => {
                return (
                    <Item title={user.displayName} />
                )
            }

        } orElse={<Login navigation={navigation} />} />
    )
}

export default Restaurant