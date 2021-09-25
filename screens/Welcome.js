import React from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { global_style, primaryColor } from '../constants/style';
import LargeButton from '../components/LargeButton';
//import Dimensions from "react-native";

const Welcome = ({ navigation }) => {
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

export default Welcome

