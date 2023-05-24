import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GlobalStyle } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({id,description, date, amount}) => {
    const navigation = useNavigation();

    const expensePressHandler = () =>{
        navigation.navigate('ManageExpense', {
            expenseId: id
        });
    }

    return (<TouchableOpacity onPress={expensePressHandler}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{ getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    expenseItem:{
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyle.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        //Android 
        elevation: 5,
        //IOS
        shadowColor: GlobalStyle.colors.gray500,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    textBase:{
        color:  GlobalStyle.colors.primary50,
    },
    description:{
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer:{
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount:{
        color: GlobalStyle.colors.primary500,
        fontWeight: 'bold'
    }
})

export default ExpenseItem;