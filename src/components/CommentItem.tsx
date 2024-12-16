import Comment from "../types/Comment";

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CommentIcon from "@mui/icons-material/Comment";

type Props = {
    comment: Comment;
    styled: boolean;
};
const useStyles = makeStyles(() => ({
    commentTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    commentBody: {
        fontSize: 20,
        whiteSpace: "pre-wrap",
        paddingBottom: "1em",
    },
    commentCard: {
        marginBottom: "1em",
    },
    metadata: {
        fontSize: 14,
    },
}));

const CommentItem: React.FC<Props> = ({ comment, styled }) => {
    const classes = useStyles();

    if (styled) {
        return (
            <Card className={classes.commentCard} sx={{ textAlign: "left" }}>
                <CardContent>
                    <Stack spacing={1}>
                        <Typography variant="h6" color="textPrimary" className={classes.commentTitle} gutterBottom>
                            {comment.title}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                            {comment.body}
                        </Typography>
                        <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                            {"Posted by " + comment.author + " on " + comment.timestamp.toLocaleString()}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                            <FavoriteBorderIcon />
                            <Divider />
                            <CommentIcon />
                            {
                                //todo: add comment count //todo: add like count //todo: add location icon
                            }
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    // unstyled
    return (
        <li className={classes.commentBody}>
            {comment.body}
            <br />
            <em>{"posted by " + comment.author + " on " + comment.timestamp.toLocaleString()}</em>
        </li>
    );
};

export default CommentItem;
