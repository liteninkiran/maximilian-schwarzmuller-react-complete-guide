import { json, useLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

const EventDetailPage = () => {
    const data = useLoaderData();
    return (
        <EventItem event={data.event}>

        </EventItem>
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
