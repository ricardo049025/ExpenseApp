import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDay } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () =>{
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);
    
    useEffect(() =>{
        const getExpenses = async ()=>{
            setIsLoading(true);
            try {
                const expenses = await fetchExpenses();    
                expensesCtx.setExpenses(expenses);
            } catch (error) {setError("could not fetch expenses !")}

            setIsLoading(false);
        }
        getExpenses();
    },[])

    const errorHandler = () =>{setError(null)}

    if(error && !isLoading) return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    if(isLoading) return <LoadingOverlay />
    
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDay(today,7);
        return (expense.date > date7DaysAgo) && (expense.date <= today);
    })
    return <ExpensesOutput expenses={recentExpenses} expensePeriod="Last 7 Days" fallbackText="No expenses registered for the last 7 days."/>
    
}

export default RecentExpenses;