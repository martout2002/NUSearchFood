import useLoginStyle from "../styles/LoginStyle";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginPageProps {
    onLogin: () => void; // Add the onLogin prop type
}

const API_URL = process.env.REACT_APP_API_URL;

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const classes = useLoginStyle();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/api/login`, formData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                // Call the onLogin callback to update authentication state
                onLogin();

                // Save the username to localStorage
                localStorage.setItem("username", formData.username);

                console.log("Login successful. Navigating to home...");
                navigate("/home");
            }
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <h1>Login</h1>
                {error && <p className={classes.error}>{error}</p>}
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={classes.input}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={classes.input}
                        required
                    />
                </div>
                <button type="submit" className={classes.button}>
                    Login
                </button>
                <p>
                    Don&apos;t have an account?{" "}
                    <span className={classes.link} onClick={() => navigate("/signup")}>
                        Sign up here
                    </span>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
