import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { FiberManualRecord } from '@material-ui/icons';

export default function SearchVideoList(props: any) {
    const listOfVideos = props.videos.map((video: any) => (
        <Grid item xs={12} key={video.id}>
            <Paper style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => props.onVideoSelect(video)} >
                <img style={{ marginRight: "20px", width: "30%" }} alt="thumbnail" src={video.thumbnail} />
                <div style={{ width: "65%" }}>
                    <Typography variant="h4">
                        <b>{video.title}</b>
                    </Typography>
                    <Typography variant="body2" style={{ display: "flex", alignItems: "center", margin: "5px" }}>
                        {video.author} &emsp; <FiberManualRecord fontSize="small" /> &emsp; {video.viewCount} Views &emsp; <FiberManualRecord fontSize="small" /> &emsp; {video.date}
                    </Typography>
                    <Typography variant="subtitle1" noWrap style={{ margin: "5px" }}>
                        {video.description}
                    </Typography>
                </div>
            </Paper>
        </Grid>
    ));

    return (
        <Grid container spacing={10}>
            {listOfVideos}
        </Grid>
    );
}
