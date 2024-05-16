import { useState } from 'react';
import { useRef } from 'react';

export default function Login() {
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const email = useRef();
    const password = useRef();
    const handleSubmit = event => {
        event.preventDefault();
        console.log(email.current.value, password.current.value);
        const emailIsValid = email.current.value.includes('@');
        if (!emailIsValid) {
            setEmailIsInvalid(true);
            return;
        }
        setEmailIsInvalid(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className='control-row'>
                <div className='control no-margin'>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type='text'
                        name='email'
                        ref={email}
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
                        ref={password}
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
