import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';
import EventsPage from './pages/Events';
import EventDetailPage from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';

const eventRoutes = [
    {
        index: true,
        element: <EventsPage />,
        loader: async () => {
            const response = await fetch('http://localhost:8080/events');

            if (!response.ok) {
                // ...
            } else {
                return (await response.json()).events;
            }

        }
    },
    { path: ':id', element: <EventDetailPage /> },
    { path: 'new', element: <NewEventPage /> },
    { path: ':id/edit', element: <EditEventPage /> },
];

const indexRoute = {
    index: true,
    element: <HomePage />,
}

const childRoutes = {
    path: 'events',
    element: <EventsRootLayout />,
    children: eventRoutes,
}

const eventRoot = [
    indexRoute,
    childRoutes,
];

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: eventRoot,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
