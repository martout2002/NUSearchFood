import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(() => ({
    formContainer: {
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
    },
    inputField: {
        width: "100%",
        padding: "0.5em",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    textArea: {
        width: "100%",
        padding: "0.5em",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        minHeight: "5em",
    },
    submitButton: {
        backgroundColor: "#1976d2",
        color: "#fff",
        border: "none",
        padding: "0.75em",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#115293",
        },
    },
    message: {
        fontSize: "1rem",
        marginBottom: "1em",
    },
    successMessage: {
        color: "green",
    },
    errorMessage: {
        color: "red",
    },
}));

const CreateThread: React.FC<{ onThreadCreated: () => void }> = ({ onThreadCreated }) => {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        title: "",
        store_name: "",
        store_location: "",
        author_name: "",
        details: "",
        rating: "",
    });

    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = { ...formData, rating: parseFloat(formData.rating) };
            await axios.post(`${API_URL}/api/threads/add`, payload, {
                headers: { "Content-Type": "application/json" },
            });

            setSuccess("Thread created successfully!");
            setError(null);

            // Clear form
            setFormData({
                title: "",
                store_name: "",
                store_location: "",
                author_name: "",
                details: "",
                rating: "",
            });

            // Trigger the parent refresh
            onThreadCreated();
        } catch (err) {
            setError("Failed to create thread. Please try again.");
            setSuccess(null);
            console.error(err);
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
                <label>Author Name:</label>
                <input
                    type="text"
                    name="author_name"
                    value={formData.author_name}
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
