export const getFormattedDate = (date) =>{
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
}

export const getDateMinusDay = (date,days) =>{
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}