import 'react-native-gesture-handler';
import React from 'react';
import SideDrawerMenu from './screens/SideDrawerMenu';
import UserProvider from './business/LoginManager'
import DietProvider from './business/DietaryManager'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

/**
 * Groups provaiders and initiate the navigation
 * @returns the root component to initiate the app rendering
 */
export default function App() {
  return (
    <UserProvider>
      <DietProvider>
        <SideDrawerMenu />
      </DietProvider>
    </UserProvider>
  );
}