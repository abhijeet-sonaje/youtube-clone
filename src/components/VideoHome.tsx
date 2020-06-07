import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

export default function VideoHome(props: any) {
    const [videoArray, setVideoArray] = useState([]);

    useEffect(() => {
        if (props.selectedVideo.recommendations.length > 0) {
            const vData: any = localStorage.getItem("__videos");
            const videos = JSON.parse(vData);
            const arr: any = [];
            props.selectedVideo.recommendations.forEach((id: string) => {
                const index = videos.findIndex((v: any) => v.id === id);
                arr.push(videos[index]);
            });
            setVideoArray(arr);
        }
    }, [props.selectedVideo.recommendations]);

    return (
        <Grid style={{ justifyContent: "center" }} container spacing={10}>
            <Grid item xs={12}>
                <Grid container spacing={5}>
                    <Grid item xs={8}>
                        <VideoDetail video={props.selectedVideo} />
                    </Grid>
                    <Grid item xs={4}>
                        <VideoList videos={videoArray} onVideoSelect={props.onVideoSelect} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}