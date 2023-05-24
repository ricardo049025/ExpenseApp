import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({icon, size, color, onPress}) =>{
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    }
})

export default IconButton;