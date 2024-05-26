import { Await, defer, json, redirect, useRouteLoaderData } from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

const EventDetailPage = () => {
    const data = useRouteLoaderData('event-detail');
    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={data.event}>
                    { event => <EventItem event={event} /> }
                </Await>
            </Suspense>

            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={data.events}>
                    { events => <EventsList events={events} /> }
                </Await>
            </Suspense>
        </>
    );
}

export default EventDetailPage;

export const loader = async ({ request, params }) => {
    return defer({
        event: loadEvent(params.id),
        events: loadEvents(),
    });
}

const url = 'http://localhost:8080/events/';

export const action = async ({ params, request }) => {
    const eventId = params.id;
    const response = await fetch(url + eventId, { method: request.method });
    if (response.ok) {
        return redirect('/events');
    } else {
        const body = { message: 'Could not delete event.' }
        const init = { status: 500 }
        throw json(body, init);
    }
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

const loadEvent = async (id) => {
    const response = await fetch(url + id);
    if (response.ok) {
        const data = await response.json();
        return data.event;
    } else {
        const body = { message: 'Could not fetch event details.' }
        const init = { status: 500 }
        throw json(body, init);
    }
}
