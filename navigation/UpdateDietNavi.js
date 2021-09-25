import React from 'react';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import Preferences from '../screens/diet/Preferences';
import DietDisclamer from '../screens/diet/DietDisclaimer';

const Stack = createNativeStackNavigator();

/**
 * A sub navigation to be use nested the main drawer navigation.
 * It facilitates the transaction between sever screens all realated to
 * the operations to manage the user diet
 */
const UpdateDietNavi = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectDiet">
      <Stack.Screen
        name="SelectDiet"
        component={Preferences}
        options={{
          title: 'Update Your Diet',
        }}
      />
      <Stack.Screen 
      name="AckDiet" 
      component={DietDisclamer}
      options={{
        title: 'Important Disclaimer'
       }} />
    </Stack.Navigator>
  );
};
export default UpdateDietNavi;