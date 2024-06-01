import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventForm from './EventForm.jsx';
import { createNewEvent } from '../../util/http.js';

export default function NewEvent() {
    const navigate = useNavigate();
    const mutant = { mutationFn: createNewEvent }
    const { mutate, isPending, isError, error } = useMutation(mutant);
    const handleSubmit = (formData) => mutate({ event: formData });
    const errorTitle = 'Failed to create event';
    const errorMessageFallback = 'Failed to create event. Please check the form and try again.';
    const errorMessage = (error && error.info?.message) || errorMessageFallback;
    const actionButtons = (
        <>
            <Link to='../' className='button-text'>Cancel</Link>
            <button type='submit' className='button'>Create</button>
        </>
    );
    const errorBlock = isError
        ? <ErrorBlock title={errorTitle} message={errorMessage} />
        : null;

    return (
        <Modal onClose={() => navigate('../')}>
            <EventForm onSubmit={handleSubmit}>
                { isPending ? 'Submitting...' : actionButtons }
            </EventForm>
            { errorBlock }
        </Modal>
    );
}
