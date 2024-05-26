import {
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';

// Pages
import AuthenticationPage from './pages/Authentication';
import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage from './pages/EventDetail';
import EventsPage from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import NewsletterPage from './pages/Newsletter';
import RootLayout from './pages/Root';

// Actions
import { action as manipulateEventAction } from './components/EventForm';
import { action as deleteEventAction } from './pages/EventDetail';
import { action as newsletterAction } from './pages/Newsletter';
import { action as authAction } from './pages/Authentication';

// Loaders
import { loader as eventDetailLoader } from './pages/EventDetail';
import { loader as eventsLoader } from './pages/Events';

const homeRoute = {
    index: true,
    element: <HomePage />,
}
const eventIndexRoute = {
    index: true,
    element: <EventsPage />,
    loader: eventsLoader,
}
const eventDetailRoute = {
    index: true,
    element: <EventDetailPage />,
    action: deleteEventAction,
}
const editEventRoute = {
    path: 'edit',
    element: <EditEventPage />,
    action: manipulateEventAction,
}
const eventDetailLoaderRoute = {
    path: ':eventId',
    id: 'event-detail',
    loader: eventDetailLoader,
    children: [
        eventDetailRoute,
        editEventRoute,
    ],
}
const newEventRoute = {
    path: 'new',
    element: <NewEventPage />,
    action: manipulateEventAction,
}
const eventRoute = {
    path: 'events',
    element: <EventsRootLayout />,
    children: [
        eventIndexRoute,
        eventDetailLoaderRoute,
        newEventRoute,
    ],
}
const newsLetterRoute = {
    path: 'newsletter',
    element: <NewsletterPage />,
    action: newsletterAction,
}
const authRoute = {
    path: 'auth',
    element: <AuthenticationPage />,
    action: authAction,
}
const mainRoute = {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
        homeRoute,
        eventRoute,
        newsLetterRoute,
        authRoute,
    ],
}
const routes = [
    mainRoute,
];

const router = createBrowserRouter(routes);

const App = () => {
    return <RouterProvider router={router} />;
}

export default App;
