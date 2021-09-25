import React from "react";
import { Text, View, Button, ScrollView, SafeAreaView } from 'react-native';
import { global_style, primaryColor } from '../../constants/style';
import { DietryOptions, DietContext } from '../../business/DietaryManager'
import { useState } from "react/cjs/react.development";
import { TextInput } from "react-native-gesture-handler";
import { suggestDietaryTag } from "../../data/FirebaseHandler";

/**
 * Creates the page which allows users to update the dietry preferences
 * 
 * 
 * Preferences page, allows users to update their dietary requirements and suggest some new dietary tags to add. 
 * It has a simple checkbox look so users will know that they can click more than one option.
 */
const Preferences = ({ navigation }) => {

    const [suggestion, setSuggestion] = useState('')

    /**
     * Main method to organize the content of this page
     * @returns the components displyed in this page
     */
    return (
        <SafeAreaView style={global_style.softContainer}>
            <ScrollView>
                <Text style={global_style.h2}>
                    Select all tags apporiate for your diet
                </Text>

                <DietContext.Consumer>
                    {({ data, updateData }) => (
                        <View style={global_style.checkboxContainer}>
                            <DietryOptions dietData={data} updateData={updateData} />

                            <Button onPress={() => navigation.push('AckDiet')} title="Submit" color={primaryColor} />

                        </View>

                    )}
                </DietContext.Consumer>

                <View style={global_style.separator} />

                <Text style={global_style.h2}>
                    Couldn't find what you were looking for?</Text>
                <Text style={global_style.paragraph}>
                    Suggest us a dietary tag or allergen to include in the app</Text>

                <TextInput
                    style={global_style.inputBox}
                    placeholder='Enter your suggestion'
                    autoFocus={true}
                    value={suggestion}
                    onChangeText={text => setSuggestion(text)}
                />
                <Button onPress={() => {
                    suggestDietaryTag(suggestion)
                    //Remmove current suggestion from input
                    setSuggestion("")
                     //inform user
                    navigation.navigate("Success Page");
                }
                } title="Send Anonymously" color={primaryColor} />


            </ScrollView>
        </SafeAreaView>
    )
}

export default Preferences