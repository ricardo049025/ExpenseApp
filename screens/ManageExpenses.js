import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native"
import { GlobalStyle } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpenses = ({route, navigation}) =>{
    const expenseCtx = useContext(ExpensesContext);
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    const deleteExpenseHandler = () => {
        expenseCtx.deleteExpense(expenseId)
        navigation.goBack();
    }
    const cancelHandler = () => {
        navigation.goBack();
    }
    const confirmHandler = () => {
        if(isEditing){
            expenseCtx.updateExpense(expenseId, {description: "Test 1", amount: 10.55, date: new Date()})
        } else{
            expenseCtx.addExpense({description: "Test 1", amount: 10.55, date: new Date()});
        }
        navigation.goBack();
    }

    useLayoutEffect(() =>{
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        });
    },[navigation, isEditing])
    
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button mode="flat" style={styles.button} onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>{isEditing ? "Update" : "Add"}</Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" color={GlobalStyle.colors.error50} size={36} onPress={deleteExpenseHandler}/>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyle.colors.primary800
    },
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyle.colors.primary200,
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    }
})

export default ManageExpenses;