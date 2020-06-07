import React from "react";
import { Grid, Divider, Typography } from "@material-ui/core";
import Moment from 'react-moment';

export default function VideoComments(props: any) {
    const listOfComments = props.comments.map((comment: any) => (
        <Grid item xs={12} key={comment.name} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <img style={{ margin: "5px", width: "85px", height: "85px", borderRadius: "50%" }} alt="thumbnail" src={comment.picture} />
            <div>
                <Typography variant="subtitle1">
                    <b>{comment.name}</b> &emsp; <i><Moment fromNow ago>{new Date(parseInt(comment.date) * 1000)}</Moment> ago</i>
                </Typography>
                <Typography variant="body2" style={{ display: "flex", alignItems: "center", whiteSpace: "break-spaces" }}>
                    {comment.description}
                </Typography>
            </div>
            <Divider />
        </Grid>
    ));

    return (
        <Grid container spacing={4}>
            {listOfComments}
        </Grid>
    );
}
