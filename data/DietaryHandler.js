import * as FileSystem from 'expo-file-system';

/**
 * Load the possible dietry tags.
 * This is the default that that is present in the source code directory.
 * After the app will create a local copy updated based on the user's requirements
 */ 
export const dietData = require('../assets/diet.json')


// export const dietState = {
//     //The checkbox data is stored in the diet json file
//     data: dietData,
//     //This field will store the selected options
//     selected: [],
//     filename: `${FileSystem.documentDirectory}preferences`
// }

export const outputFilename = `${FileSystem.documentDirectory}preferences`

export const loadPreferences = () => {
    //Start from default state where all special diet tags are off
    var data = dietData
    //Load preferences from local storage
    FileSystem.readAsStringAsync(outputFilename)
        .then(storedPreferences => {
            data = JSON.parse(storedPreferences)
            //console.log("On load: "+JSON.stringify(this.state.data))

            //Since this is a promise once the file has been loaded we need to re-render the checkboxes
            //this.forceUpdate()
        })
        .catch(error => {
            //This will always be triggered the real first time the page is opened
            //As the file will not yet be into the app's file system
            console.log("Initial Setup")
            // console.error(error)
        })

    return data;
}


/**
 * On submit of the form cache updated dietry data to disk
 */
export function savePreferences(data) {
    console.log("Exporting dietary requirements...")
    console.log(data)
    var selected = []
    var keys = data.map((t) => t.key)
    var checks = data.map((t) => t.checked)
    for (let index = 0; index < checks.length; index++) {
        if (checks[index] == true) {
            selected.push(keys[index])
        }
    }
    //Keep an handy clear list of the selected options
    //this.state.selected = Selected

    //Chace the updated data locally
    FileSystem.writeAsStringAsync(outputFilename, JSON.stringify(selected))

    return selected
}