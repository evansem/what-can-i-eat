import React from 'react';
import { Text } from 'react-native';

/**
 * Currently very simple, it just creates red text, 
 * however this is stored extermally so that it can
 * be changed easily in the future.
 */
function InlineError({message}){
    if(message) {
        return <Text style={{ color: "red" }}>{message}</Text>
    }
    return null;
}

export default InlineError