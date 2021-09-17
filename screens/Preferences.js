import React from "react";
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Formik, Form } from 'formik';
import { global_style, primaryColor } from '../constants/style';

import * as FileSystem from 'expo-file-system';

import { DietryOptions, exportDiet, DietContext, SelectedOptions } from '../business/DietaryManager'
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

    

    /**
     * Main method to organize the content of this page
     * @returns the components displyed in this page
     */
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text>
                    Select all tags apporiate for your diet
                </Text>
                <Text>
                    Your diet requirements can be changed any time, through the menu in preferences.
                    When ordering remember to always ask the waiter to add the allergens as a special note in the order",
                </Text>
                <DietContext.Consumer>
                    {({ data, selected, updateData, updateSelected }) => (
                        <View style={styles.checkboxContainer}>
                            <DietryOptions dietData={data} updateData={updateData} />

                            <Text>
                                I acknowledge I will take the responsibility of asking the waiter for confirmation
                            </Text>
                            <Button onPress={() => exportDiet(data, updateSelected)} title="Submit" color={primaryColor} />
                            
                        </View>
                        
                    )}
                </DietContext.Consumer>

                <SelectedOptions/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 40,
        fontSize: 18,
        alignItems: "center",
    },
    checkboxContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        margin: 40,
    },
});

export default Preferences