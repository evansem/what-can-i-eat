import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { signInWithEmail } from '../../data/FirebaseHandler';
import { global_style, primaryColor, secondaryColor } from '../../constants/style';
import Login from './Login';
import { ShowIfLoggedIn, UserContext } from '../../business/LoginManager';
import Item from '../../components/Item';
import LargeButton from '../../components/LargeButton';

const Restaurant = ({ navigation }) => {
    return (
        <ShowIfLoggedIn pageSupplier={
            (user) => {
                return (
                    <SafeAreaView style={global_style.container}>
                        <Item title={user.displayName} style={global_style.item} />

                        <LargeButton onPress={() => navigation.navigate("Add Menu")} title="Add a meal" />
                        <LargeButton onPress={() => navigation.navigate("Menu")} title="View your menu" />
                    </SafeAreaView>

                )
            }

        } orElse={<Login navigation={navigation} />} />
    )
}

export default Restaurant