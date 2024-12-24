import { makeStyles } from "@mui/styles";

const useSignupStyle = makeStyles(() => ({
    loginContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "2rem",
        backgroundColor: "#f9f9f9",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "#ffffff",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    },
    inputField: {
        width: "100%",
        padding: "0.75rem",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    submitButton: {
        backgroundColor: "#1976d2",
        color: "#fff",
        border: "none",
        padding: "0.75rem",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#115293",
        },
    },
    errorMessage: {
        color: "red",
        fontSize: "0.9rem",
    },
    link: {
        color: "#1976d2",
        textDecoration: "underline",
        cursor: "pointer",
        "&:hover": {
            color: "#115293",
        },
    },
}));

export default useSignupStyle;
