import { makeStyles } from "@mui/styles";

const useFoodReviewsStyle = makeStyles(() => ({
    reviewTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    reviewBody: {
        fontSize: 14,
        whiteSpace: "pre-wrap",
        paddingBottom: "1em",
    },
    reviewCard: {
        marginBottom: "1em",
    },
    metadata: {
        fontSize: 14,
    },
}));

export default useFoodReviewsStyle;
