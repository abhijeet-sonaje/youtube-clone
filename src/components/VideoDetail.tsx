import React, { useState, useEffect } from "react";

import { Paper, Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, IconButton } from "@material-ui/core";
import { FiberManualRecord, ExpandMore, ThumbUp, ThumbDown } from '@material-ui/icons';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import VideoComments from './VideoComments';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

export default function VideoDetail(props: any) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [expandedComments, setExpandedComments] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(props.video.liked);
    const [disliked, setDisliked] = useState<boolean>(props.video.disliked);
    const [likeCount, setLikeCount] = useState<number>(parseInt(props.video.likeCount));
    const [dislikeCount, setDislikeCount] = useState<number>(parseInt(props.video.dislikeCount));

    useEffect(() => {
        setLiked(props.video.liked);
        setDisliked(props.video.disliked);
        setLikeCount(props.video.likeCount);
        setDislikeCount(props.video.dislikeCount);
    }, [props.video.liked, props.video.disliked, props.video.likeCount, props.video.dislikeCount])

    const handleChange = (likedValue: boolean, dislikedValue: boolean) => {
        if (likedValue !== liked) {
            setLiked(likedValue);
            if (likedValue) {
                disliked && setDisliked(false);
                setLikeCount(likeCount + 1);
                setDislikeCount(dislikeCount - 1);
            } else {
                setLikeCount(likeCount - 1);
            }
        }
        if (dislikedValue !== disliked) {
            setDisliked(dislikedValue);
            if (dislikedValue) {
                liked && setLiked(false);
                setDislikeCount(dislikeCount + 1);
                setLikeCount(likeCount - 1);
            } else {
                setDislikeCount(dislikeCount - 1);
            }
        }
    }

    if (!props.video) return <div>Loading...</div>;

    const videoSrc = `https://www.youtube.com/embed/${props.video.id}`;

    return (
        <div>
            <Paper elevation={6} style={{ position: "relative", width: "100%", height: "50vh" }}>
                <iframe
                    frameBorder="0"
                    style={{
                        position: "absolute", top: 0, left: 0, height: "100%", width: "100%"
                    }}
                    title="Video Player"
                    src={videoSrc}
                />
            </Paper>
            <Paper elevation={6} style={{ padding: "15px" }}>
                <Typography variant="h4">
                    {props.video.title}
                </Typography>
                <Typography variant="subtitle1" style={{ display: "flex", alignItems: "center", margin: "5px", justifyContent: "space-between" }}>
                    <span>
                        {props.video.viewCount} Views &emsp; <FiberManualRecord fontSize="small" /> &emsp; {props.video.date}
                    </span>
                    <span style={{ alignItems: "center" }}>
                        <IconButton disabled={liked} onClick={() => handleChange(!liked, disliked)}>
                            {liked ? <ThumbUp color="primary" fontSize="small" /> : <ThumbUp fontSize="small" />}
                        </IconButton>
                        {likeCount} &emsp;
                        <IconButton disabled={disliked} onClick={() => handleChange(liked, !disliked)}>
                            {disliked ? <ThumbDown color="primary" fontSize="small" /> : <ThumbDown fontSize="small" />}
                        </IconButton>
                        {dislikeCount} &emsp;
                    </span>
                </Typography>

                <ExpansionPanel expanded={expanded} onChange={() => setExpanded(!expanded)}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="channel-content"
                        id="channel-header"
                    >
                        <Typography variant="subtitle1" className={classes.heading} style={{ display: "flex", alignItems: "center", margin: "5px" }}>
                            By {props.video.channel.title}
                        </Typography>
                        <Typography variant="body2" style={{ display: "flex", alignItems: "center", margin: "5px" }}>
                            {props.video.channel.subscribers} subscribers
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography variant="subtitle2" style={{ whiteSpace: "break-spaces" }}>{props.video.description}</Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expandedComments} onChange={() => setExpandedComments(!expandedComments)}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="comments-content"
                        id="comments-header"
                    >
                        <Typography variant="subtitle1" className={classes.heading} style={{ display: "flex", alignItems: "center", margin: "5px" }}>
                            Comments
                        </Typography>
                        <Typography variant="body2" style={{ display: "flex", alignItems: "center", margin: "5px" }}>
                            {props.video.comments.length} comments
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <VideoComments variant="subtitle2" comments={props.video.comments} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Paper>
        </div>
    );
}
