import { makeStyles } from "@mui/styles";

const useThreadStyles = makeStyles(() => ({
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

export default useThreadStyles;
