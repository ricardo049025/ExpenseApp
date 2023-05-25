import { createContext, useReducer } from "react";



export const ExpensesContext = createContext({
    expenses: [],
    setExpenses: (expenses) =>{},
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id,{description, amount, date}) => {}
});

const expensesReducer = (state,action) =>{
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'DELETE':
            return state.filter((item) => item.id !== action.payload)
        case 'UPDATE':
            const updatetableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatetableExpenseIndex];
            const updateItem = {...updatableExpense, ...action.payload.data};
            const updateExpenses = [...state];
            updateExpenses[updatetableExpenseIndex] = updateItem;
            return updateExpenses;
        default: 
            return state;
    }
}

const ExpensesContextProvider = ({children}) =>{
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    const addExpense = (expenseData) =>{
        dispatch({type: "ADD", payload: expenseData});
    }

    const setExpenses = (expenses) =>{
        dispatch({type: "SET", payload: expenses})
    }

    const deleteExpense = (id) =>{
        dispatch({type: "DELETE", payload: id})
    }

    const updateExpense = (id,expenseData) =>{
        dispatch({type: "UPDATE", payload: {id: id, data: expenseData}})
    }

    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;