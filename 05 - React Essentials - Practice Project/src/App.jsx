// React
import { useState } from 'react';

// Components
import Header from './components/Header';
import Results from './components/Results';
import UserInput from './components/UserInput';

function App() {
    const initialState = {
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
    }
    const [userInput, setUserInput] = useState(initialState);
    const handleInputChange = (inputId, newVal) => setUserInput(prev => ({ ...prev, [inputId]: +newVal }));
    const inputIsValid = userInput.duration >= 1;

    return (
        <>
            <Header />
            <UserInput onChange={handleInputChange} userInput={userInput} />
            {
                inputIsValid ? (
                    <Results userInput={userInput} />
                ) : (
                    <p className='center'>Please enter valid input data</p>
                )
            }
        </>
    );
}

export default App;
