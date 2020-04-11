import React, {FC} from 'react';
import {ProfileType} from "../../../redux/reducers/types";
import {Grid, isWidthUp, makeStyles, Tab, Tabs, WithWidth} from "@material-ui/core";
import TabPanel from "./TabPanel";
import StaticProfileInfo from "../ProfileInfo/StaticProfileInfo";
import PostsContainer from "../Posts/PostsContainer";
import SwipeableViews from 'react-swipeable-views';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import withWidth from "@material-ui/core/withWidth";

type PropsType = {
    profile: ProfileType
    isOwner: boolean,
    currentUserInfo: ProfileType | null
}

const useStyles = makeStyles(theme => ({
    tab: {
        fontWeight: 400,
        textTransform: 'none',
        minWidth: 'auto',
        color: theme.palette.primary.light,
        '&:not($selected):hover': {
            color: theme.palette.primary.main
        },
        [theme.breakpoints.up('lg')]: {
            minWidth: 90,
        }
    },
    selected: {
        color: theme.palette.secondary.main,
        cursor: 'auto'
    },
    indicator: {
        backgroundColor: 'transparent'
    },
}));

const ProfileInfoTabs: FC<PropsType & WithWidth> = ({profile, isOwner, currentUserInfo, width}) => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const widthUpMd = isWidthUp('md', width);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };
    const handleChangeIndex = (index: number) => {
        setSelectedTab(index);
    };

    return (
        <>
            <Grid container direction={widthUpMd ? 'row' : 'column-reverse'}>
                <Grid item xs={12} md={10}>
                    <SwipeableViews
                        axis='x'
                        index={selectedTab}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel selectedTab={selectedTab} index={0}>
                            <StaticProfileInfo
                                profile={profile}
                            />
                        </TabPanel>
                        <TabPanel selectedTab={selectedTab} index={1}>
                            <PostsContainer
                                author={profile}
                                authorId={profile.userId}
                                isOwner={isOwner}
                                currentUserInfo={currentUserInfo}
                            />
                        </TabPanel>
                    </SwipeableViews>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="profile tabs"
                        centered={!widthUpMd}
                        orientation={widthUpMd ? "vertical" : "horizontal"}
                        TabIndicatorProps={{
                            className: classes.indicator,
                        }}
                    >
                        <Tab icon={<AssignmentOutlinedIcon/>} label="Info" disableRipple classes={{
                            root: classes.tab,
                            selected: classes.selected
                        }}/>
                        <Tab icon={<ListAltOutlinedIcon/>} label="Posts" disableRipple classes={{
                            root: classes.tab,
                            selected: classes.selected
                        }}/>
                    </Tabs>
                </Grid>
            </Grid>
        </>
    )
};

export default withWidth()(ProfileInfoTabs);