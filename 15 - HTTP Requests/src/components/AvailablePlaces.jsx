import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'

export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchPlaces() {
            setIsLoading(true);

            try {
                const places = await fetchAvailablePlaces();
                navigator.geolocation.getCurrentPosition(position => {
                    const sortedPlaces = sortPlacesByDistance(
                        places,
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    setAvailablePlaces(sortedPlaces);
                    setIsLoading(false);
                });
    
            } catch (error) {
                const message = 'Could not fetch data. Please try again later.';
                setError({ message: error.message || message });
                setIsLoading(false);
            }
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
