import React, { useState } from 'react';
import './App.css';
import FlexSearch from "flexsearch";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import Sidenav from './components/Sidenav';
import Header from './components/Header';
import VideoHome from './components/VideoHome';
import SearchVideoList from './components/SearchVideoList';

import data from './data';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
        }
    })
);

export default function App() {
    const filterData = { quality: data.quality, genre: data.genre, category: data.category };
    localStorage.setItem("__filters", JSON.stringify(filterData));
    localStorage.setItem("__videos", JSON.stringify(data.videos));

    const classes = useStyles();
    const options: any = {
        tokenize: "forward",
        doc: {
            id: "id",
            field: ["title", "description", "author"]
        }
    };

    const searchIndexs = FlexSearch.create(options);
    searchIndexs.add(data.videos);

    const [open, setOpen] = useState(false);
    // const results = useFlexSearch(query, searchIndexs, data.videos)
    const [videos, setVideos] = useState(data.videos);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSearch = (event: React.ChangeEvent<{ value: string }>) => {
        setSelectedVideo(null);
        if (event.target.value === "") {
            const vData: any = localStorage.getItem("__videos");
            setVideos(JSON.parse(vData));
        } else {
            const filteredVideos: any = searchIndexs.search({
                query: event.target.value,
                limit: 30
            });
            setVideos(filteredVideos);
        }
    };

    const handleFilterChange = (qualityValue: string[], genreValue: string[], categoryValue: string[]) => {
        setSelectedVideo(null);
        const searchInput: any = document.getElementById("__search")
        searchInput.value = "";
        const vData: any = localStorage.getItem("__videos");
        const v: any[] = filterVideos(JSON.parse(vData), qualityValue, genreValue, categoryValue);
        setVideos(v);
    }

    return (
        <div className="root">
            <Header handleDrawerOpen={handleDrawerOpen} open={open} onQueryChange={handleSearch} />
            <Sidenav handleDrawerClose={handleDrawerClose} open={open} onFilterChange={handleFilterChange} />
            <main className={classes.content}>
                <div className={classes.drawerHeader} />
                {selectedVideo ? <VideoHome selectedVideo={selectedVideo} videos={videos} onVideoSelect={setSelectedVideo} /> :
                    <Container><SearchVideoList videos={videos} onVideoSelect={setSelectedVideo} /></Container>
                }
            </main>
        </div>
    );
};

function filterVideos(videos: any[], qualityValue: string[], genreValue: string[], categoryValue: string[]) {
    if (qualityValue && qualityValue.length > 0) {
        videos = videos.filter((video: any) => {
            return qualityValue.every((v: string) => video.quality.includes(v));
        });
    }
    if (genreValue && genreValue.length > 0) {
        videos = videos.filter((video: any) => {
            return genreValue.every(v => video.genre.includes(v));
        });
    }
    if (categoryValue && categoryValue.length > 0) {
        videos = videos.filter((video: any) => {
            return categoryValue.every(v => video.category.includes(v));
        });
    }
    return videos;
}