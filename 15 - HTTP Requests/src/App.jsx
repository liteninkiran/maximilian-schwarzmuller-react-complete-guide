import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import Error from './components/Error.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js'

function App() {
    const selectedPlace = useRef();
    const [userPlaces, setUserPlaces] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [updateError, setUpdateError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    useEffect(() => {
        const fetchPlaces = async () => {
            setIsLoading(true);
            try {
                const userPlaces = await fetchUserPlaces();
                setUserPlaces(userPlaces);
            } catch(error) {
                const message = 'Failed to fetch user data';
                setError({ message: error.message || message });
            }
            setIsLoading(false);
        }
        fetchPlaces();
    }, []);
    const handleStartRemovePlace = place => {
        setModalIsOpen(true);
        selectedPlace.current = place;
    }
    const handleStopRemovePlace = () => setModalIsOpen(false);
    const handleSelectPlace = async (selectedPlace) => {
        setUserPlaces(prev => {
            prev = prev ?? [];
            return prev.some((place) => place.id === selectedPlace.id)
                ? prev
                : [selectedPlace, ...prev];
        });
        try {
            await updateUserPlaces([selectedPlace, ...userPlaces]);
        } catch (error) {
            setUserPlaces(userPlaces);
            setUpdateError({ message: error.message || 'Failed to update' });
        }
    }
    const handleRemovePlaceFn = async () => {
        setUserPlaces(prev => prev.filter(place => place.id !== selectedPlace.current.id));
        try {
            await updateUserPlaces(userPlaces.filter(place => place.id !== selectedPlace.current.id));
        } catch (error) {
            setUserPlaces(userPlaces);
            setUpdateError({ message: error.message || 'Failed to delete' });
        }
        setModalIsOpen(false);
    }
    const handleRemovePlace = useCallback(handleRemovePlaceFn, [userPlaces]);
    const handleError = () => setUpdateError(null);

    return (
        <>
            <Modal open={updateError} onClose={handleError}>
                {
                    updateError ? (
                        <Error
                            title='An error occurred'
                            message={updateError.message}
                            onConfirm={handleError}
                        />
                    ) : (
                        null
                    )
                }
            </Modal>

            <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header>
                <img src={logoImg} alt='Stylized globe' />
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to visit or
                    you have visited.
                </p>
            </header>
            <main>
                {
                    error ? (
                        <Error title='An error occurred' message={error.message} />
                    ) : (
                        <Places
                            title="I'd like to visit ..."
                            fallbackText='Select the places you would like to visit below.'
                            isLoading={isLoading}
                            loadingText='Fetching data...'
                            places={userPlaces}
                            onSelectPlace={handleStartRemovePlace}
                        />
                     )
                }
                <AvailablePlaces onSelectPlace={handleSelectPlace} />
            </main>
        </>
    );
}

export default App;
