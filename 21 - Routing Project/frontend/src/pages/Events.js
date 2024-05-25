import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

const url = 'http://localhost:8080/events';

const EventsPage = () => {
    const events = useLoaderData();
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
        const data = await response.json();
        return data.events;
    }
}
