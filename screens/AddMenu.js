import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase/app'

const AddMenu = () => {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBMyVA_URwEDHHTgmuVUPg09Wg727OU0Qk",
    authDomain: "what-can-i-eat-6280c.firebaseapp.com",
    databaseURL: "https://what-can-i-eat-6280c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "what-can-i-eat-6280c",
    storageBucket: "what-can-i-eat-6280c.appspot.com",
    messagingSenderId: "24047731276",
    appId: "1:24047731276:web:898c491369ab917fd2eae9",
    measurementId: "G-NJP5VS871B"
  };

  firebase.initializeApp(firebaseConfig);

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
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(this.onLoginSuccess.bind(this))
    .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            this.onLoginFailure.bind(this)('Weak Password!');
        } else {
            this.onLoginFailure.bind(this)(errorMessage);
        }
    });
}


    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={{ fontSize: 32, fontWeight: "700", color: "gray" }}>
              App Name
            </Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </View>
            {this.renderLoading()}
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "red",
                width: "80%"
              }}
            >
              {this.state.error}
            </Text>
            <TouchableOpacity
              style={{ width: '86%', marginTop: 10 }}
              onPress={() => this.signInWithEmail()}>
                  <Text>Sign In</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
                onPress={() => {
                  alert("Urra! welcome")
                  //this.props.navigation.navigate("SignUp");
                }}
              >
                Don't have an Account?
              </Text>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
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

  export default AddMenu