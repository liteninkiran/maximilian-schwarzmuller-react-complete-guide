import { useState } from 'react';
import { styled } from 'styled-components';
import { Button, TextButton } from './Button';
import { InputWithLabel as Input } from './Input';

export default function AuthInputs() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function handleInputChange(identifier, value) {
        if (identifier === 'email') {
            setEnteredEmail(value);
        } else {
            setEnteredPassword(value);
        }
    }

    function handleLogin() {
        setSubmitted(true);
    }

    const emailNotValid = submitted && !enteredEmail.includes('@');
    const passwordNotValid = submitted && enteredPassword.trim().length < 6;

    return (
        <div id='auth-inputs'>
            <ControlDiv>
                <Input
                    label='Email'
                    $invalid={emailNotValid}
                    onChange={(event) => handleInputChange('email', event.target.value)}
                />
                <Input
                    label='Password'
                    $invalid={passwordNotValid}
                    onChange={(event) => handleInputChange('password', event.target.value)}
                    type='password'
                />
            </ControlDiv>
            <div className='actions'>
                <TextButton type='button'>Create a new account</TextButton>
                <Button onClick={handleLogin}>Sign In</Button>
            </div>
        </div>
    );
}

const ControlDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
`;
