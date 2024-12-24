import DeleteButton from "./DeleteButton"; // Import the delete button component
import Thread from "../types/Thread";
import useFoodReviewsStyle from "../styles/FoodReviewsStyle"; // Import styles
import axios, { isAxiosError } from "axios";
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Card, CardContent, Typography, Box, Divider, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";

const API_URL = process.env.REACT_APP_API_URL;

const FoodReviews = forwardRef((_, ref) => {
    const [foodReviews, setFoodReviews] = useState<Thread[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<string | null>(null); // Store logged-in username
    const classes = useFoodReviewsStyle(); // Use imported styles

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

    // Fetch food reviews and current user's username when the component loads
    useEffect(() => {
        fetchFoodReviews();

        // Retrieve the logged-in user's username from localStorage
        const username = localStorage.getItem("username");
        setCurrentUser(username); // Store the username in state
    }, []);

    if (loading) {
        return <div>Loading food reviews...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {foodReviews.map((review) => (
                <Card key={review.id} className={classes.reviewCard} sx={{ textAlign: "left" }}>
                    <CardContent>
                        <Stack spacing={1}>
                            <Typography variant="h6" color="textPrimary" className={classes.reviewTitle} gutterBottom>
                                {review.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textPrimary"
                                className={classes.reviewBody}
                                component="p"
                            >
                                {review.details}
                            </Typography>
                            <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                                {"Posted by " +
                                    review.author_name +
                                    " at " +
                                    review.store_name +
                                    ", " +
                                    review.store_location}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                                <FavoriteBorderIcon />
                                <Divider flexItem />
                                <CommentIcon />
                                <Typography variant="body2">Comments: {review.comments}</Typography>
                                <Typography variant="body2">Rating: {review.rating}</Typography>
                            </Box>
                            {/* Delete Button: Only visible if the current user is the author */}
                            {currentUser === review.author_name && (
                                <Box display="flex" justifyContent="flex-end">
                                    <DeleteButton threadId={review.id} onDelete={fetchFoodReviews} />
                                </Box>
                            )}
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </>
    );
});

FoodReviews.displayName = "FoodReviews";

export default FoodReviews;
