import { Link, useParams } from 'react-router-dom';

const EventDetailPage = () => {
    const params = useParams();
    return (
        <>
            <h1>Event Details</h1>
            <p>{params.id}</p>
            <p>
                <Link to='..' relative='path' className='event-link'>Back To Events</Link>
            </p>
        </>
    );
}

export default EventDetailPage;
