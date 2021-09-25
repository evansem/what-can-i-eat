import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, SafeAreaView } from 'react-native';
import { SelectedDiet } from '../components/SelectedDiet';
import { ScrollView } from 'react-native-gesture-handler';
import RestaurantsMap from '../components/RestaurantMap';

const Search = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <Text>Search Bar</Text> */}
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            onPress={() => alert("Not Available")}
            title="Search"
          />

        </View> */}


        <SelectedDiet compact={true} />

        <Text>Search</Text>
        </ScrollView>
        <RestaurantsMap navigation={navigation} />
    </SafeAreaView>
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
    height: 0.7 * Dimensions.get('window').height,
  },
});

export default Search