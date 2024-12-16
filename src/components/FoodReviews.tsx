import FoodReview from "../types/FoodReview";

import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";

import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CommentIcon from "@mui/icons-material/Comment";

//When I deploy, this API url will be different
const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(() => ({
    reviewTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    reviewBody: {
        fontSize: 10,
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

const FoodReviews: React.FC = () => {
    const [foodReviews, setFoodReviews] = useState<FoodReview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const classes = useStyles();

    useEffect(() => {
        const fetchFoodReviews = async () => {
            try {
                const response = await axios.get<FoodReview[]>(`${API_URL}/api/threads`);
                setFoodReviews(response.data);
                setLoading(false);
            } catch (err: unknown) {
                // Narrow the type of error to AxiosError or another known type
                if (isAxiosError(err)) {
                    setError(err.response?.data?.message || "Failed to fetch food reviews");
                } else {
                    setError("An unexpected error occurred");
                }
                setLoading(false);
            }
        };

        fetchFoodReviews();
    }, []);

    if (loading) {
        return <div>Loading food reviews...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ margin: "2rem" }}>
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
                                {"Posted by " + review.author_name}
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
        </div>
    );
};
//         <div style={{ margin: "2rem" }}>
//             <h1>Food Reviews</h1>
//             <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Title</th>
//                         <th>Store Name</th>
//                         <th>Store Location</th>
//                         <th>Author Name</th>
//                         <th>Details</th>
//                         <th>Rating</th>
//                         <th>Comments</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {foodReviews.map((review) => (
//                         <tr key={review.id}>
//                             <td>{review.id}</td>
//                             <td>{review.title}</td>
//                             <td>{review.store_name}</td>
//                             <td>{review.store_location}</td>
//                             <td>{review.author_name}</td>
//                             <td>{review.details}</td>
//                             <td>{review.rating.toFixed(1)}</td>
//                             <td>{review.comments}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

export default FoodReviews;
