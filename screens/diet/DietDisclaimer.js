import React from "react";
import { Button, Text, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DietContext, exportDiet } from "../../business/DietaryManager";
import { ListTags } from "../../components/SelectedDiet";
import { global_style, primaryColor } from "../../constants/style";
import { extractSelection } from "../../data/DietaryHandler";

/**
 * Dietary acknowledgement page, after users select their diet, 
 * it informs them that for their physical safety, 
 * they should still inform waiters of their allergies. 
 * Important for avoiding that a possible mistake in the app 
 * development or use ends up having severe consequences.
 */
const DietDisclaimer = ({ route, navigation }) => {
    return (
        <DietContext.Consumer>
            {/* Context need to be used to retrain the hook to update its internal data 
                Yet we do not actually use the data because the new selection is passed
                though the route from the prefences page*/}
            {({ updateSelected }) => (
                <SafeAreaView style={global_style.softContainer}>
                    <ScrollView>
                        {/* Show tag selected previously, hence different from SelectedDiet
                            Because the data from the context has not been updated yet  */}
                        <ListTags tags={extractSelection(route.params.selected)} compact={false} />


                        {/* DISCLAIMER TEXT */}
                        <Text style={global_style.paragraph}>
                            Your diet requirements can be changed any time, through the menu in preferences.
                        </Text>
                        <Text style={[global_style.important, global_style.paragraph]}>
                            When ordering remember to always ask the waiter to add the allergens as a special note in the order.
                        </Text>
                        <Text style={global_style.paragraph}>
                            By submitting you acknowledge that you will take the responsibility of asking the waiter for confirmation
                        </Text>

                        {/* On acknoledgement update the dietray description */}
                        <Button title="I Acknoledge" color={primaryColor} onPress={() => {
                            exportDiet(route.params.selected, updateSelected);
                            navigation.navigate("SelectDiet")
                        }} />
                    </ScrollView>
                </SafeAreaView>
            )}
        </DietContext.Consumer >
    )
}

export default DietDisclaimer