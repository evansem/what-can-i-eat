import React from "react";
import { Button, View, Text, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DietContext, exportDiet } from "../../business/DietaryManager";
import { SelectedDiet } from "../../components/SelectedDiet";
import { global_style, primaryColor } from "../../constants/style";

const DietDisclaimer = ({ navigation }) => {
    return (
        <DietContext.Consumer>

            {({ data, updateData, updateSelected }) => (
                <SafeAreaView style={global_style.softContainer}>
                    <ScrollView>
                        <SelectedDiet compact={false} />

                        <Text style={global_style.paragraph}>
                            Your diet requirements can be changed any time, through the menu in preferences.
                        </Text>
                        <Text style={[global_style.important, global_style.paragraph]}>
                            When ordering remember to always ask the waiter to add the allergens as a special note in the order.
                        </Text>
                        <Text style={global_style.paragraph}>
                            By submitting you acknowledge that you will take the responsibility of asking the waiter for confirmation
                        </Text>

                        <Button title="I Acknoledge" color={primaryColor} onPress={() => {
                            exportDiet(data, updateSelected);
                            navigation.pop()
                        }} />

                    </ScrollView>
                </SafeAreaView>
            )}

        </DietContext.Consumer >
    )
}

// export const Disclamer = (message, acknowledgement, action, redirect) => {
//     return (
//         <View>
//             <Text>{message}</Text>
//             <Text>{acknowledgement}</Text>

//             <Button onPress={() => { action; redirect }} title="I Acknoledge" color={primaryColor} />


//         </View>
//     )
// }

export default DietDisclaimer