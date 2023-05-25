import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyle } from "../../constants/styles";

const Input = ({label, style, invalid ,textInputConfig}) =>{
    
    const inputStyles = [styles.input];
    if (textInputConfig && textInputConfig.multiline) inputStyles.push(styles.inputMultiLine);
    if(invalid) inputStyles.push(styles.invalidInput)
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig}/>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label:{
        fontSize: 12,
        color: GlobalStyle.colors.primary100,
        marginBottom: 4
    },
    input:{
        backgroundColor: GlobalStyle.colors.primary100,
        color: GlobalStyle.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiLine:{
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel:{
        color: GlobalStyle.colors.error500
    },  
    invalidInput:{
        backgroundColor: GlobalStyle.colors.error50
    }
});

export default Input;