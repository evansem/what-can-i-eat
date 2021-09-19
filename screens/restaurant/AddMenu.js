import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { global_style, primaryColor, secondaryColor } from '../../constants/style';
import ErrorMessage from '../../components/ErrorMessage'
import Login from './Login';
import Item from '../../components/Item';
import { checkLogin, getDisplayName, ShowIfLoggedIn, UserContext } from '../../business/LoginManager';
import { addMeal } from '../../data/FirebaseHandler';
import InlineError from '../../components/InlineError';
import { DietryOptions } from '../../business/DietaryManager';
import { getDefaultDietTags } from '../../data/DietaryHandler'
import { render } from 'react-dom';


const AddMenu = ({ navigation }) => {

  const defaultTags = getDefaultDietTags();

  const [meal, setMeal] = useState('');
  const [dietTags, setDietTags] = useState(defaultTags);
  const [mealError, setMealError] = useState(null);


  return (
    <ShowIfLoggedIn pageSupplier={
      (user) => (
        <SafeAreaView style={global_style.container}>
          <ScrollView>
            {/* <Item title={getDisplayName} /> */}

            {/* <Button title="Login" onPress={() => checkLogin(navigation, user)} /> */}
            <TextInput
              style={global_style.inputBox}
              placeholder='Enter meal name'
              autoFocus={true}
              value={meal}
              onChangeText={text => setMeal(text)}
            />
            <View style={global_style.checkboxContainer}>
              <DietryOptions dietData={dietTags} updateData={(data) => {
                setDietTags(data)}} />

              {/* <Button onPress={() => navigation.push('AckDiet')} title="Submit" color={primaryColor} /> */}

            </View>




            <InlineError message={mealError} />

            <Button title="Add Meal" color={primaryColor}
              onPress={() => {
                if (meal == undefined || meal.trim() === "") {
                  setMealError("Meal name required");
                } else {
                  setMealError(null)
                  addMeal(user, meal)
                }
              }} />
          </ScrollView>
        </SafeAreaView>
      )
    } orElse={<Login navigation={navigation} />} />
  )


}


export default AddMenu