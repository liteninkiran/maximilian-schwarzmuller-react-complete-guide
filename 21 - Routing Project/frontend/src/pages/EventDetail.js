import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

const EventDetailPage = () => {
    const data = useRouteLoaderData('event-detail');
    return (
        <EventItem event={data.event} />
    );
}

export default EventDetailPage;

export const loader = async ({ request, params }) => {
    const response = await fetch(url + params.id);
    if (response.ok) {
        return response;
    } else {
        const body = { message: 'Could not fetch event details.' }
        const init = { status: 500 }
        throw json(body, init);
    }
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
