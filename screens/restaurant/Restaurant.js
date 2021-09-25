import React from 'react';
import { SafeAreaView } from 'react-native';
import { global_style } from '../../constants/style';
import Login from './Login';
import { ShowIfLoggedIn } from '../../business/LoginManager';
import Item from '../../components/Item';
import LargeButton from '../../components/LargeButton';
import { getRestaurant, getRestaurants } from '../../data/FirebaseHandler';

const Restaurant = ({ navigation }) => {
    return (
        <ShowIfLoggedIn pageSupplier={
            (user) => {
                return (
                    <SafeAreaView style={global_style.container}>
                        <Item title={user.displayName} style={global_style.item} />

                        <LargeButton title="Add a meal" onPress={() => navigation.navigate("Add Menu")} />
                        <LargeButton title="View your menu" onPress={() => navigation.navigate("Menu"
                                    // , {restaurant: getRestaurants().finally(e => e.filter(id => id == user.uid))}
                                    )} />
                    </SafeAreaView>

                )
            }

        } orElse={<Login navigation={navigation} />} />
    )
}

export default Restaurant