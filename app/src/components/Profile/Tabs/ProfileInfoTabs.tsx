import React, {FC} from 'react';
import {ProfileType} from "../../../redux/reducers/types";
import Paper from '@material-ui/core/Paper';
import {makeStyles, Tab, Tabs} from "@material-ui/core";
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TabPanel from "./TabPanel";
import StaticProfileInfo from "../ProfileInfo/StaticProfileInfo";
import PostsContainer from "../Posts/PostsContainer";
import SwipeableViews from 'react-swipeable-views';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import ViewListOutlinedIcon from '@material-ui/icons/ViewListOutlined';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';

type PropsType = {
    profile: ProfileType
    isOwner: boolean
}

const useStyles = makeStyles(theme => ({
    tab: {
        fontWeight: 400,
        textTransform: 'none',
        minWidth: 90
    },
    body: {
        marginTop: 20,
    },

    indicator: {
        backgroundColor: 'transparent'
    },

    container: {
        display: 'inline-flex',
        justifyContent: 'flex-start'
    }
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
            <Paper elevation={0}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                    TabIndicatorProps={{
                        className: classes.indicator,
                    }}
                    classes={{
                        flexContainer: classes.container
                    }}

                >
                    <Tab icon={<AssignmentOutlinedIcon/>} label="Info" disableRipple classes={{
                        root: classes.tab
                    }}/>
                    <Tab icon={<ListAltOutlinedIcon/>} label="Posts" disableRipple classes={{
                        root: classes.tab
                    }}/>
                </Tabs>
            </Paper>
            <Paper className={classes.body} elevation={0}>
                <SwipeableViews
                    axis='x'
                    index={selectedTab}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel selectedTab={selectedTab} index={0}>
                        <StaticProfileInfo
                            profile={profile}
                            isOwner={isOwner}
                        />
                    </TabPanel>
                    <TabPanel selectedTab={selectedTab} index={1}>
                        <PostsContainer
                            authorId={profile.userId}
                            isOwner={isOwner}
                        />
                    </TabPanel>
                </SwipeableViews>
            </Paper>
        </>
    )
};

export default ProfileInfoTabs;