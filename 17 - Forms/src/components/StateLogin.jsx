import { useState } from 'react';

const inputsInitial = { email: '', password: '' }
const didEditInitial = { email: false, password: false }

export default function Login() {
    const [inputs, setInputs] = useState(inputsInitial);
    const [didEdit, setDidEdit] = useState(didEditInitial);
    const emailIsInvalid = didEdit.email && !inputs.email.includes('@');
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
                <div className='control no-margin'>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type='email'
                        name='email'
                        value={inputs.email}
                        onChange={event => handleInputsChange(event.target.value, 'email')}
                        onBlur={() => handleInputsBlur('email')}
                    />
                    <div className='control-error'>
                        { emailIsInvalid && <p>Please enter a valid email address</p> }
                    </div>
                </div>

                <div className='control no-margin'>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        value={inputs.password}
                        onChange={event => handleInputsChange(event.target.value,'password')}
                        onBlur={() => handleInputsBlur('password')}
                    />
                </div>
            </div>

            <p className='form-actions'>
                <button className='button button-flat'>Reset</button>
                <button className='button'>Login</button>
            </p>
        </form>
    );
}
