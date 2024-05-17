import { useEffect, useState } from 'react';
import MealItem from './MealItem.jsx'

const Meals = () => {
    const [meals, setMeals] = useState([]);
    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('http://localhost:3000/meals');
            if (!response.ok) {
                // TODO...
            }
            const data = await response.json();
            setMeals(data);
        }
        fetchMeals();
    }, []);
    return (
        <ul id='meals'>
            {
                meals.map(meal => (
                    <MealItem key={meal.id} meal={meal} />
                ))
            }
        </ul>
    );
}

export default Meals;
