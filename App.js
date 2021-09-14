import 'react-native-gesture-handler';
import React, { useState } from 'react';
import SideDrawerMenu from './screens/SideDrawerMenu';
import UserProvider from './model/LoginManager'

export default function App() {
  return (
    <UserProvider>
        <SideDrawerMenu/>
    </UserProvider>
  );
}