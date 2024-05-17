import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.js';

const requestConfig = {};

export default function Meals() {
    const url = 'http://localhost:3000/meals';
    const { data: meals, isLoading, error } = useHttp(url, requestConfig, []);

    if (isLoading) {
        return <p>Fetching meals...</p>;
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
