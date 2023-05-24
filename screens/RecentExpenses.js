import { Text, View } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDay } from "../util/date";

const RecentExpenses = () =>{
    const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDay(today,7);
        return (expense.date > date7DaysAgo) && (expense.date <= today);
    })
    return <ExpensesOutput expenses={recentExpenses} expensePeriod="Last 7 Days" fallbackText="No expenses registered for the last 7 days."/>
    
}

export default RecentExpenses;