import React from 'react';
import { SafeAreaView, Button, View } from 'react-native';
import { global_style, primaryColor } from '../constants/style';
import Item from '../components/Item';

const ConfirmationPage = ({ message, buttonText, buttonAction }) => {
    return (

        <View style={global_style.container}>
            <Item title={message} style={global_style.item} />

            <Button title={buttonText} color={primaryColor}
                style={global_style.primaryButton} onPress={buttonAction} />
        </View>
    )
}


export default ConfirmationPage