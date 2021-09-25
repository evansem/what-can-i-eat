import React from 'react';
import { StyleSheet, Text, Dimensions, SafeAreaView, Button, View } from 'react-native';
import { SelectedDiet } from '../components/SelectedDiet';
import { ScrollView } from 'react-native-gesture-handler';
import RestaurantsMap from '../components/RestaurantMap';
import Item from '../components/Item';
import { global_style, primaryColor } from '../constants/style';

const Search = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Item title="Search Bar (Coming Soon)" style={[global_style.item, styles.search]} />

          <Button
            onPress={() => alert("Not Available")}
            title="Search"
            color={primaryColor}
          />
        </View>



        <View style={global_style.separator} />

        <SelectedDiet compact={true} />

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
  search: {
    borderWidth: 0.5,
    backgroundColor: '#FFF'
  }
});

export default Search