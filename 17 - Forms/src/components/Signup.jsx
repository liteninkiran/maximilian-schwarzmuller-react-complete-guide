import { useState } from 'react';

export default function Signup() {
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const handleSubmit = event => {
        event.preventDefault();

        const fd = new FormData(event.target);
        const acquisition = fd.getAll('acquisition');
        const data = Object.fromEntries(fd.entries());
        data.acquisition = acquisition;

        if (data.password !== data['confirm-password'] ) {
            setPasswordsMatch(false);
            return;
        }

        console.log('Form Submitted', data);
        event.target.reset();
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            {/* Email */}
            <div className='control'>
                <label htmlFor='email'>Email</label>
                <input id='email' type='email' name='email' />
            </div>

            {/* Password */}
            <div className='control-row'>
                <div className='control'>
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' name='password' />
                    <div className='control-error'>
                        { !passwordsMatch && <p>Passwords do not match</p> }
                    </div>
                </div>

                <div className='control'>
                    <label htmlFor='confirm-password'>Confirm Password</label>
                    <input
                        id='confirm-password'
                        type='password'
                        name='confirm-password'
                    />
                </div>
            </div>

            <hr />

            {/* First Name | Last Name */}
            <div className='control-row'>
                <div className='control'>
                    <label htmlFor='first-name'>First Name</label>
                    <input type='text' id='first-name' name='first-name' />
                </div>

                <div className='control'>
                    <label htmlFor='last-name'>Last Name</label>
                    <input type='text' id='last-name' name='last-name' />
                </div>
            </div>

            {/* Role */}
            <div className='control'>
                <label htmlFor='phone'>What best describes your role?</label>
                <select id='role' name='role'>
                    <option value='student'>Student</option>
                    <option value='teacher'>Teacher</option>
                    <option value='employee'>Employee</option>
                    <option value='founder'>Founder</option>
                    <option value='other'>Other</option>
                </select>
            </div>

            {/* Source */}
            <fieldset>
                <legend>How did you find us?</legend>
                <div className='control'>
                    <input
                        type='checkbox'
                        id='google'
                        name='acquisition'
                        value='google'
                    />
                    <label htmlFor='google'>Google</label>
                </div>

                <div className='control'>
                    <input
                        type='checkbox'
                        id='friend'
                        name='acquisition'
                        value='friend'
                    />
                    <label htmlFor='friend'>Referred by friend</label>
                </div>

                <div className='control'>
                    <input type='checkbox' id='other' name='acquisition' value='other' />
                    <label htmlFor='other'>Other</label>
                </div>
            </fieldset>

            {/* Terms */}
            <div className='control'>
                <label htmlFor='terms-and-conditions'>
                    <input type='checkbox' id='terms-and-conditions' name='terms' />I
                    agree to the terms and conditions
                </label>
            </div>

            {/* Action Buttons */}
            <p className='form-actions'>
                <button type='reset' className='button button-flat'>
                    Reset
                </button>
                <button type='submit' className='button'>
                    Sign up
                </button>
            </p>
        </form>
    );
}
