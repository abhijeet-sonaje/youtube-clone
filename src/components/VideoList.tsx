import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

export default function VideoList(props: any) {
    const listOfVideos = props.videos.map((video: any) => (
        <Grid item xs={12} key={video.id}>
            <Paper style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => props.onVideoSelect(video)} >
                <img style={{ marginRight: "5px", width: "40%" }} alt="thumbnail" src={video.thumbnail} />
                <div style={{ width: "55%" }}>
                    <Typography variant="body2" noWrap>
                        <b>{video.title}</b>
                    </Typography>
                    <Typography variant="body2" style={{ display: "flex", alignItems: "center" }}>
                        {video.author}
                    </Typography>
                </div>
            </Paper>
        </Grid>
    ));

    return (
        <Grid container spacing={4}>
            {listOfVideos}
        </Grid>
    );
}
