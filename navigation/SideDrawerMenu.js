import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "../screens/Home"
import Search from "../screens/Search"
import { loginLabel, ShowIfLoggedIn } from '../business/LoginManager';
import SmallLogo from '../components/SmallLogo';
import { primaryColor } from '../constants/style';
import UpdateDietNavi from './UpdateDietNavi';
import RestaurantPortalNavi from './RestaurantPortalNavi';
import Logout from '../screens/restaurant/Logout';
import Menu from '../screens/Menu';

const Drawer = createDrawerNavigator();

/**
 * Main navigation accessible through the hamburger menu which will always be displayed
 */
export default function SideDrawerMenu() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home" 
                backBehavior="history"
                screenOptions={{
                    headerTitle: props => <SmallLogo {...props} />,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { alignSelf: 'center' },
                    drawerActiveTintColor: primaryColor,
                }}>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Preferences" component={UpdateDietNavi} />
                <Drawer.Screen name="Search" component={Search} />
                <Drawer.Screen name="Menu" component={Menu} initialParams={null}/>
                <Drawer.Screen name="Restaurant Portal" component={RestaurantPortalNavi} />
                <Drawer.Screen name="Sign Out" component={Logout} />
                
            </Drawer.Navigator>
            <ShowIfLoggedIn pageSupplier={loginLabel} orElse={null} />
            
        </NavigationContainer>
    );
}