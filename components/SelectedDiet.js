import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { DietContext } from '../business/DietaryManager';
import { global_style } from '../constants/style';
import Item from './Item';

export const NoSelection = ({ selected }) => {
    if (selected.length == 0) {
        return <Item title="No special diet" style={styles.item} />
    }
    return (null)
}

/**
 * Display the user diet based on the tags which have been selected
 */
export const SelectedDiet = ({ compact }) => {
    return (
        <DietContext.Consumer>
            {({ selected }) => (
                <ListTags tags={selected} compact={compact} title="Your dietary tags:"/>
            )}
        </DietContext.Consumer>
    )
}

/**
 * Display a list of dietary tags.
 * The list should simply contain the names
 */
export const ListTags = ({ tags, compact , title}) => {
    if (!title) {
        //Default value
        title = "Dietary tags:"
    }
    var id = 0
    //Compute the style for the items to display
    var itemStyle = compact ? [global_style.item, global_style.compactItem] : global_style.item
    return (
        < View >
            <Text style={global_style.title}>{title}</Text>

            <View style={compact ? styles.rowContainer : styles.colContainer}>

                {/* Iterate through the selected dietary tags to create a list */}
                {tags.map(e => <Item key={id++} title={e} style={itemStyle} />)}
                <NoSelection selected={tags} />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    colContainer: {
        flex: 1,
    },
});