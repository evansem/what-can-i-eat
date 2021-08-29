import { StyleSheet } from 'react-native';

const primaryColor = '#008037'
const secondaryColor = '#FF914D'

const global_style =  StyleSheet.create({
    primary_button: {
        backgroundColor: primaryColor,
        padding: 100,
        height: 100,
    },
    error_msg: {
        color: 'red',
    }
});

export {global_style, primaryColor, secondaryColor}