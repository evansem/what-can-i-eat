import React, { useState } from "react";
import { View } from "react-native";
import { requires } from "../business/GeneralLogic";


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