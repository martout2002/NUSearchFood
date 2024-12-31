import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Heart Icon
import axios from "axios";

interface LikeButtonProps {
    threadId: number;
    likes: string[]; // Array of usernames who liked the thread
    currentUser: string | null; // Logged-in user's username
    onToggleLike: (threadId: number) => Promise<void>;
}

const API_URL = process.env.REACT_APP_API_URL;

const LikeButton: React.FC<LikeButtonProps> = ({ threadId, likes, currentUser, onToggleLike }) => {
    const [liked, setLiked] = useState<boolean>(currentUser ? likes.includes(currentUser) : false);
    const [likeCount, setLikeCount] = useState<number>(likes.length);

    const handleLike = async () => {
        try {
            await axios.post(`${API_URL}/api/threads/like?id=${threadId}`, null, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Username": currentUser, // Send current username in the header
                },
            });
            setLiked(!liked);
            setLikeCount((prev) => (liked ? prev - 1 : prev + 1)); // Update like count locally
            await onToggleLike(threadId); // Refresh from parent
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    return (
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleLike}>
            <FavoriteIcon style={{ color: liked ? "red" : "grey", transition: "0.3s" }} fontSize="large" />
            <span style={{ marginLeft: "0.5rem", fontSize: "1.2rem" }}>{likeCount}</span>
        </div>
    );
};

export default LikeButton;
