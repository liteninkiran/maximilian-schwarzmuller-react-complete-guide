import { Outlet, useSubmit, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';

import MainNavigation from '../components/MainNavigation';

const RootLayout = () => {
    const token = useLoaderData();
    const submit = useSubmit();
    useEffect(() => {
        if (!token) {
            return;
        }
        const oneHour = 60 * 60 * 1000;
        const options = { action: '/logout', method: 'POST' }
        setTimeout(() => submit(null, options), oneHour);
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
