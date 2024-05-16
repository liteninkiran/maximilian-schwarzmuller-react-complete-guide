export const fetchAvailablePlaces = async () => {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return resData.places;
}

export const updateUserPlaces = async (places) => {
    const url = 'http://localhost:3000/user-places';
    const data = {
        method: 'PUT',
        body: JSON.stringify({ places }),
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch(url, data);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to update user data');
    }

    return resData.message;
}
