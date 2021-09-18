import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { DietContext } from '../business/DietaryManager';
import { primaryColor } from '../constants/style';
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
    var itemStyle = compact ? [styles.item, styles.compactItem] : styles.item
    return (
        <DietContext.Consumer>

            {({ selected }) => (
                <View>
                    <Text style={styles.title}>Selected dietary tags:</Text>

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
    item: {
        backgroundColor: primaryColor,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        //primary colour in dec with opacity
        backgroundColor: 'rgba(00,128,55, 0.3)',
        borderRadius: 5,
        alignItems: "center",
        minWidth: 100
    },
    compactItem: {
        padding: 10
    },
    title: {
        fontSize: 20,
    },
});