import React, { useState } from "react";
import { View, Button } from "react-native";
import { requires } from "../business/GeneralLogic";
import { primaryColor } from "../constants/style";
import InlineError from "./InlineError";

/**
 * Wrapper for the submit button which introduces
 * validation in term of which field was required
 * if some condition is not satified this component
 * will pop up an error message just above the button
 */
const SubmitFormButton = ({ onPress, dataRequired, title }) => {
    const [error, setError] = useState(null);

    return (
        <View>
            <InlineError message={error} />
            <Button title={title} color={primaryColor}
                onPress={() => {
                    setError(requires(dataRequired));
                    onPress();
                }} />
        </View>
    )
}
export default SubmitFormButton