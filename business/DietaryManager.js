import React, { createContext, Component, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { loadPreferences, savePreferences, outputFilename } from '../data/DietaryHandler'




export const DietContext = createContext({
    //The checkbox data is stored in the diet json file
    data: [],
    //This field will store the selected options
    selected: [],
    filename: outputFilename,
    updateData: (data) => { console.err("Dummy data update invoked!") },
    updateSelected: (data) => { console.err("Dummy select update invoked!") }
});

/**
 * Simply delegates the operation to the data layer
 * @param data object containing the updated checkbox results 
 */
export const exportDiet = (data, updateSelected) => {
    if (data == undefined || updateSelected == undefined) {
        //Cusom error logs to help with troubleshooting
        console.log("Diet data couldn't be exported because undefinded")
    } else {
        //Store the selected option in the context
        updateSelected(savePreferences(data))
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

        //Call back functions to update the diet context's fields
        this.updateData = (newData) => {
            this.setState(state => ({
                data: newData
            }))
        }
        this.updateSelected = (newSelected) => {
            this.setState(state => ({
                selected: newSelected
            }))
        }

        //Use a local variable to hold the function to avoid unintentional calls
        this.importedDiet = loadPreferences(this.updateData, this.updateSelected, () => this.forceUpdate())

        // State also contains the updater function so it will
        // be passed down into the context provider
        this.state = {
            //The checkbox data is stored in the diet json file
            data: this.importedDiet,
            //This field will store the selected options
            selected: [],
            filename: outputFilename,
            updateData: this.updateData,
            updateSelected: this.updateSelected
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