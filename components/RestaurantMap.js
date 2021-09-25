import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Callout, Marker } from 'react-native-maps';
import { global_style, primaryColor } from "../constants/style";
import { getRestaurants } from "../data/FirebaseHandler";

class RestaurantsMap extends Component {
    constructor(props) {
        super(props)
        //Default center of the map being displayed
        let latitude = -41.28490626239493
        let longitude = 174.77791627205266

        this.state = {
            stopMarkers: [],
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.030,
                longitudeDelta: 0.0242,
            }
        }

        //Loading restaurant coordiantes and data
        getRestaurants().then(e => {         
            this.state.stopMarkers = e
            this.forceUpdate()
        })
    }

    render() {
        return (
            <View style={global_style.container} >
                <MapView style={styles.map}
                    region={this.state.region}
                    showsUserLocation={true}>
                    
                    {this.state.stopMarkers.map((marker) => (
                        //Generate stop markers for all the data loaded from database
                        <Marker
                            key={marker.id}
                            coordinate={{
                                latitude: parseFloat(marker.data().latitude),
                                longitude: parseFloat(marker.data().longitude),
                            }}
                            onPress={() => {
                                selectedId = "Stop"
                                //selectItem(marker)
                                console.log("Marker Cliked")
                            }}>
                            <Callout onPress={() => {
                                //Once users click on the name label show the menu
                                console.log("Callout")
                                //{this.props.navigation}
                            }}>
                                {/* Label shown when the marker is clicked */}
                                <Text>{marker.data().name}</Text>
                            </Callout>
                        </Marker>
                    ))}

                    {/* Marker for user's location */}
                    < Marker key={0} coordinate={{
                        latitude: -41.28712096816978,
                        longitude: 174.7786431743745,
                    }}>
                        {/* Custom marker icon to differentiate from restaurats */}
                        <View style={styles.userMarker}>
                            <Text style={{ color: '#fff' }}>You</Text>
                        </View>
                    </Marker>
                </MapView>
            </View >
        )
    }

}

//Specific style only for this page
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
    userMarker: {
        backgroundColor: primaryColor,
        padding: 5, borderRadius: 5
    }
});

export default RestaurantsMap

