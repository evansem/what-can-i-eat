import { StyleSheet } from 'react-native';

const primaryColor = '#008037'
const secondaryColor = '#DBB700' //FF914D'

const global_style =  StyleSheet.create({
    primary_button: {
        backgroundColor: primaryColor,
        padding: 100,
        height: 100,
    },
    error_msg: {
        color: 'red',
    },
    inputBox: {
        fontSize: 20,
        borderColor: "#707070",
        borderBottomWidth: 1,
        paddingBottom: 1.5,
        marginTop: 25.5
      },
      separator: {
        marginVertical: 22,
        borderBottomColor: '#707070',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      textForm: {
        width: "80%",
        margin: "10%"
      },
});

export {global_style, primaryColor, secondaryColor}