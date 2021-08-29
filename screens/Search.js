import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Search = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => alert("Not Available")}
          title="Search"
        />
      </View>
    );
  }

  export default Search