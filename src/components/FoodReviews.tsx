import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import axios, { isAxiosError } from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CommentIcon from "@mui/icons-material/Comment";
import Thread from "../types/Thread";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(() => ({
    reviewTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    reviewBody: {
        fontSize: 14,
        whiteSpace: "pre-wrap",
        paddingBottom: "1em",
    },
    reviewCard: {
        marginBottom: "1em",
    },
    metadata: {
        fontSize: 14,
    },
}));

const FoodReviews = forwardRef((_, ref) => {
    const [foodReviews, setFoodReviews] = useState<Thread[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const classes = useStyles();

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

    // Fetch food reviews when the component loads
    useEffect(() => {
        fetchFoodReviews();
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
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </>
    );
});

FoodReviews.displayName = "FoodReviews";

export default FoodReviews;
