import * as FileSystem from 'expo-file-system';

export const loadPreferences = () => {
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
export const savePreferences = () => {
    var Selected = []
    var keys = this.state.data.map((t) => t.key)
    var checks = this.state.data.map((t) => t.checked)
    for (let index = 0; index < checks.length; index++) {
        if (checks[index] == true) {
            Selected.push(keys[index])
        }
    }
    //Keep an handy clear list of the selected options
    this.state.selected = Selected

    //Chace the updated data locally
    FileSystem.writeAsStringAsync(this.state.filename, JSON.stringify(this.state.data))
}