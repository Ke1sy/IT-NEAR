import React, {FC} from 'react';
import {ProfileType} from "../../../redux/reducers/types";
import {Grid, isWidthUp, Tab, Tabs, WithStyles, WithWidth} from "@material-ui/core";
import TabPanel from "./TabPanel";
import StaticProfileInfo from "../ProfileInfo/StaticProfileInfo";
import PostsContainer from "../Posts/PostsContainer";
import SwipeableViews from 'react-swipeable-views';
import withWidth from "@material-ui/core/withWidth";
import withProfileInfoTabsStyles from "./profileInfoTabsStyles";
import {compose} from "redux";
import {AssignmentOutlinedIcon, ListAltOutlinedIcon} from "../../Icons/MeterialIcons";

type PropsType = {
    profile: ProfileType
    isOwner: boolean,
    currentUserInfo: ProfileType | null,
    profileIsLoading: boolean
}

const ProfileInfoTabs: FC<PropsType & WithWidth & WithStyles> = ({profile, isOwner, currentUserInfo, width, profileIsLoading, classes}) => {
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
                                profileIsLoading={profileIsLoading}
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

export default compose(
    withWidth(),
    withProfileInfoTabsStyles
)(ProfileInfoTabs) as FC<PropsType>;