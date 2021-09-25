import React, { createContext, Component } from "react";
import { Text, TouchableOpacity } from 'react-native';
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
const toggleCheckbox = (id, data, update) => {
    //Logic to select or desect a checkox
    const index = data.findIndex(x => x.id === id);
    data[index].checked = !data[index].checked

    //Use the call back function to update the state
    update(data);
}

//export const DietProvider = (props) => {
class DietProvider extends Component {
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
                {this.props.children}
            </DietContext.Provider>
        );
    }
}

/**
 * Generates a form made of checkboxes
 * Designed in the old-fashion class styled to better handle the state of multiple checkboxes
 * @returns a sequence of checkboxes created based on the dietry data currently loaded
 */
export class DietryOptions extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (this.props.dietData.map((item, key) =>
            <TouchableOpacity style={{ flexDirection: "row" }}
                key={key}
                onPress={() => {
                    toggleCheckbox(item.id, this.props.dietData, this.props.updateData)
                    //Ensure tha the changes will be displayed
                    this.forceUpdate()
                }}
            >
                <CheckBox value={item.checked}
                    onValueChange={() => {
                        toggleCheckbox(item.id, this.props.dietData, this.props.updateData)
                        //this.forceUpdate()
                    }
                    }
                />
                <Text>{item.key}</Text>
            </TouchableOpacity>
        ))
    }
}

export default DietProvider