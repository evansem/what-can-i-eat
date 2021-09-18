import React from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import Preferences from './diet/Preferences';
import { global_style, primaryColor } from '../constants/style';
//import Dimensions from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Welcome!
      </Text>

      {/* Pressable */}
      <TouchableOpacity 
        style={styles.largeButton}
        onPress={() => navigation.navigate("Preferences")}>
        <Text style={styles.text}>What can I eat?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.largeButton}
        onPress={() => alert("Welcome")}>
        <Text style={styles.text}>Add a menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    //paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: primaryColor,
    width: 300,
    margin: 20,
  },
  title: {
    justifyContent: 'space-between',
    fontSize: 30,
  },
  text: {
    fontSize: 18,
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default Welcome

