import React from "react";
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Formik, Form } from 'formik';
import { global_style, primaryColor } from '../../constants/style';

import * as FileSystem from 'expo-file-system';

import { DietryOptions, exportDiet, DietContext } from '../../business/DietaryManager'
import { SelectedDiet } from '../../components/SelectedDiet'
import { useState } from "react/cjs/react.development";
import { TextInput } from "react-native-gesture-handler";
import { suggestDietaryTag } from "../../data/FirebaseHandler";
//Expo file system creates a separate storage space for each app

//Load the possible dietry tags for the source code directory
//const DietData = require('../assets/diet.json')

//const global_style = require('../style');

function verifyAck(value) {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}

/**
 * Creates the page which allows users to update the dietry preferences
 * Designed in the old-fashion class styled to better handle the state of multiple checkboxes
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
                    {({ data, updateData, updateSelected }) => (
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
                <Button onPress={() => suggestDietaryTag(suggestion)} title="Send Anonymously" color={primaryColor} />


            </ScrollView>
        </SafeAreaView>
    )
}

export default Preferences