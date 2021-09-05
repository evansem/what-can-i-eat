import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Formik, Form } from 'formik';
import { global_style, primaryColor } from '../style';
import CheckBox from '@react-native-community/checkbox';
import * as FileSystem from 'expo-file-system';
const DietData = require('../assets/diet.json')

//const global_style = require('../style');

function verifyAck(value) {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}

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

        //Load preferences
        FileSystem.readAsStringAsync(this.state.filename)
        .then(storedPreferences => {
            this.state.selected = JSON.parse(storedPreferences)
            console.log("On load"+this.state.selected)
        })
        .catch(error => {
            console.error(error)
        })
    }

    
    getSelectedDiet() {
        var Selected = []
        var keys = this.state.data.map((t) => t.key )
        var checks = this.state.data.map((t) => t.checked)
        for (let index = 0; index < checks.length; index++) {
            if(checks[index] == true){
                Selected.push(keys[index])
            }            
        }

        //this.state.selected = Selected

        

        FileSystem.writeAsStringAsync(this.state.filename, JSON.stringify(Selected))

        // FileSystem.readAsStringAsync(this.state.filename)
        // .then(storedPreferences => console.log(JSON.parse(storedPreferences)))
        
        console.log(Selected)
        console.log(this.state.selected)
    }

    onchecked(id){
        const data = this.state.data
        const index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked
        this.setState(data)
    }

    renderDiet() {
    //const renderDiet = () => {
        return this.state.data.map((item, key) =>{
            return (
                <TouchableOpacity style={{ flexDirection: "row"}}
                key={key} onPress={() => this.onchecked(item.id)}>
                    <CheckBox value={item.checked} onValueChange={() => {this.onchecked(item.id)}}/>
                    <Text>{item.key}</Text>
                </TouchableOpacity>
            )
        })
    }


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

    // const [dietRequirements, setDiet] = useState(
    //     {
    //         vegeterian: false,
    //         egg_free: false,
    //         peanut_free: false,
    //         gluten_free: false,
    //         dairy_free: false,
    //         pescatarian: false,
    //         vegan: false,
    //         acknowledged: false,
    //     }
    // );
    
//     const inputsHandler = (name) =>{
//         setDiet( {...dietRequirements, [name]: !dietRequirements[name]} )
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView>
        
//                 <Text>
//                     Select all tags apporiate for your diet
//                 </Text>
//                 <Text>
//                     Your diet requirements can be changed any time, through the menu in preferences.
//                     When ordering remember to always ask the waiter to add the allergens as a special note in the order",
//                 </Text>
//                 <View style={styles.checkboxContainer}>
//                     <Text>
//                         <CheckBox
//                             boxType="square" value={dietRequirements.vegeterian}
//                             name="vegeterian" onChange={inputsHandler("vegeterian")}
//                             />
//                         Vegeterian
//                     </Text>
//                     <Text>
//                         <CheckBox 
//                             boxType="square" value={dietRequirements.egg_free}
//                             name="egg_free" onChange={inputsHandler}/>
//                         Egg free
//                     </Text>
//                     {/* <Text>
//                         <CheckBox type="checkbox" name="peanut_free" />
//                         Peanut free
//                     </Text>
//                     <Text>
//                         <CheckBox type="checkbox" name="gluten_free" />
//                         Gluten free
//                     </Text>
//                     <Text>
//                         <CheckBox type="checkbox" name="dairy_free" />
//                         Dairy free
//                     </Text>
//                     <Text>
//                         <CheckBox type="checkbox" name="pescatarian" />
//                         Pescatarian
//                     </Text>
//                     <Text>
//                         <CheckBox type="checkbox" name="vegan" />
//                         Vegan
//                     </Text> */}

//                 </View>
//                 {/* <Text>
//                     <CheckBox type="checkbox" name="acknowledged" validate={verifyAck} />
//                     {errors.acknowledged && touched.acknowledged &&
//                         <Text style={global_style.error_msg}>{errors.acknowledged} </Text>}

//                     I acknowledge I will take the responsibility of asking the waiter for confirmation

//                     <Text style={global_style.error_msg}>*</Text>
//                 </Text>
//                 <Button
//                     onPress={handleSubmit} title="Submit"
//                     color={primaryColor} /> */}

//                 {/* <Pressable onPress={handleSubmit} style={styles.primary_button}>
//                             <Text>Submit</Text>
//                             </Pressable> */}
//             </ScrollView>
//         </SafeAreaView>
//     );

// }



// export default Preferences

// {/* 

//             <Formik
//                 initialValues={{
//                     vegeterian: false,
//                     egg_free: false, 
//                     peanut_free: false,
//                     gluten_free: false,
//                     dairy_free: false,
//                     pescatarian: false,
//                     vegan: false,
//                     acknowledged: false,
//                 }}
//                 onSubmit={(values) => {
//                     console.log(values)
//                 }}
//                 >
//                 {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating }) => (
                    
            
//     const [inputField , setInputField] = useState(
//         {
//             vegeterian: false,
//             vegan: false,
//             egg_free: false, 
//             peanuts_free: false,
//             gluten_free: false,
//             dairy_free: false,
//             pescatarian: false
//         }
//     );
            
//             <CheckBox
//                 value={isSelected}
//                 onValueChange={setSelection}
//                 style={styles.checkbox}
//             />
//             <Text style={styles.label}>Do you like React Native?</Text>
           
//             <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text> */}