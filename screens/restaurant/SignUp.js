import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase/app';
import { global_style, primaryColor, secondaryColor } from '../../constants/style';
import { emailSignup } from '../../data/FirebaseHandler'
import Item from '../../components/Item';
import InlineError from '../../components/InlineError';
import { requires } from '../../business/GeneralLogic';
import SubmitFormButton from '../../components/SubmitFormButton';

//const auth = firebase.auth();

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };



  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={global_style.textForm}>
        <Item title="Thanks for getting started, you community will be grateful!" />

        <Text style={{ fontSize: 22, fontWeight: "700", margin: 10 }}>
          For your Restaurants:
        </Text>
        <StatusBar style='dark-content' />
        <Text style={styles.title}>Create an account</Text>
        <TextInput
          style={global_style.inputBox}
          placeholder='Restaurant name'
          autoFocus={true}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={global_style.inputBox}
          placeholder='Restaurant name'
          value={location}
          onChangeText={text => setLocation(text)}
        />
        <TextInput
          style={global_style.inputBox}
          leftIcon='email'
          placeholder='Enter email'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={global_style.inputBox}
          leftIcon='lock'
          placeholder='Enter password'
          autoCapitalize='none'
          secureTextEntry={passwordVisibility}
          textContentType='password'
          rightIcon={rightIcon}
          value={password}
          onChangeText={text => setPassword(text)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <SubmitFormButton title='Signup' onPress={() => emailSignup(name, location, email, password)}
          dataRequired={[name, location, email, password]} />

        {/* <Text style={styles.errorText}>{signupError}</Text> */}
        {/* <ErrorMessage error={signupError} visible={signupError} /> */}
        {/* <Text>{signupError ? <ErrorMessage error={signupError} visible={true} /> : ''}</Text> */}
        {/* <Button onPress={this.getSelectedDiet()} title="Submit" color={primaryColor} /> */}
        {/* <InlineError message={requires([name, location, email, password] )} />
        
        <Button title='Signup' color={primaryColor}
          onPress={() => emailSignup(name, location, email, password)}      /> */}
        <View style={global_style.separator} />
        <Button title='Go to Login' color={secondaryColor} //'#7387bd'
          onPress={() => navigation.navigate('Add Menu')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
    paddingBottom: 24
  },
  errorText: {
    color: '#ffc040',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  }
});

export default SignupScreen;