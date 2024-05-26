import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
    return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'signup';
    if (mode !== 'signup' && mode !== 'login' ) {
        const body = { message: 'Unsupported mode' }
        const init = { status: 422 }
        throw json(body, init);
    }
    const data = await request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password'),
    }
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify(authData)
    const options = { method, headers, body }
    const response = await fetch(url + mode, options);
    if (response.status === 422 || response.status === 401) {
        return response;
    }
    if (!response.ok) {
        const body = { message: `Could not ${mode}` }
        const init = { status: 500 }
        throw json(body, init);
    }

    return redirect('/');
}

const url = 'http://localhost:8080/';
