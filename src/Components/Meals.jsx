import useHttp from "../Hooks/useHttp.js";
import MealItem from "./MealItem.jsx";

const requestConfig = {};

export default function Meals() {

    const { data: loadedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    if (!loadedMeals) {
        return <p>No meals found</p>;
    }
    return (
        <ul id="meals">

            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}

        </ul>
    );
}


