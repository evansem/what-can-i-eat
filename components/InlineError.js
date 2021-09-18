import React from 'react';
import { Text } from 'react-native';

function InlineError({message}){
    if(message) {
        return <Text style={{ color: "red" }}>{message}</Text>
    }
    return null;
}

export default InlineError