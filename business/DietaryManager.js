import React, { createContext, Component, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

//Expo file system creates a separate storage space for each app
import * as FileSystem from 'expo-file-system';

import { loadPreferences, savePreferences } from '../data/DietaryHandler'
import { UserContext } from "./LoginManager";
 

//Load the possible dietry tags for the source code directory
const DietData = require('../assets/diet.json')

export const DietContext = createContext({
    //The checkbox data is stored in the diet json file
    data: DietData,
    //This field will store the selected options
    selected: [],
    filename: `${FileSystem.documentDirectory}preferences` //TODO set in handler
});



export const updateDiet = () => {
    savePreferences()
}

/**
 * Keep data in sync when toggling a given checkbox on and off
 * @param {number} id indicates the checkbox which have been clicked
 */
const toggleCheckbox = (id) => {
    const data = this.state.data
    const index = this.state.data.findIndex(x => x.id === id);
    data[index].checked = !data[index].checked
    this.setState(data)
    //console.log("On checked: "+JSON.stringify(this.state.data))
}

export const DietProvider = (props) => {
    loadPreferences();

    // Provider to expose UserContext to rest of the application.
    return (
        <DietContext.Provider value={UserContext}>
            {props.children}
        </DietContext.Provider>
    );
}

/**
 * Generates a form made of checkboxes
 * @returns a sequence of checkboxes created based on the dietry data currently loaded
 */
export const DietryOptions = ({ dietData }) => {
    //console.log("On render: "+JSON.stringify(this.state.data))

    return dietData.map((item, key) =>
        <TouchableOpacity style={{ flexDirection: "row" }}
            key={key} onPress={() => toggleCheckbox(item.id)}>
            <CheckBox value={item.checked} onValueChange={() => { toggleCheckbox(item.id) }} />
            <Text>{item.key}</Text>
        </TouchableOpacity>
    )
}
