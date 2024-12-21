import AppBar from "../components/AppBar";
import CreateThread from "../components/CreateThread";
import FoodReviews from "../components/FoodReviews";
import React, { useRef } from "react";

const Home: React.FC = () => {
    const foodReviewsRef = useRef<{ fetchFoodReviews: () => void }>(null);

    return (
        <>
            <AppBar />
            <div style={{ padding: "1rem" }}>
                <h3>{"Welcome to Martin's food forum!"}</h3>
                <p>{"Create a new thread or explore existing food reviews below."}</p>

                {/* Create Thread Section */}
                <div style={{ marginBottom: "2rem" }}>
                    <h4>{"Create a New Thread"}</h4>
                    <CreateThread
                        onThreadCreated={() => {
                            foodReviewsRef.current?.fetchFoodReviews();
                        }}
                    />
                </div>

                {/* Food Reviews Section */}
                <div>
                    <h4>{"Food Reviews"}</h4>
                    <FoodReviews ref={foodReviewsRef} />
                </div>
            </div>
        </>
    );
};

export default Home;
