import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';
import Error from './components/Error.jsx';
import { useFetch } from './hooks/useFetch.js';

function App() {
    // Refs
    const selectedPlace = useRef();

    // State
    const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Side Effects
    const {
        isFetching,
        error,
        fetchedData: userPlaces,
        setFetchedData: setUserPlaces,
    } = useFetch(fetchUserPlaces, []);

    // Functions
    const handleStartRemovePlace = place => {
        setModalIsOpen(true);
        selectedPlace.current = place;
    }

    const handleStopRemovePlace = () => {
        setModalIsOpen(false);
    }

    const handleSelectPlace = async selectedPlace => {
        // await updateUserPlaces([selectedPlace, ...userPlaces]);

        setUserPlaces(prev => {
            if (!prev) {
                prev = [];
            }
            if (prev.some((place) => place.id === selectedPlace.id)) {
                return prev;
            }
            return [selectedPlace, ...prev];
        });

        try {
            await updateUserPlaces([selectedPlace, ...userPlaces]);
        } catch (error) {
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({
                message: error.message || 'Failed to update places.',
            });
        }
    }

    const handleRemovePlaceFn = async () => {
        setUserPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter(
                (place) => place.id !== selectedPlace.current.id
            )
        );

        try {
            await updateUserPlaces(
                userPlaces.filter((place) => place.id !== selectedPlace.current.id)
            );
        } catch (error) {
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({
                message: error.message || 'Failed to delete place.',
            });
        }

        setModalIsOpen(false);
    }

    const handleRemovePlace = useCallback(handleRemovePlaceFn, [userPlaces, setUserPlaces]);

    const handleError = () => {
        setErrorUpdatingPlaces(null);
    }

    return (
        <>
            <Modal open={errorUpdatingPlaces} onClose={handleError}>
                {errorUpdatingPlaces && (
                    <Error
                        title='An error occurred!'
                        message={errorUpdatingPlaces.message}
                        onConfirm={handleError}
                    />
                )}
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
                {error && <Error title='An error occurred!' message={error.message} />}
                {!error && (
                    <Places
                        title="I'd like to visit ..."
                        fallbackText='Select the places you would like to visit below.'
                        isLoading={isFetching}
                        loadingText='Fetching your places...'
                        places={userPlaces}
                        onSelectPlace={handleStartRemovePlace}
                    />
                )}

                <AvailablePlaces
                    onSelectPlace={handleSelectPlace}
                />
            </main>
        </>
    );
}

export default App;
