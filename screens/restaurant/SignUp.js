import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, TextInput, Button } from 'react-native';
import { global_style, secondaryColor } from '../../constants/style';
import { emailSignup } from '../../data/FirebaseHandler'
import Item from '../../components/Item';
import SubmitFormButton from '../../components/SubmitFormButton';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView style={global_style.textForm}>
        <Item title="Thanks for getting started, you community will be grateful!" style={global_style.item}/>

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
          placeholder='Restaurant address'
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
          secureTextEntry={true}
          textContentType='password'
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <SubmitFormButton title='Signup' onPress={() => emailSignup(name, location, email, password,
          () => navigation.navigate("Success Page")
        )}
          dataRequired={[name, location, email, password]} />

        <View style={global_style.separator} />
        <Button title='Go to Login' color={secondaryColor} onPress={() => navigation.navigate('Restaurant Login')} />
      </ScrollView>
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