import BasicThreadList from "../components/BasicThreadList";
import AppBar from "../components/AppBar";
import FoodReviews from "../components/FoodReviews";
import React from "react";

const Home: React.FC = () => {
    return (
        <>
            <AppBar />
            <h3>
                {"Welcome to Martin's food forum! Here's a basic list of forum threads for you to experiment with."}
            </h3>
            <br />
            <BasicThreadList />
            <div>
                <FoodReviews />
            </div>
        </>
    );
};

export default Home;
