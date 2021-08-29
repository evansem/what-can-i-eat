import React, { useState } from "react";
import { StyleSheet, Text, View, Button, CheckBox } from 'react-native';
import { Formik, Field, Form } from 'formik';
import { global_style, primaryColor } from '../style';


//const global_style = require('../style');


function verifyAck(value) {
    let error;
    if (!value) {
      error = 'Required';
    }
    return error;
  }

const Preferences = () => {

    return (
        <View style={styles.container}>
            <Text>
                Select all tags apporiate for your diet
            </Text>
            <Text>
            Your diet requirements can be changed any time, through the menu in preferences.
            When ordering remember to always ask the waiter to add the allergens as a special note in the order",
            </Text>
            <Formik
                initialValues={{
                    vegeterian: false,
                    egg_free: false, 
                    peanut_free: false,
                    gluten_free: false,
                    dairy_free: false,
                    pescatarian: false,
                    vegan: false,
                    acknowledged: false,
                }}
                onSubmit={(values) => {
                    console.log(values)
                }}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValidating }) => (
                    <Form>
                        <View style={styles.checkboxContainer}>
                            <Text>
                                <Field type="checkbox" name="vegeterian" />
                                Vegeterian
                            </Text>
                            <Text>
                                <Field type="checkbox" name="egg_free" />
                                Egg free
                            </Text>
                            <Text>
                                <Field type="checkbox" name="peanut_free" />
                                Peanut free
                            </Text>
                            <Text>
                                <Field type="checkbox" name="gluten_free" />
                                Gluten free
                            </Text>
                            <Text>
                                <Field type="checkbox" name="dairy_free" />
                                Dairy free
                            </Text>
                            <Text>
                                <Field type="checkbox" name="pescatarian" />
                                Pescatarian
                            </Text>
                            <Text>
                                <Field type="checkbox" name="vegan" />
                                Vegan
                            </Text>
                            
                        </View>
                        <Text>
                            <Field type="checkbox" name="acknowledged" validate={verifyAck} />
                            {errors.acknowledged && touched.acknowledged && 
                            <Text style={global_style.error_msg}>{errors.acknowledged} </Text>}

                            I acknowledge I will take the responsibility of asking the waiter for confirmation
                            
                            <Text style={global_style.error_msg}>*</Text> 
                        </Text>
                        <Button 
                            onPress={handleSubmit} title="Submit"
                            color={primaryColor}/>

                        {/* <Pressable onPress={handleSubmit} style={styles.primary_button}>
                        <Text>Submit</Text>
                        </Pressable> */}
                    </Form>
                )}

            </Formik>
        </View>
    );

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

         {/* 
            
    const [inputField , setInputField] = useState(
        {
            vegeterian: false,
            vegan: false,
            egg_free: false, 
            peanuts_free: false,
            gluten_free: false,
            dairy_free: false,
            pescatarian: false
        }
    );
            
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
            />
            <Text style={styles.label}>Do you like React Native?</Text>
           
            <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text> */}