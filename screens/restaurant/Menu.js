import React, { Component, useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { getMenu, signInWithEmail } from '../../data/FirebaseHandler';
import { global_style, primaryColor, secondaryColor } from '../../constants/style';
import Login from './Login';
import { ShowIfLoggedIn, UserContext } from '../../business/LoginManager';
import Item from '../../components/Item';
import LargeButton from '../../components/LargeButton';

const Menu = ({ route, navigation }) => {
    //route.params
    return (
        <ShowIfLoggedIn pageSupplier={
            (user) => {
                return (
                    <SafeAreaView style={global_style.container}>
                        {/* <Item title={user.displayName} style={global_style.item} /> */}
                        <MenuTable route={route} />
                    </SafeAreaView>

                )
            }

        } orElse={
            <SafeAreaView style={global_style.container}>
                <MenuTable route={route} />

            </SafeAreaView>
        } />
    )
}

//const MenuTable = ({route}) => {
class MenuTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.route.params.restaurant.id,
            menu: [],
        }

        //Loading meals for this restaurant
        getMenu(this.state.id).then(e => {
            this.state.menu = e
            //Menu needs to be mapped first then call .data() on meals
        
            this.forceUpdate()
        }).catch(error =>
            console.log(error))
    }

    render() {

        //console.log(JSON.stringify(this.props.route))
        

        

        //console.log(JSON.stringify(data))
        if (!this.props.route) {
            return <Item title='Select a menu from the search page' style={global_style.item} />;
        }

        const data = this.props.route.params.restaurant.data()
        return (
            <ScrollView>
                <Item title={data.name} style={global_style.item} />

                {/* After arrow, round brakets need to be use so that it is interpret as a component */}
                {this.state.menu.map((meal) => (
                    <Item key={meal.id}
                    title={meal.data().name} style={global_style.item} />
                ))}

            </ScrollView>
        )
    }
}

export default Menu