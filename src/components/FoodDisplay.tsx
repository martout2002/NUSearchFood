import React, { useState, useEffect } from "react";

interface Food {
    id: number;
    name: string;
    calories: number;
}

function FoodDisplay() {
    const [foods, setFoods] = useState<Food[]>([]); // Explicitly type the state
    const [loading, setLoading] = useState(true); // State to show loading status

    useEffect(() => {
        // Fetch data from the backend API
        fetch("http://localhost:8000/api/foods")
            .then((response) => response.json())
            .then((data: Food[]) => {
                setFoods(data); // TypeScript knows data is Food[]
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Food Table</h1>
            <table border={1} style={{ width: "50%", margin: "auto", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Calories</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food) => (
                        <tr key={food.id}>
                            <td>{food.id}</td>
                            <td>{food.name}</td>
                            <td>{food.calories}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FoodDisplay;
