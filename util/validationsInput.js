export const isValidPositiveNumber = (number) =>{
    return (!isNaN(number) && number > 0);
}

export const isValidDate = (date) =>{
    return (date.toString() !== 'Invalid Date');
}

export const isNotBlank = (word) =>{
    return (word.trim().length > 0);
}