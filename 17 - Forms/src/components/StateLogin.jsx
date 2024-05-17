import { useState } from 'react';
import Input from './Input.jsx';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js';

const inputsInitial = { email: '', password: '' }
const didEditInitial = { email: false, password: false }

export default function Login() {
    const [inputs, setInputs] = useState(inputsInitial);
    const [didEdit, setDidEdit] = useState(didEditInitial);
    const errors = {
        email: {
            invalid: didEdit.email && (!isEmail(inputs.email) || !isNotEmpty(inputs.email)),
            message: 'Please enter a valid email address',
        },
        password: {
            invalid: didEdit.password && !hasMinLength(inputs.password, 6),
            message: 'Please enter a longer password',
        },
    }
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
                    error={errors.email.invalid && errors.email.message}
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
                    error={errors.password.invalid && errors.password.message}
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
