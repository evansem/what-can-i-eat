import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { DietContext } from '../business/DietaryManager';
import { global_style, primaryColor } from '../constants/style';
import Item from './Item';

export const NoSelection = ({ selected }) => {
    if (selected.length == 0) {
        return <Item title="No special diet" style={styles.item} />
    }
    return (null)
    //<></>
}

export const SelectedDiet = ({ compact }) => {
    var id = 0
    //Compute the style for the items to display
    var itemStyle = compact ? [global_style.item, global_style.compactItem] : global_style.item
    return (
        <DietContext.Consumer>

            {({ selected }) => (
                <View>
                    <Text style={global_style.title}>Selected dietary tags:</Text>

                    <View style={compact ? styles.rowContainer : styles.colContainer}>

                        {/* Iterate through the selected dietary tags to create a list */}
                        {selected.map(e => <Item key={id++} title={e} style={itemStyle} />)}
                        <NoSelection selected={selected} />
                    </View>
                </View>
            )}
        </DietContext.Consumer>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    colContainer: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
    },
});