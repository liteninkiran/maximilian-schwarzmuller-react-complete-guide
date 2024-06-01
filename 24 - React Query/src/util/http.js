export const fetchEvents = async ({ signal, searchTerm }) => {
    const url = 'http://localhost:3000/events' + (searchTerm ? `?search=${searchTerm}` : '');
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
    const url = 'http://localhost:3000/events';
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
