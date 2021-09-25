import React from 'react';
import { Text, View } from 'react-native';
import { global_style } from '../constants/style';
import LargeButton from '../components/LargeButton';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={global_style.container}>
    
          <Text style={[global_style.title, {fontSize: 30}]}>
            Welcome!
          </Text>
    
          <LargeButton onPress={() => navigation.navigate("Preferences")} title="What can I eat?" />
    
          <LargeButton onPress={() => navigation.navigate("Restaurant Portal")} title="Add a menu" />
          </View>
      );
}

export default HomeScreen