import React from 'react';
import { View, Text } from 'react-native';
import { global_style } from '../constants/style';

/**
 * Symple box frequently used across the app
 */
export default Item = ({ title, style }) => {
    if (!style) {
        //Default style
        style = global_style.item
    }
    return (
        <View style={style}>
            <Text style={{ opacity: 1 }}>{title}</Text>
        </View>
    )
}