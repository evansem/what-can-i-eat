import React from 'react';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./Home"
import Search from "./Search"
import Welcome from "./Welcome"
import AddMenu from './AddMenu';
import Preferences from './Preferences';
import SignupScreen from './SignUp';
import Login from './Login';
import { UserContext, loginLabel, ShowIfLoggedIn } from '../business/LoginManager';
import SmallLogo from '../components/SmallLogo';
import { primaryColor } from '../constants/style';
import Restaurant from './Restaurant';



const Drawer = createDrawerNavigator();

export default function SideDrawerMenu() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Add Menu" //"Home" 
                backBehavior="history"
                screenOptions={{
                    headerTitle: props => <SmallLogo {...props} />,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { alignSelf: 'center' },
                    //headerTitleStyle: {textAlign: 'center', justifyContent: 'center', alignItems: 'center'},
                    drawerActiveTintColor: primaryColor,
                }}>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Preferences" component={Preferences} />
                <Drawer.Screen name="Search" component={Search} />
                <Drawer.Screen name="Restaurant Portal" component={Restaurant} />
                <Drawer.Screen name="Add Menu" component={AddMenu} />
                <Drawer.Screen name="Restaurant Login" component={Login} />
                <Drawer.Screen name="Restaurant Signup" component={SignupScreen} />
                
            </Drawer.Navigator>
            <ShowIfLoggedIn pageSupplier={loginLabel} orElse={null} />
            {/* <UserContext.Consumer>
                {loginLabel}
            </UserContext.Consumer> */}
            
        </NavigationContainer>
    );
}