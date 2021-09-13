//import * as React from 'react';
import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import * as Location from 'expo-location';

const Search = ({ navigation }) => {
  
  // navigator.geolocation.getCurrentPosition((position) => {
  //   var lat = parseFloat(position.coords.latitude)
  //   var long = parseFloat(position.coords.longitude)
  // }

  //let { coords } = await Location.getCurrentPositionAsync({});

  //const { latitude, longitude } = coords
  let latitude = -41.28490626239493
  let longitude = 174.77791627205266

  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude, //37.78825,
          longitude: longitude, //-122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
      </MapView>
      {/* <Text>Search Bar</Text> */}
    </View>
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Button
    //     onPress={() => alert("Not Available")}
    //     title="Search"
    //   />
      
    // </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 0.8*Dimensions.get('window').height,
  },
});

export default Search