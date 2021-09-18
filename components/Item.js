import React from 'react';
import { View, Text } from 'react-native';

export default Item = ({ title, style }) => (
    <View style={style}>
        <Text style={{opacity: 1}}>{title}</Text>
    </View>
);