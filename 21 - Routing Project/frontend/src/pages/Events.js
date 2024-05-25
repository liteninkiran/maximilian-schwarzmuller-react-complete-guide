import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

const url = 'http://localhost:8080/events';

const EventsPage = () => {
    const data = useLoaderData();
    const events = data.events;
    return (
        <EventsList events={events} />
    );
}

export default EventsPage;

export const loader = async () => {
    const response = await fetch(url);
    if (!response.ok) {
        // ...
    } else {
        return response;
    }
}
