import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
    const nav = useNavigation();

    return (
        <>
            <MainNavigation />
            <main>
                { nav.state === 'loading' && <p>Loading...</p>}
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
