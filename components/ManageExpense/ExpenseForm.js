import { StyleSheet, View, Text, Alert } from "react-native";
import Button from "../UI/Button";
import Input from "./Input";
import { useState } from "react";
import { getFormattedDate } from "../../util/date";
import { isNotBlank, isValidDate, isValidPositiveNumber } from "../../util/validationsInput";
import { GlobalStyle } from "../../constants/styles";

const ExpenseForm = ({submitButtonLabel,cancelHandler,confirmHandler, defaultValues}) =>{
    const [inputs, setInputs] = useState({ 
        amount: { 
                value: defaultValues ? defaultValues.amount.toString() : '',
                isValid: true
            }, 
        date: { 
                value: defaultValues ? getFormattedDate(defaultValues.date) : '',
                isValid: true
            }, 
        description: {
                value: defaultValues ? defaultValues.description : '',
                isValid: true
            }
    });

    const inputChangeHandler = (inputIdentifier,enteredValue) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        });
    }

    const formIsInValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    const submitHandler = () =>{
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        //validations
        const amountIsValid = isValidPositiveNumber(expenseData.amount);
        const dateIsValid = isValidDate(expenseData.date);
        const descriptionIsValid = isNotBlank(expenseData.description);
        
        if( !amountIsValid || !dateIsValid || !descriptionIsValid){
            //Alert.alert('Invalid input', "Please check input values");
            setInputs((curInputs) => {
                return {
                    amount: {value: curInputs.amount.value, isValid: amountIsValid},
                    date: {value: curInputs.date.value, isValid: dateIsValid},
                    description: {value: curInputs.description.value, isValid: descriptionIsValid}
                }
            })
            
            return;
        }


        confirmHandler(expenseData);
    }
  

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsContainer}>
                <Input label="Amount" style={styles.rowInput} invalid={!inputs.amount.isValid} textInputConfig={{keyboardType: "decimal-pad", onChangeText: inputChangeHandler.bind(this,'amount'), value: inputs.amount.value}}/>
                <Input label="Date" style={styles.rowInput} invalid={!inputs.date.isValid} textInputConfig={{placeholder: "YYYY-MM-DD", maxLength: 10, onChangeText: inputChangeHandler.bind(this,"date"), value: inputs.date.value}}/>
            </View>
            <Input label="Description" invalid={!inputs.description.isValid} textInputConfig={{multiline: true, /*autoCapitalize: 'sentence' autoCorrect: false */ onChangeText: inputChangeHandler.bind(this, "description"), value: inputs.description.value}}/>
            {formIsInValid && <Text style={styles.errorText}> Invalid inputs values - please check your entered data !</Text>}
            <View style={styles.buttonContainer}>
                <Button mode="flat" style={styles.button} onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form:{
        marginTop: 80
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput:{
        flex: 1
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText:{
        textAlign: 'center',
        color: GlobalStyle.colors.error500,
        margin: 8
    }
})

export default ExpenseForm;