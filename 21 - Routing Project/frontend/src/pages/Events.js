import { Await, defer, json, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

const url = 'http://localhost:8080/events';

const EventsPage = () => {
    const data = useLoaderData();
    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={data.events}>
                { events => <EventsList events={events} ></EventsList> }
            </Await>
        </Suspense>
    );
}

export default EventsPage;

export const loader = () => {
    return defer({
        events: loadEvents(),
    });
}

const loadEvents = async () => {
    const response = await fetch(url);
    if (!response.ok) {
        const body = { message: 'Could not fetch events.' }
        const init = { status: 500 }
        throw json(body, init);
    } else {
        const data = await response.json();
        return data.events;
    }
}
