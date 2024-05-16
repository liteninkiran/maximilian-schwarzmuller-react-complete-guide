import { useState } from 'react';
import Input from './Input.jsx';

const inputsInitial = { email: '', password: '' }
const didEditInitial = { email: false, password: false }

export default function Login() {
    const [inputs, setInputs] = useState(inputsInitial);
    const [didEdit, setDidEdit] = useState(didEditInitial);
    const emailError = didEdit.email && !inputs.email.includes('@') ? 'Please enter a valid email address' : null;
    const pwordError = didEdit.password && !inputs.password.trim().length < 6 ? 'Please enter a longer password' : null;
    const handleInputsChange = (value, key) => {
        setInputs(prev => ({ ...prev, [key]: value }));
        setDidEdit(prev => ({ ...prev, [key]: false }));
    }
    const handleInputsBlur = key => setDidEdit(prev => ({ ...prev, [key]: true }));
    const handleSubmit = event => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className='control-row'>

                {/* Email */}
                <Input
                    id='email'
                    label='Email'
                    type='email'
                    name='email'
                    error={emailError}
                    value={inputs.email}
                    onChange={event => handleInputsChange(event.target.value, 'email')}
                    onBlur={() => handleInputsBlur('email')}
                />

                {/* Password */}
                <Input
                    id='password'
                    label='Password'
                    type='password'
                    name='password'
                    error={pwordError}
                    value={inputs.password}
                    onChange={event => handleInputsChange(event.target.value, 'password')}
                    onBlur={() => handleInputsBlur('password')}
                />

            </div>

            <p className='form-actions'>
                <button className='button button-flat'>Reset</button>
                <button className='button'>Login</button>
            </p>
        </form>
    );
}
