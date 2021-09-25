import React, { Component } from 'react';
import { View, Button, ScrollView, SafeAreaView } from 'react-native';
import { getAddressCoordinates, getMenu } from '../../data/FirebaseHandler';
import { global_style } from '../../constants/style';
import { ShowIfLoggedIn } from '../../business/LoginManager';
import Item from '../../components/Item';
import { ListTags } from '../../components/SelectedDiet';

const Menu = ({ route, navigation }) => {
    if (!route.params || Object.keys(route.params).length === 0) {
        return (
            <SafeAreaView>
                <Item title='Select a menu from the search page' style={global_style.item} />

                <Button title="Test" onPress={()=>getAddressCoordinates("180 The Terrace Wellington").finally()}/>
            </SafeAreaView>)
    } else {
        //route.params
        return (
            <ShowIfLoggedIn pageSupplier={
                (user) => {
                    return (
                        <SafeAreaView style={global_style.container}>
                            {/* <Item title={user.displayName} style={global_style.item} /> */}
                            <MenuTable route={route} />
                        </SafeAreaView>

                    )
                }

            } orElse={
                <SafeAreaView style={global_style.container}>
                    <MenuTable route={route} />

                </SafeAreaView>
            } />
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
                <Item title={data.name} style={global_style.item} />

                {/* After arrow, round brakets need to be use so that it is interpret as a component */}
                {this.state.menu.map((meal) => (
                    <View>
                        <Item key={meal.id}
                        title={meal.data().name} style={global_style.item} />
                        <ListTags tags={meal.data().dietTags} compact={true} />
                    </View>
                    
                ))}
            </ScrollView>
        )
    }
}

export default Menu