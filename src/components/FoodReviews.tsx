import ReviewCard from "./ReviewCard"; // Import the modularized ReviewCard component
import Thread from "../types/Thread";
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import axios, { isAxiosError } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const FoodReviews = forwardRef((_, ref) => {
    const [foodReviews, setFoodReviews] = useState<Thread[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<string | null>(null); // Store logged-in username

    // Function to fetch food reviews
    const fetchFoodReviews = async () => {
        try {
            const response = await axios.get<Thread[]>(`${API_URL}/api/threads`);
            setFoodReviews(response.data);
            setLoading(false);
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.message || "Failed to fetch food reviews");
            } else {
                setError("An unexpected error occurred");
            }
            setLoading(false);
        }
    };

    // Expose fetchFoodReviews to parent via ref
    useImperativeHandle(ref, () => ({
        fetchFoodReviews,
    }));

    useEffect(() => {
        fetchFoodReviews();
        const username = localStorage.getItem("username"); // Retrieve the logged-in user's username
        if (!username) {
            console.error("Username not found in localStorage!");
        }
        setCurrentUser(username); // Store the username in state
    }, []);

    // Function to handle like toggling
    const handleLikeToggle = async (threadId: number) => {
        try {
            await axios.post(`${API_URL}/api/threads/like?id=${threadId}`, null, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Username": currentUser, // Pass the username for toggling likes
                },
            });
            await fetchFoodReviews(); // Refresh food reviews to update likes
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.message || "Failed to toggle like");
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    if (loading) {
        return <div>Loading food reviews...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {foodReviews.map((review) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    currentUser={currentUser}
                    onToggleLike={handleLikeToggle}
                    onDelete={fetchFoodReviews}
                />
            ))}
        </>
    );
});

FoodReviews.displayName = "FoodReviews";

export const isLikedByUser = (likes: string[], username: string | null): boolean => {
    return username ? likes.includes(username) : false;
};

export default FoodReviews;
