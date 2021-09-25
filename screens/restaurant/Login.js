import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { signInWithEmail } from '../../data/FirebaseHandler';
import { global_style, primaryColor, secondaryColor } from '../../constants/style';
import ErrorMessage from '../../components/ErrorMessage'

const Separator = () => <View style={global_style.separator} />;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    
    <View style={global_style.textForm}>
      <Text style={global_style.mainHeader}>
        Sign In
      </Text>
      <TextInput
        style={global_style.inputBox}
        placeholder="Email"
        placeholderTextColor="#B1B1B1"
        returnKeyType="next"
        //keyboardType="email-address"
        // textContentType="emailAddress"
        value={email}
        onChangeText={newEmail => setEmail(newEmail)}
      />
      <TextInput
        style={global_style.inputBox}
        placeholder="Password"
        placeholderTextColor="#B1B1B1"
        returnKeyType="done"
        textContentType="newPassword"
        secureTextEntry={true}
        value={password}
        onChangeText={p => setPassword(p)}
      />
      {/* <ErrorMessage error="NA" visible={true}/> */}

      {/* {this.renderLoading()} */}
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: "red",
          width: "80%"
        }}
      >
        {/* {this.state.error} */}
      </Text>
      <Button onPress={() => {signInWithEmail(email, password); navigation.navigate("Add Menu")}} 
      title="Login as a Restaurant" color={primaryColor} />
      <Separator />
      <Button onPress={() => navigation.navigate("Restaurant Signup")}
        title="Don't have an Account?" color={secondaryColor} />
    </View>
  );
}

export default Login