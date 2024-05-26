import { json, redirect } from 'react-router-dom';

import EventForm from '../components/EventForm';

const NewEventPage = () => {
    return (
        <EventForm />
    );
}

export default NewEventPage;

export const action = async({ request, params }) => {
    const data = await request.formData();
    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    };
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify(eventData)
    const options = { method, headers, body }
    const response = await fetch(url, options);

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        const body = { message: 'Could not save event.' }
        const init = { status: 500 }
        throw json(body, init);
    }

    return redirect('/events');
}

const url = 'http://localhost:8080/events';
