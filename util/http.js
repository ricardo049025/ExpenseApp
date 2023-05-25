import axios from "axios"

const URL = 'https://react-native-course-fdc78-default-rtdb.firebaseiocom';

export const storeExpense = async (expenseData) =>{
    const response = await axios.post(`${URL}/expenses.json`,expenseData);
    const id = response.data.name;
    return id;
}

export const fetchExpenses = async () =>{
    const response = await axios.get(`${URL}/expenses.json`);
    const expenses =[];

    for(const key in response.data){
        const obj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(obj);
    }
    return expenses;
}

export const updateExpense = (id, expenseData) =>{
    return  axios.patch(`${URL}/expenses/${id}.json`, expenseData);
}

export const deleteExpense = (id) =>{
    return axios.delete(`${URL}/expenses/${id}.json`);
}

