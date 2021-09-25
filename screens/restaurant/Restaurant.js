import React from 'react';
import { SafeAreaView } from 'react-native';
import { global_style } from '../../constants/style';
import Login from './Login';
import { ShowIfLoggedIn } from '../../business/LoginManager';
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