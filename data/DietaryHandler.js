import * as FileSystem from 'expo-file-system';

/**
 * Load the possible dietry tags.
 * This is the default that that is present in the source code directory.
 * After the app will create a local copy updated based on the user's requirements
 */
export const dietData = require('../assets/diet.json')

export const getDefaultDietTags = () => {
    return dietData
}

/**
 * Store path to the prefences stored in the user local storage.
 * Expo file system creates a separate storage space for each app
 */
export const outputFilename = `${FileSystem.documentDirectory}preferences`

/**
 * Import user dietary requirements from disk
 */
export const loadPreferences = (updateData, updateSelected, forceUpdate) => {
    //Start from default state where all special diet tags are off
    var data = dietData
    //Load preferences from local storage
    FileSystem.readAsStringAsync(outputFilename)
        .then(storedPreferences => {
            data = JSON.parse(storedPreferences)

            //IMPORTANT!
            //Since this is a promise! the function will return before this code is executed
            //Therefore assigning the result to the data variable will do nothing
            //We need to use a call back function to update the context
            updateData(data)
            updateSelected(extractSelection(data))
            //And once the file has been loaded and the data updated we need to re-render the checkboxes
            forceUpdate()
            //console.log("Dietary requirements have been loaded from disk")
        })
        .catch(error => {
            //This will always be triggered the real first time the page is opened
            //As the file will not yet be into the app's file system
            console.log("First setup, no dietary information has been cached yet")
            // console.error(error)
        })
    //This is likely to just return the default data 
    //as promises are usually fillfulled after the function is returned
    return data;
}

/**
 * Returned a simplified list of the selected diet tags
 * Useful for dispaling custom menus quicker
 */
export function extractSelection(data){
    var selected = []
    var keys = data.map((t) => t.key)
    var checks = data.map((t) => t.checked)
    for (let index = 0; index < checks.length; index++) {
        if (checks[index] == true) {
            selected.push(keys[index])
        }
    }
    return selected;
}

/**
 * On submit of the form cache updated dietry data to disk
 */
export function savePreferences(data) {
    console.log("Exporting dietary requirements...")
    
    //Chace the updated data locally
    FileSystem.writeAsStringAsync(outputFilename, JSON.stringify(data))

    //Keep an handy clear list of the selected options
    return extractSelection(data);
}