import { useState } from "react";

const initalState = {
    email: '',
    password: '',
}

export default function Login() {
    const [inputs, setInputs] = useState(initalState);
    const handleInputsChange = (value, key) => setInputs(prev => ({ ...prev, [key]: value }))
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
                        onChange={(event) => handleInputsChange(event.target.value, 'email')}
                    />
                </div>

                <div className='control no-margin'>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        name='password'
                        value={inputs.password}
                        onChange={(event) => handleInputsChange(event.target.value,'password')}
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
