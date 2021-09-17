import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
//import {Card, Icon} from "react-native-elements";

const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  //return <Text style={styles.errorText}>⚠️ {error}</Text>;
  return (
    <View>
        {error &&
        <Card containerStyle={{backgroundColor: "red"}}>
            <Card.Title style={{color: "white"}}>
                {error}
            </Card.Title>
            <Icon
                name={"close"}
                type={"material-community"}
                color={"white"}
                //onPress={() => void}
            />
        </Card>}
    </View>
);
};

const styles = StyleSheet.create({
  errorText: {
    color: '#fdca40',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  }
});

export default ErrorMessage;