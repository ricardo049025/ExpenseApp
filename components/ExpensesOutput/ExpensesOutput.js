import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyle } from "../../constants/styles";

const ExpensesOutput = ({expenses, expensePeriod,fallbackText}) =>{
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if(expenses.length > 0)
        content = <ExpensesList expenses={expenses}/>

    return(
        <View style={styles.rootContainer}>
            <ExpensesSummary expenses={expenses} periodName={expensePeriod}/>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 0,
        paddingTop: 24,
        backgroundColor: GlobalStyle.colors.primary700
    },
    infoText:{
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})

export default ExpensesOutput;