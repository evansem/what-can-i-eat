import React, { Component } from 'react';
import { View, Button, ScrollView, SafeAreaView } from 'react-native';
import { getAddressCoordinates, getMenu } from '../data/FirebaseHandler';
import { global_style, primaryColor } from '../constants/style';
import { ShowIfLoggedIn } from '../business/LoginManager';
import Item from '../components/Item';
import { ListTags } from '../components/SelectedDiet';

const Menu = ({ route, navigation }) => {
    //from route to get the custom data passed though navigation use route.params

    if (!route.params || Object.keys(route.params).length === 0) {
        //A restaurant has not bee selected
        return (
            <SafeAreaView style={global_style.container}>
                <Item title='Select a menu from the search page' style={global_style.item} />
                <View>
                    <Button title='Search Restaurants' color={primaryColor}
                    onPress={() => navigation.navigate('Search')} />
                </View>

            </SafeAreaView>)
    } else {
        //
        return (
            <SafeAreaView style={global_style.container}>
                <MenuTable route={route} />

            </SafeAreaView>
        )
    }
}

/**
 * Displays a formatted list of meal
 */
class MenuTable extends Component {
    constructor(props) {
        super(props)

        if (this.props.route.params) {
            this.state = {
                id: this.props.route.params.restaurant.id,
                menu: [],
            }

            //Loading meals for this restaurant
            getMenu(this.state.id).then(e => {
                this.state.menu = e
                //Menu needs to be mapped first then call .data() on meals

                this.forceUpdate()
            }).catch(error =>
                console.log(error))
        }
    }

    render() {
        const data = this.props.route.params.restaurant.data()
        return (
            <ScrollView>
                <Item title={data.name} style={[global_style.item, global_style.whiteItem]} />

                {/* After arrow, round brakets need to be use so that it is interpret as a component */}
                {this.state.menu.map((meal) => (
                    <View key={meal.id}>
                        <Item
                            title={meal.data().name} style={global_style.item} />
                        <ListTags tags={meal.data().dietTags} compact={true} />
                    </View>

                ))}
            </ScrollView>
        )
    }
}

export default Menu