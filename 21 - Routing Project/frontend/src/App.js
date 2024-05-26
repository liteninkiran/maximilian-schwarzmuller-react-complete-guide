// React
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import HomePage from './pages/Home';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailPage, {
    loader as eventDetailLoader,
    action as deleteEventAction,
} from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';

// Components
import { action as saveEventAction } from './components/EventForm';

// Root Files
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';

const eventRoutes = [
    {
        index: true,
        element: <EventsPage />,
        loader: eventsLoader,
    },
    {
        id: 'event-detail',
        path: ':id',
        loader: eventDetailLoader,
        children: [
            {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
            },
            {
                path: 'edit',
                element: <EditEventPage />,
                action: saveEventAction,
            },
        ],
    },
    {
        path: 'new',
        element: <NewEventPage />,
        action: saveEventAction,
    },
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
        errorElement: <ErrorPage />,
        children: eventRoot,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
