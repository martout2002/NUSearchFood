import { makeStyles } from "@mui/styles";

const useLoginStyle = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "1rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "400px",
        background: "#f4f4f4",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    },
    input: {
        width: "100%",
        padding: "0.75rem",
        fontSize: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
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
    error: {
        color: "red",
        fontSize: "0.9rem",
    },
    link: {
        color: "#1976d2",
        cursor: "pointer",
        textDecoration: "underline",
        "&:hover": {
            color: "#115293",
        },
    },
}));

export default useLoginStyle;
