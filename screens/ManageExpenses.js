import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native"
import { GlobalStyle } from "../constants/styles";
import IconButton from "../components/UI/IconButton";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenses = ({route, navigation}) =>{
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const expenseCtx = useContext(ExpensesContext);
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;
    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === expenseId);

    const deleteExpenseHandler = async() => {
        setIsSubmitting(true);
        try {
            await deleteExpense(expenseId);    
            expenseCtx.deleteExpense(expenseId);
            navigation.goBack();
        } catch (error) {
            setError("Could not delete expenses - please try again later");
            setIsSubmitting(false);
        }

    }
    const cancelHandler = () => {
        navigation.goBack();
    }
    const confirmHandler =  async (expenseData) => {
        setIsSubmitting(true);
        try {
            if(isEditing){
                await updateExpense(expenseId, expenseData);
                expenseCtx.updateExpense(expenseId, expenseData);
                
            } else{
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({... expenseData, id: id});
            }
            navigation.goBack();
        } catch (error) {
            setError("Could not save data - please try again later !");
            setIsSubmitting(false);
        }
        
        
    }

    useLayoutEffect(() =>{
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        });
    },[navigation, isEditing])

    const errorHandler = () => setError(null);

    if(error && !isSubmitting) return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    if(isSubmitting) return <LoadingOverlay />
    
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