import React, { createContext, Component, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { loadPreferences, savePreferences, outputFilename } from '../data/DietaryHandler'




export const DietContext = createContext({
    //The checkbox data is stored in the diet json file
    data: loadPreferences(),
    //This field will store the selected options
    selected: [],
    filename: outputFilename,
    updateData: (data) => { }
});

/**
 * Simply delegates the operation to the data layer
 * @param data object containing the updated checkbox results 
 */
export const exportDiet = (data) => {
    if (data == undefined) {
        console.log("Undefinded data")
    } else {
        //Unwrap the array of Json objects
        //console.log(data)
        savePreferences(data)
    }


}

/**
 * Keep data in sync when toggling a given checkbox on and off
 * @param {number} id indicates the checkbox which have been clicked
 */
const toggleCheckbox = (id, data, updateData) => {
    //console.log(data)
    // console.log("toggle")
    const index = data.findIndex(x => x.id === id);
    data[index].checked = !data[index].checked

    updateData(data);

    //this.setState(data)
    //console.log("On checked: "+JSON.stringify(this.state.data))
}

//export const DietProvider = (props) => {
class DietProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateData = (newData) => {
            this.setState(state => ({
                data: exportDiet(newData)
            }))
        }

        // State also contains the updater function so it will
        // be passed down into the context provider
        this.state = {
            //The checkbox data is stored in the diet json file
            data: loadPreferences(),
            //This field will store the selected options
            selected: [],
            filename: outputFilename,
            updateData: this.updateData,
        }
    }

    render() {
        // Provider to expose UserContext to rest of the application.
        return (
            <DietContext.Provider value={this.state}>
                {/* {console.log("Context: "+JSON.stringify(DietContext))} */}

                {this.props.children}
                {/* {console.log("State " + JSON.stringify(this.state))} */}
            </DietContext.Provider>
        );
    }
}

/**
 * Generates a form made of checkboxes
 * @returns a sequence of checkboxes created based on the dietry data currently loaded
 */
export const DietryOptions = ({ dietData, updateData }) => {
    //console.log("On render: "+JSON.stringify(this.state.data))
    
    return dietData.map((item, key) =>
        <TouchableOpacity style={{ flexDirection: "row" }}
            key={key} onPress={
                () => toggleCheckbox(item.id, dietData, updateData)}>
            <CheckBox value={item.checked} onValueChange={
                () => { toggleCheckbox(item.id, dietData, updateData) }} />
            <Text>{item.key}</Text>
        </TouchableOpacity>
    )
}

export default DietProvider