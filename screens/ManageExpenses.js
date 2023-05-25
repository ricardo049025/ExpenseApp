import { useContext, useLayoutEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native"
import { GlobalStyle } from "../constants/styles";
import IconButton from "../components/UI/IconButton";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpenses = ({route, navigation}) =>{
    const expenseCtx = useContext(ExpensesContext);
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;
    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === expenseId);

    const deleteExpenseHandler = () => {
        expenseCtx.deleteExpense(expenseId)
        navigation.goBack();
    }
    const cancelHandler = () => {
        navigation.goBack();
    }
    const confirmHandler = (expenseData) => {
        if(isEditing){
            expenseCtx.updateExpense(expenseId, expenseData)
        } else{
            expenseCtx.addExpense(expenseData);
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
            <ExpenseForm 
            submitButtonLabel={isEditing ? 'Update' : 'Add'} 
            cancelHandler={cancelHandler} 
            confirmHandler={confirmHandler}
            defaultValues={selectedExpense}
            />
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
    }
})

export default ManageExpenses;