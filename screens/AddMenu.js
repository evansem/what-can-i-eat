import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { global_style, primaryColor, secondaryColor } from '../constants/style';
import ErrorMessage from '../components/ErrorMessage'
import Login from './Login';


const AddMenu = ({ navigation }) => {

  return (
    <SafeAreaView style={global_style.container}>
      <Login/>
    </SafeAreaView>
  );
}

export default AddMenu