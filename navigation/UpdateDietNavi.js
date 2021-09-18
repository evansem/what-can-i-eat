import React from 'react';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import Preferences from '../screens/diet/Preferences';
import DietDisclamer from '../screens/diet/DietDisclaimer';

const Stack = createNativeStackNavigator();

const UpdateDietNavi = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectDiet">
      <Stack.Screen
        name="SelectDiet"
        component={Preferences}
        options={{
          title: 'Update Your Diet',
          // headerStyle: {
          //   backgroundColor: '#09f',
          // },
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