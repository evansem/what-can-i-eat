import React, { Component, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Callout, Marker } from 'react-native-maps';
import { global_style, primaryColor } from "../constants/style";
import { getRestaurants } from "../data/FirebaseHandler";


class RestaurantsMap extends Component {
    constructor(props) {
        super(props)
        let latitude = -41.28490626239493
        let longitude = 174.77791627205266

        this.state = {
            stopMarkers: [],
            region: {
                latitude: latitude, //37.78825,
                longitude: longitude, //-122.4324,
                latitudeDelta: 0.030,
                longitudeDelta: 0.0242,
                //latitudeDelta: 0.0922,
                //longitudeDelta: 0.0421,
            }
        }

        generateMarkers().then(e => {
            this.state.stopMarkers = e
            //console.log(e)
            this.forceUpdate()
        })
    }
    //const RestaurantsMap = () => {
    //const [stopMarkers, setStopMarkers] = useState([]);



    // let defaultStopMarkers = [{
    //     key: "1",
    //     latitude: -41.29017925997491,
    //     longitude: 174.76838958609653
    // },
    // {
    //     key: "2",
    //     latitude: -41.29422164713216,
    //     longitude: 174.77195205044046
    // },
    // {

    //     key: "3",
    //     latitude: -41.28631478508393,
    //     longitude: 174.77464131849405
    // }]



    render() {
        return (
            <View style={global_style.container} >
                <MapView
                    style={styles.map}
                    region={this.state.region}
                    showsUserLocation={true}
                >
                    {this.state.stopMarkers}


                    <Marker key={0} coordinate={{
                        latitude: -41.28712096816978,
                        longitude: 174.7786431743745,
                    }}>

                        <View style={styles.userMarker}>
                            <Text style={{ color: '#fff' }}>You</Text>
                        </View>
                    </Marker>

                </MapView>
            </View>
        )
    }

}

/**
* Generate stop markers for all the data given to the object through a prop from local storage.
*/
export async function generateMarkers() {
    // if (!props.stopMarkers || stopMarkers.length !== 0) return;
    let defaultStopMarkers = [{
        key: "1",
        latitude: -41.29017925997491,
        longitude: 174.76838958609653
    },
    {
        key: "2",
        latitude: -41.29422164713216,
        longitude: 174.77195205044046
    },
    {

        key: "3",
        latitude: -41.28631478508393,
        longitude: 174.77464131849405
    }]

    let markers = await getRestaurants()
    markers.map((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id + " => " + JSON.stringify(doc.data()));
    })
    return markers.map((marker) => (

        <Marker
            key={marker.id}
            coordinate={{
                latitude: marker.data.latitude,
                longitude: marker.data.longitude,
            }}
            onPress={() => {
                selectedId = "Stop"
                //selectItem(marker)
                console.log("Marker Cliked")
            }}
        >
            <Callout onPress={() => {
                //Once users click on the name show the menu
                console.log("Callout")
            }}>
                <Text>{marker.data.name}</Text>
            </Callout>
        </Marker>
    ))
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
    userMarker: {
        backgroundColor: primaryColor,
        padding: 5, borderRadius: 5
    }
});

export default RestaurantsMap

