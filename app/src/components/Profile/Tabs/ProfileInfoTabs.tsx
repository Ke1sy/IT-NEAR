import React, {FC} from 'react';
import {ProfileType} from "../../../redux/reducers/types";
import {Grid, makeStyles, Tab, Tabs} from "@material-ui/core";
import TabPanel from "./TabPanel";
import StaticProfileInfo from "../ProfileInfo/StaticProfileInfo";
import PostsContainer from "../Posts/PostsContainer";
import SwipeableViews from 'react-swipeable-views';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

type PropsType = {
    profile: ProfileType
    isOwner: boolean
}

const useStyles = makeStyles(theme => ({
    tab: {
        fontWeight: 400,
        textTransform: 'none',
        minWidth: 90,
        color: theme.palette.primary.light,
        '&:not($selected):hover': {
            color: theme.palette.primary.main
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

const ProfileInfoTabs: FC<PropsType> = ({profile, isOwner}) => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };
    const handleChangeIndex = (index: number) => {
        setSelectedTab(index);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={10}>
                    <SwipeableViews
                        axis='x'
                        index={selectedTab}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel selectedTab={selectedTab} index={0}>
                            <PostsContainer
                                author={profile}
                                authorId={profile.userId}
                                isOwner={isOwner}
                            />

                        </TabPanel>
                        <TabPanel selectedTab={selectedTab} index={1}>
                            <StaticProfileInfo
                                profile={profile}
                                isOwner={isOwner}
                            />
                        </TabPanel>
                    </SwipeableViews>
                </Grid>
                <Grid item xs={2}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="profile tabs"
                        orientation="vertical"
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

export default ProfileInfoTabs;