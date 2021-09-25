import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { primaryColor } from '../constants/style';

/**
 * Main buttons in the home page
 */
const LargeButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity
            style={styles.largeButton}
            onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    largeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        borderRadius: 4,
        backgroundColor: primaryColor,
        width: 300,
        margin: 20,
    },
    text: {
        fontSize: 18,
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default LargeButton