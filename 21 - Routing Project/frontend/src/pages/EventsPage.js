import { Link } from 'react-router-dom';

const EventsPage = () => {
    return (
        <>

            <h1>Events Page</h1>

            <ul>
                {
                    EVENTS.map(event => (
                        <li key={event.id}>
                            <Link className='event-link' to={event.id}>{event.title}</Link>
                        </li>
                    ))
                }
            </ul>

        </>
    );
}

export default EventsPage;

const EVENTS = [
    { id: '1', title: 'Event 1' },
    { id: '2', title: 'Event 2' },
    { id: '3', title: 'Event 3' },
];
