import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddMenu from '../screens/restaurant/AddMenu';
import Login from '../screens/restaurant/Login';
import SignupScreen from '../screens/restaurant/SignUp';
import Restaurant from '../screens/restaurant/Restaurant';

const Stack = createNativeStackNavigator();

const RestaurantPortalNavi = () => {
    return (
        <Stack.Navigator
            initialRouteName="Restaurant Home">
            <Stack.Screen
                name="Restaurant Home"
                component={Restaurant}
                options={{
                    title: 'Restaurant Portal',
                }}
            />
            <Stack.Screen name="Add Menu" component={AddMenu} />
            <Stack.Screen name="Restaurant Login" component={Login} />
            <Stack.Screen name="Restaurant Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
};
export default RestaurantPortalNavi;