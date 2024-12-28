import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Heart Icon
import axios from "axios";

interface LikeButtonProps {
    threadId: number; // Thread ID to associate the like
    initialLikes: number; // Initial likes from the backend
}

const API_URL = process.env.REACT_APP_API_URL;

const LikeButton: React.FC<LikeButtonProps> = ({ threadId, initialLikes }) => {
    const [likes, setLikes] = useState(initialLikes); // State for the like count
    const [liked, setLiked] = useState(false); // Whether the user has liked

    // Load like status for the user from localStorage
    useEffect(() => {
        const storedLikes = localStorage.getItem(`liked-thread-${threadId}`);
        setLiked(storedLikes === "true");
    }, [threadId]);

    const handleLike = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/api/threads/like?id=${threadId}`,
                null, // No body needed
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Username": localStorage.getItem("username"), // Pass username
                    },
                },
            );
            setLikes(response.data.likes);
            setLiked(response.data.liked);
        } catch (err) {
            console.error("Error liking thread:", err);
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleLike}>
            <FavoriteIcon style={{ color: liked ? "red" : "grey", transition: "0.3s" }} fontSize="large" />
            <span style={{ marginLeft: "0.5rem", fontSize: "1.2rem" }}>{likes}</span>
        </div>
    );
};

export default LikeButton;
