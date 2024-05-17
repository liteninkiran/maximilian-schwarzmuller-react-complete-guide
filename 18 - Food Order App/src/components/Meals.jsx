import MealItem from './MealItem.jsx';
import Error from './Error.jsx';
import useHttp from '../hooks/useHttp.js';

const requestConfig = {};

export default function Meals() {
    const url = 'http://localhost:3000/meals';
    const { data: meals, isLoading, error } = useHttp(url, requestConfig, []);

    if (isLoading) {
        return <p className='center'>Fetching meals...</p>;
    }

    if (error) {
        return <Error title='Failed to fetch meals' message={error} />;
    }
    
    return (
        <ul id='meals'>
            {
                meals.map((meal) => (
                    <MealItem key={meal.id} meal={meal} />
                ))
            }
        </ul>
    );
}
