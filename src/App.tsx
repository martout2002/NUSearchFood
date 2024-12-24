import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated (e.g., token exists in localStorage)
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token); // Set to true if token exists
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={
                        <LoginPage
                            onLogin={() => {
                                setIsAuthenticated(true);
                            }}
                        />
                    }
                />

                <Route path="/signup" element={<SignupPage />} />

                <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
