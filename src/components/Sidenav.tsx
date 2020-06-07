import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Drawer, List, Divider, IconButton, ListItem, ListItemIcon, Input, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox, Chip, Button } from '@material-ui/core';
import { ChevronLeft, FilterList } from '@material-ui/icons';

import logo from './../assets/logo.png';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            padding: theme.spacing(0, 1),
        },
        margin: {
            margin: theme.spacing(1),
        },
        listItems: {
            textDecoration: 'inherit',
            color: 'inherit'
        },
        drawer: {
            width: drawerWidth,
            flexGrow: 1,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        formControl: {
            margin: theme.spacing(1),
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function Sidenav(props: any) {
    const filterData: any = localStorage.getItem("__filters");
    const data = JSON.parse(filterData);
    const classes = useStyles();

    const [qualityValue, setQualityValue] = React.useState<string[]>([]);
    const [genreValue, setGenreValue] = React.useState<string[]>([]);
    const [categoryValue, setCategoryValue] = React.useState<string[]>([]);

    const handleQualityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setQualityValue(event.target.value as string[]);
        props.onFilterChange(event.target.value, genreValue, categoryValue);
    };

    const handleGenreChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setGenreValue(event.target.value as string[]);
        props.onFilterChange(qualityValue, event.target.value, categoryValue);
    };

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategoryValue(event.target.value as string[]);
        props.onFilterChange(qualityValue, genreValue, event.target.value);
    };

    const resetFilters = () => {
        setQualityValue([]);
        setGenreValue([]);
        setCategoryValue([]);
        props.onFilterChange([], [], [])
    };

    return (
        <div>
            <Drawer
                className={classes.drawer}
                anchor="left"
                open={props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{ onBackdropClick: props.handleDrawerClose }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={props.handleDrawerClose}>
                        <ChevronLeft />
                    </IconButton>
                    <img src={logo} alt="Logo" className={classes.logo} />
                    <ListItemText>Youtube Project</ListItemText>
                </div>
                <Divider />
                <br />
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <FilterList />
                        </ListItemIcon>
                        <ListItemText>
                            Filters
                    </ListItemText>
                    </ListItem>
                </List>
                <FormControl className={classes.formControl}>
                    <InputLabel id="mutiple-quality-label">Quality</InputLabel>
                    <Select
                        labelId="mutiple-quality-label"
                        id="mutiple-quality-chip"
                        multiple
                        value={qualityValue}
                        onChange={handleQualityChange}
                        input={<Input />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                                {(selected as string[]).map((value) => (
                                    <Chip key={value} label={value} className={classes.chip} onDelete={() => { }} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {data.quality.map((value: any) => (
                            <MenuItem key={value} value={value}>
                                <Checkbox checked={qualityValue.indexOf(value) > -1} />
                                <ListItemText primary={value} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <Divider />
                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel id="mutiple-genre-label">Genre</InputLabel>
                    <Select
                        labelId="mutiple-genre-label"
                        id="mutiple-genre-chip"
                        multiple
                        value={genreValue}
                        onChange={handleGenreChange}
                        input={<Input />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                                {(selected as string[]).map((value) => (
                                    <Chip key={value} label={value} className={classes.chip} onDelete={() => { }} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {data.genre.map((value: any) => (
                            <MenuItem key={value} value={value}>
                                <Checkbox checked={genreValue.indexOf(value) > -1} />
                                <ListItemText primary={value} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <Divider />
                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel id="mutiple-category-label">Category</InputLabel>
                    <Select
                        labelId="mutiple-category-label"
                        id="mutiple-category-chip"
                        multiple
                        value={categoryValue}
                        onChange={handleCategoryChange}
                        input={<Input />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                                {(selected as string[]).map((value) => (
                                    <Chip key={value} label={value} className={classes.chip} onDelete={() => { }} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {data.category.map((value: any) => (
                            <MenuItem key={value} value={value}>
                                <Checkbox checked={categoryValue.indexOf(value) > -1} />
                                <ListItemText primary={value} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <Divider />
                <List>
                    <ListItem>
                        <Button variant="contained" size="medium"
                            color="primary" className={classes.margin} onClick={resetFilters}>
                            Reset Filters
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}
