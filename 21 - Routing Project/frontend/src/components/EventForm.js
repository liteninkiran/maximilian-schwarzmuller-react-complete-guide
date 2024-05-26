import { Form, useNavigate, useNavigation, useActionData, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const data = useActionData();
    const isSubmitting = navigation.state === 'submitting';
    const cancelHandler = () => navigate('..');

    return (
        <Form className={classes.form} method={method}>

            {
                data && data.errors ? (
                    <ul>
                        {
                            Object.values(data.errors).map(err => (
                                <li key={err}>{err}</li>
                            ))
                        }
                    </ul>
                ) : (
                    null
                )
            }

            {/* Title */}
            <p>
                <label htmlFor='title'>
                    Title
                </label>

                <input
                    id='title'
                    type='text'
                    name='title'
                    // required
                    defaultValue={event ? event.title : ''}
                />
            </p>

            {/* Image */}
            <p>
                <label htmlFor='image'>
                    Image
                </label>

                <input
                    id='image'
                    type='url'
                    name='image'
                    // required
                    defaultValue={event ? event.image : ''}
                />
            </p>

            {/* Date */}
            <p>
                <label htmlFor='date'>
                    Date
                </label>

                <input
                    id='date'
                    type='date'
                    name='date'
                    // required
                    defaultValue={event ? event.date : ''}
                />
            </p>

            {/* Description */}
            <p>
                <label htmlFor='description'>
                    Description
                </label>

                <textarea
                    id='description'
                    name='description'
                    rows='5'
                    // required
                    defaultValue={event ? event.description : ''}
                />
            </p>

            {/* User Actions */}
            <div className={classes.actions}>

                <button type='button' onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                </button>

                <button disabled={isSubmitting}>
                    { isSubmitting ? 'Submitting' : 'Save' }
                </button>

            </div>

        </Form>
    );
}

export default EventForm;

export const action = async({ request, params }) => {
    const data = await request.formData();
    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    };
    const method = request.method;
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify(eventData)
    const options = { method, headers, body }
    const url = baseUrl + (method === 'PATCH' ? `/${params.id}` : '');
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

const baseUrl = 'http://localhost:8080/events';
