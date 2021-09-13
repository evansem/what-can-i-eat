import React, { useState } from 'react';
import {  StyleSheet, TextInput, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import { global_style, primaryColor, secondaryColor } from '../style';

const Separator = () => <View style={global_style.separator} />;

const AddMenu = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //state = { email: '', password: '', errorMessage: '', loading: false };
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  //firebase.initializeApp(firebaseConfig);

  // Listen for authentication state to change.
firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    console.log('We are authenticated now!');
  }

  // Do other things
});


async function signInWithEmail() {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(error => {
        console.log("CATCHNG");
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            this.onLoginFailure.bind(this)('Weak Password!');
        } else {
            console.log("Err coming")
            this.onLoginFailure.bind(this)(errorMessage);
        }
    });
}


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={{ fontSize: 32, fontWeight: "700"}}>
              Sign In
            </Text>
            <View style={global_style.textForm}>
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
              <Button onPress={() => signInWithEmail()} title="Submit" color={primaryColor} />
              <Separator />
              <Button onPress={() => navigation.navigate("Restaurant Signup")} 
              title="Don't have an Account?" color={secondaryColor} />
            </View>
        </SafeAreaView>
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   <Button
      //     onPress={() => alert("Not Available")}
      //     title="Search"
      //   />
      //   <TouchableOpacity
      //         style={{ width: '86%', marginTop: 10 }}
      //         onPress={() => this.signInWithEmail()}>
      //             <Text>Sign In</Text>
      //       </TouchableOpacity>
      // </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      margin: 5,
      padding: 10
      
    },
    
    // button: {
    //   backgroundColor: "#3A559F",
    //   height: 44,
    //   flexDirection: "row",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   borderRadius: 22
    // },
    
  });

  export default AddMenu