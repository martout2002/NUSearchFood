// DeleteButton.tsx
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

interface DeleteButtonProps {
    threadId: number;
    onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ threadId, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/api/threads/delete?id=${threadId}`);
            toast.success("Thread deleted successfully!");
            onDelete(); // Trigger refresh of the parent component
        } catch (error) {
            toast.error("Failed to delete the thread. Please try again.");
            console.error(error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            style={{ background: "red", color: "white", border: "none", padding: "5px 10px" }}
        >
            Delete
        </button>
    );
};

export default DeleteButton;
