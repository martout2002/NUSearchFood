import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import useFoodReviewsStyle from "../styles/FoodReviewsStyle"; // Import styles
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";
import { Card, CardContent, Typography, Box, Divider, Stack } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

interface ReviewCardProps {
    review: {
        id: number;
        title: string;
        details: string;
        author_name: string;
        store_name: string;
        store_location: string;
        comments: string;
        rating: number;
        likes: string[];
    };
    currentUser: string | null;
    onToggleLike: (threadId: number) => Promise<void>;
    onDelete: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, currentUser, onToggleLike, onDelete }) => {
    const classes = useFoodReviewsStyle(); // Use imported styles

    return (
        <Card key={review.id} className={classes.reviewCard} sx={{ textAlign: "left" }}>
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="h6" color="textPrimary" className={classes.reviewTitle} gutterBottom>
                        {review.title}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" className={classes.reviewBody} component="p">
                        {review.details}
                    </Typography>
                    <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                        {"Posted by " + review.author_name + " at " + review.store_name + ", " + review.store_location}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <FavoriteBorderIcon />
                        <Divider flexItem />
                        <CommentIcon />
                        <Typography variant="body2">Comments: {review.comments}</Typography>
                        <Typography variant="body2">Rating: {review.rating}</Typography>
                    </Box>
                    <Divider />
                    <Box display="flex" alignItems="center" gap={1}>
                        <LikeButton
                            threadId={review.id}
                            likes={review.likes} // Pass the array of usernames
                            currentUser={currentUser} // Pass the logged-in username
                            onToggleLike={onToggleLike} // Handle toggling of likes
                        />
                    </Box>
                    <Divider />
                    {currentUser === review.author_name && (
                        <Box display="flex" justifyContent="flex-end">
                            <DeleteButton threadId={review.id} onDelete={onDelete} />
                        </Box>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;
