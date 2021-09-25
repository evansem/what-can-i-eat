import React from 'react';
import { Image } from 'react-native';

/**
 * Logo styled to be displayed in the center of the navigation bar 
 */
const SmallLogo = () => <Image
resizeMode="contain"
style={{
    alignSelf: "center",
    flex: 1,
    width: 50,
    height: 50,
    margin: 5,
}}
source={require('../assets/logo.png')}/>;

export default SmallLogo