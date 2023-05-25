import { StyleSheet, Text, View } from "react-native"
import Button from "./Button";
import { GlobalStyle } from "../../constants/styles";

const ErrorOverlay = ({message, onConfirm}) =>{
    return(
        <View style={styles.container}>
            <Text style={[styles.title, styles.text]}>An error has ocurred !.</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyle.colors.primary700
    },
    text:{
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default ErrorOverlay;