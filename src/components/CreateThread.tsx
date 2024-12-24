import useThreadStyles from "../styles/CreateThreadStyle"; // Import the styles
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const CreateThread: React.FC<{ onThreadCreated: () => void }> = ({ onThreadCreated }) => {
    const classes = useThreadStyles();

    const [formData, setFormData] = useState({
        title: "",
        store_name: "",
        store_location: "",
        author_name: "", // Author will be set automatically
        details: "",
        rating: "",
    });

    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const username = localStorage.getItem("username");
        console.log("Fetched username from localStorage:", username); // Debug log
        if (username) {
            setFormData((prev) => ({ ...prev, author_name: username }));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // uncomment the line below to constantly see the updated form data with each change
        // console.log("Updated formData:", formData); // Debug log
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = { ...formData, rating: parseFloat(formData.rating) };
            console.log("Submitting payload:", payload); // Debug log
            await axios.post(`${API_URL}/api/threads/add`, payload, {
                headers: { "Content-Type": "application/json" },
            });

            setSuccess("Thread created successfully!");
            setError(null);

            // Clear form (but keep the author_name)
            setFormData({
                title: "",
                store_name: "",
                store_location: "",
                author_name: formData.author_name, // Retain the logged-in username
                details: "",
                rating: "",
            });

            // Trigger the parent refresh
            onThreadCreated();
        } catch (err) {
            setError("Failed to create thread. Please try again.");
            setSuccess(null);
            console.error("Error creating thread:", err); // Debug log
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classes.formContainer}>
            {success && <p className={`${classes.message} ${classes.successMessage}`}>{success}</p>}
            {error && <p className={`${classes.message} ${classes.errorMessage}`}>{error}</p>}
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={classes.inputField}
                    required
                />
            </div>
            <div>
                <label>Store Name:</label>
                <input
                    type="text"
                    name="store_name"
                    value={formData.store_name}
                    onChange={handleChange}
                    className={classes.inputField}
                    required
                />
            </div>
            <div>
                <label>Store Location:</label>
                <input
                    type="text"
                    name="store_location"
                    value={formData.store_location}
                    onChange={handleChange}
                    className={classes.inputField}
                    required
                />
            </div>
            <div>
                <label>Details:</label>
                <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className={classes.textArea}
                    required
                ></textarea>
            </div>
            <div>
                <label>Rating:</label>
                <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className={classes.inputField}
                    min="0"
                    max="5"
                    step="0.1"
                    required
                />
            </div>
            <button type="submit" className={classes.submitButton}>
                Create Thread
            </button>
        </form>
    );
};

export default CreateThread;
