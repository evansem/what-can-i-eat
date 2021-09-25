import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddMenu from '../screens/restaurant/AddMenu';
import Login from '../screens/restaurant/Login';
import SignupScreen from '../screens/restaurant/SignUp';
import Restaurant from '../screens/restaurant/Restaurant';
import Menu from '../screens/restaurant/Menu';
import ConfirmationPage from '../components/Confirmation';

const Stack = createNativeStackNavigator();

/**
 * A sub navigation to be use nested the main drawer navigation.
 * It facilitates the transaction between sever screens all realated to
 * the operations to manage menus
 */
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
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Restaurant Login" component={Login} />
            <Stack.Screen name="Restaurant Signup" component={SignupScreen} />
            <Stack.Screen name="Success Page" component={SuccessPage} />
        </Stack.Navigator>
    );
};

/**
 * Extends the confirmation page to make it more accessible throught the restarant portal.
 * This is important so that you can navigate to it after some actions have succeeded without
 * having to use wrappers for conditional display.
 */
const SuccessPage = ({ navigation }) => {
    return (
        <ConfirmationPage message="Operation succeeded"
            buttonText='Go to restaurant portal'
            buttonAction={() => navigation.navigate('Restaurant Portal')} />
    )
}

export default RestaurantPortalNavi;