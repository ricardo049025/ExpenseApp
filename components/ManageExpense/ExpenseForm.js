import { StyleSheet, View, Text } from "react-native";
import Button from "../UI/Button";
import Input from "./Input";
import { useState } from "react";

const ExpenseForm = ({submitButtonLabel,cancelHandler,confirmHandler}) =>{
    const [inputValues, setInputValues] = useState({ amount: '', date: '', description: ''});

    const inputChangeHandler = (inputIdentifier,enteredValue) => {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue
            }
        });
    }
  

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsContainer}>
                <Input label="Amount" style={styles.rowInput} textInputConfig={{keyboardType: "decimal-pad", onChangeText: inputChangeHandler.bind(this,'amount'), value: inputValues.amount}}/>
                <Input label="Date" style={styles.rowInput} textInputConfig={{placeholder: "YYYY-MM-DD", maxLength: 10, onChangeText: inputChangeHandler.bind(this,"date"), value: inputValues.date}}/>
            </View>
            <Input label="Description" textInputConfig={{multiline: true, /*autoCapitalize: 'sentence' autoCorrect: false */ onChangeText: inputChangeHandler.bind(this, "description"), value: inputValues.description}}/>
            <View style={styles.buttonContainer}>
                <Button mode="flat" style={styles.button} onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>{submitButtonLabel}</Button>
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
    }
})

export default ExpenseForm;