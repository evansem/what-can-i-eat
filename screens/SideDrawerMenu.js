import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./Home"
import Search from "./Search"
import Welcome from "./Welcome"
import AddMenu from './AddMenu';
import Preferences from './Preferences';
import SignupScreen from './SignUp';

function LogoTitle() {
    return (
        
            <Image
                resizeMode="contain"
                style={{
                    alignSelf: "center",
                    flex: 1,
                    width: 50,
                    height: 50,
                    // flexDirection: 'column',
                    // height: '100%',
                    margin: 5,
                }}
                source={require('../assets/logo.png')}
            />
        //     <View style={{
        //         flex: 1,
        //         justifyContent: 'center',
        //         alignItems: 'center'
        //     }}>
        // </View>
    );
}

const Drawer = createDrawerNavigator();

export default function SideDrawerMenu() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Add Menu" //"Home" 
                backBehavior="history"
                screenOptions={{
                    headerTitle: props => <LogoTitle {...props} />,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { alignSelf: 'center' },
                    //headerTitleStyle: {textAlign: 'center', justifyContent: 'center', alignItems: 'center'},
                    drawerActiveTintColor: '#008037',
                }}
                >
                
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Search" component={Search} />
                <Drawer.Screen name="Add Menu" component={AddMenu} />
                <Drawer.Screen name="Preferences" component={Preferences} />
                <Drawer.Screen name="Restaurant Signup" component={SignupScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}