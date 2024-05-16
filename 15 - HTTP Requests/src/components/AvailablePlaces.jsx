import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchPlaces() {
            setIsLoading(true);

            try {
                const response = await fetch('http://localhost:3000/places');
                const resData = await response.json();
    
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
    
                setAvailablePlaces(resData.places);
            } catch (error) {
                const message = 'Could not fetch data. Please try again later.';
                setError({ message: error.message || message });
            }
            setIsLoading(false);
        }
        fetchPlaces();
    }, []);

    if (error) {
        return (<Error title='An error occurred' message={error.message} />);
    }

    return (
        <Places
            title='Available Places'
            places={availablePlaces}
            isLoading={isLoading}
            loadingText='Fetching data...'
            fallbackText='No places available.'
            onSelectPlace={onSelectPlace}
        />
    );
}
