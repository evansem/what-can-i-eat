import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Formik, Form } from 'formik';
import { global_style, primaryColor } from '../style';
import CheckBox from '@react-native-community/checkbox';
import * as FileSystem from 'expo-file-system';
//Expo file system creates a separate storage space for each app

//Load the possible dietry tags for the source code directory
const DietData = require('../assets/diet.json')

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
export default class Preferences extends Component {
    constructor(props){
        super(props)
        this.state = {
            //The checkbox data is stored in the diet json file
            data: DietData,
            //This field will store the selected options
            selected: [],
            filename: `${FileSystem.documentDirectory}preferences`
        }

        //Load preferences from local storage
        FileSystem.readAsStringAsync(this.state.filename)
        .then(storedPreferences => {
            this.state.data = JSON.parse(storedPreferences)
            //console.log("On load: "+JSON.stringify(this.state.data))
            
            //Since this is a promise once the file has been loaded we need to re-render the checkboxes
            this.forceUpdate()
        })
        .catch(error => {
            //This will always be triggered the real first time the page is opened
            //As the file will not yet be into the app's file system
            console.log("Initial Setup")
            // console.error(error)
        })
    }

    /**
     * On submit of the form cache updated dietry data to disk
     */
    getSelectedDiet() {
        var Selected = []
        var keys = this.state.data.map((t) => t.key )
        var checks = this.state.data.map((t) => t.checked)
        for (let index = 0; index < checks.length; index++) {
            if(checks[index] == true){
                Selected.push(keys[index])
            }            
        }
        //Keep an handy clear list of the selected options
        this.state.selected = Selected

        //Chace the updated data locally
        FileSystem.writeAsStringAsync(this.state.filename, JSON.stringify(this.state.data))
    }

    /**
     * Keep data in sync when toggling a given checkbox on and off
     * @param {number} id indicates the checkbox which have been clicked
     */
    toggleCheckbox(id){
        const data = this.state.data
        const index = this.state.data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked
        this.setState(data)
        //console.log("On checked: "+JSON.stringify(this.state.data))
    }

    /**
     * Generates a form made of checkboxes
     * @returns a sequence of checkboxes created based on the dietry data currently loaded
     */
    renderDiet() {
        //console.log("On render: "+JSON.stringify(this.state.data))

        return this.state.data.map((item, key) =>{
            return (
                <TouchableOpacity style={{ flexDirection: "row"}}
                key={key} onPress={() => this.toggleCheckbox(item.id)}>
                    <CheckBox value={item.checked} onValueChange={() => {this.toggleCheckbox(item.id)}}/>
                    <Text>{item.key}</Text>
                </TouchableOpacity>
            )
        })
    }

    /**
     * Main method to organize the content of this page
     * @returns the components displyed in this page
     */
    render() {
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
                    <View style={styles.checkboxContainer}>
                        {this.renderDiet()}
                    </View>
                    <Text>
                        I acknowledge I will take the responsibility of asking the waiter for confirmation
                    </Text>
                    <Button onPress={this.getSelectedDiet()} title="Submit" color={primaryColor} />

                    <Text></Text>
                </ScrollView>
            </SafeAreaView>
        )
    }
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