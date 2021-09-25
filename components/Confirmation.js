import React from 'react';
import { Button, View } from 'react-native';
import { global_style, primaryColor } from '../constants/style';
import Item from '../components/Item';

/**
 * Screen used to inform the user about the success of some operation
 */
const ConfirmationPage = ({ message, buttonText, buttonAction }) => {
    return (

        <View style={global_style.container}>
            <Item title={message} style={global_style.item} />

            <Button title={buttonText} color={primaryColor}
                style={global_style.primaryButton} onPress={buttonAction} />
        </View>
    )
}

/**
 * Extends the confirmation page to make it more accessible throught the restarant portal.
 * This is important so that you can navigate to it after some actions have succeeded without
 * having to use wrappers for conditional display.
 */
 export const SuccessPage = ({ navigation }) => {
    return (
        <ConfirmationPage message="Operation succeeded"
            buttonText='Go to back'
            buttonAction={() => navigation.popToTop()} />
    )
}


export default ConfirmationPage