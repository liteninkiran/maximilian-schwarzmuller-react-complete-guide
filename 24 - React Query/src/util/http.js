import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const baseUrl = 'http://localhost:3000/events';

export const fetchEvents = async ({ signal, searchTerm }) => {
    const url = baseUrl + (searchTerm ? `?search=${searchTerm}` : '');
    const response = await fetch(url, { signal: signal });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { events } = await response.json();

    return events;
}

export const createNewEvent = async (eventData) => {
    const url = baseUrl;
    const options = {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(url, options);

    if (!response.ok) {
        const error = new Error('An error occurred while creating the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { event } = await response.json();

    return event;
}

export async function fetchSelectableImages({ signal }) {
    const url = `${baseUrl}/images`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the images');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { images } = await response.json();

    return images;
}

export async function fetchEvent({ id, signal }) {
    const url = `${baseUrl}/${id}`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { event } = await response.json();

    return event;
}

export async function deleteEvent({ id }) {
    const url = `${baseUrl}/${id}`;
    const options = { method: 'DELETE' }
    const response = await fetch(url, options);

    if (!response.ok) {
        const error = new Error('An error occurred while deleting the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return response.json();
}

export async function updateEvent({ id, event }) {
    const url = `${baseUrl}/${id}`;
    const options = {
        method: 'PUT',
        body: JSON.stringify({ event }),
        headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(url, options);

    if (!response.ok) {
        const error = new Error('An error occurred while updating the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return response.json();
}
