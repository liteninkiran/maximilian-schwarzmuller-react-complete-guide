import { useState } from "react";

export default function UserInput() {
    const initialState = {
        intialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
    }
    const [userInput, setUserInput] = useState(initialState);
    const handleInputChange = (inputId, newVal) => setUserInput(prev => ({ ...prev, [inputId]: newVal }));
    return (
        <section id='user-input'>

            <div className='input-group'>
                <p>
                    <label>Initial Investment</label>
                    <input
                        type='number'
                        required
                        onChange={event => handleInputChange('intialInvestment', event.target.value)}
                        value={userInput.intialInvestment}
                    />
                </p>
                <p>
                    <label>Annual Investment</label>
                    <input
                        type='number'
                        required
                        onChange={event => handleInputChange('annualInvestment', event.target.value)}
                        value={userInput.annualInvestment}
                    />
                </p>
            </div>

            <div className='input-group'>
                <p>
                    <label>Expected Return</label>
                    <input
                        type='number'
                        required
                        onChange={event => handleInputChange('expectedReturn', event.target.value)}
                        value={userInput.expectedReturn}
                    />
                </p>
                <p>
                    <label>Duration</label>
                    <input
                        type='number'
                        required
                        onChange={event => handleInputChange('duration', event.target.value)}
                        value={userInput.duration}
                    />
                </p>
            </div>

        </section>
    );
}
