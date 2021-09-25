import React, { useState } from 'react';
import { TextInput, View, Button, ScrollView, SafeAreaView } from 'react-native';
import { global_style, primaryColor } from '../../constants/style';
import Login from './Login';
import { ShowIfLoggedIn } from '../../business/LoginManager';
import { addMeal } from '../../data/FirebaseHandler';
import InlineError from '../../components/InlineError';
import { DietryOptions } from '../../business/DietaryManager';
import { extractSelection, getDefaultDietTags } from '../../data/DietaryHandler'

/**
 * This page distates how will a restaurant owner interact with the app 
 * to add a meal to their restaurant's menu
 */
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
            </View>

            <InlineError message={mealError} />

            <Button title="Add Meal" color={primaryColor}
              onPress={() => {
                if (meal == undefined || meal.trim() === "") {
                  setMealError("Meal name required");
                } else {
                  //remove possible error which happened before
                  setMealError(null)
                  //submit the data
                  addMeal(user, meal, extractSelection(dietTags))
                  //remove selection on the checkboxes
                  setDietTags(defaultTags)
                  //inform user
                  navigation.navigate("Success Page");
                }
              }} />
          </ScrollView>
        </SafeAreaView>
      )
    } orElse={<Login navigation={navigation} />} />
  )
}


export default AddMenu