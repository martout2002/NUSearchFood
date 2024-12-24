import useSignupStyle from "../styles/SignupStyle";
import React, { useState } from "react";
import axios, { isAxiosError, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_API_URL;

const SignupPage: React.FC = () => {
    const classes = useSignupStyle();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/api/signup`, formData, {
                headers: { "Content-Type": "application/json" },
            });
            console.log(response.data);

            // Success notification
            toast.success("Signup successful! Redirecting to login...", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Redirect to login page
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            if (isAxiosError(err)) {
                interface ErrorResponse {
                    message: string;
                }
                const axiosError = err as AxiosError<ErrorResponse>;
                const errorMessage = axiosError.response?.data?.message || "Failed to sign up. Please try again.";
                toast.error(errorMessage.toString(), {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <div className={classes.loginContainer}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.inputGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className={classes.inputField}
                    />
                </div>
                <div className={classes.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={classes.inputField}
                    />
                </div>
                <button type="submit" className={classes.submitButton}>
                    Sign Up
                </button>
            </form>
            <p>
                Already have an account? <a href="/login">Log in here</a>.
            </p>
        </div>
    );
};

export default SignupPage;
