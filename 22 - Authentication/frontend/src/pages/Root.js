import { Outlet, useSubmit, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

const RootLayout = () => {
    const token = useLoaderData();
    const submit = useSubmit();
    useEffect(() => {
        if (!token) {
            return;
        }
        const tokenDuration = getTokenDuration();
        console.log((tokenDuration / (1000 * 60)).toFixed() + ' minutes left until token expiration');
        const options = { action: '/logout', method: 'POST' }
        if (token === 'EXPIRED') {
            submit(null, options);
            return;
        }
        setTimeout(() => submit(null, options), tokenDuration);
    }, [token, submit]);

    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
