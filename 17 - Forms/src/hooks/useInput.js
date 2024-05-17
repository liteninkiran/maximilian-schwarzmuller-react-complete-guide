import { useState } from 'react';

export function useInput(defaultValue, validationFn) {
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    const [didEdit, setDidEdit] = useState(false);
    const valueIsValid = validationFn(enteredValue);
    const handleInputBlur = () => setDidEdit(true);
    const handleInputChange = (event) => {
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    return {
        value: enteredValue,
        hasError: didEdit && !valueIsValid,
        handleInputChange,
        handleInputBlur,
    };
}
