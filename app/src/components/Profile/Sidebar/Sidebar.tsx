import React, {FC, useState, useEffect, Fragment} from 'react';
import {ProfileType} from "../../../redux/reducers/types";
import withSidebarStyles from './sidebarStyles'
import {
    WithStyles,
    Paper,
    Avatar,
    Typography,
    List,
    ListItem,
    Divider,
    Link,
} from '@material-ui/core';
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import ProfileStatus from "../Status/ProfileStatus";
import FacebookIcon from '@material-ui/icons/Facebook';
import LanguageIcon from '@material-ui/icons/Language';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import GitHubIcon from '@material-ui/icons/GitHub';
import VkIcon from '../../Svg/VkIcon';
import classNames from "classnames";

type PropsType = {
    status: string,
    profile: ProfileType,
    setUserStatus: (status: string) => void
    isOwner: boolean
}

type IconsType = {
    [key: string]: any
};

const icons: IconsType = {
    facebook: FacebookIcon,
    website: LanguageIcon,
    vk: VkIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    youtube: YouTubeIcon,
    github: GitHubIcon,
};

type ContactsArrType = {
    name: string
    url: string
}

const SocialIcon = (props: any) => {
    const {name, ...other} = props;
    const TagName = icons[name];
    return <TagName {...other}/>
};

const Sidebar: FC<PropsType & WithStyles> = ({profile: {photos, fullName, contacts}, status, classes, setUserStatus, isOwner}) => {
    const userAvatar = photos.large !== null ? photos.large : userPlaceholder;
    const [contactsArr, setContactsArr] = useState<Array<ContactsArrType>>([]);

    useEffect(() => {
        let newArr: ContactsArrType[] = [];
        Object.entries(contacts).forEach(([key, value]) => {
                if (value !== null && value.length) {
                    newArr = [...newArr, {name: key, url: value}];
                }
            }
        );
        setContactsArr(newArr);
    }, [contacts]);

    return (
        <Paper className={classes.paper}>
            <div className={classes.body}>
                <Avatar src={userAvatar} alt={fullName ? fullName : 'avatar'} className={classes.avatarImg}/>
                <Typography variant="h6">{fullName}</Typography>
                <ProfileStatus status={status} setUserStatus={setUserStatus} isOwner={isOwner}/>
            </div>
            <List aria-label="socials" disablePadding={true} className={classes.socials} component="div">
                {
                    contactsArr.map(({name, url}: { name: any, url: string }) =>
                        <Fragment key={name}>
                            <Divider/>
                            <ListItem button component={Link} href={url} target="_blank" rel="noopener noreferrer">
                                <SocialIcon name={name} className={classNames(`${classes.socialsIcon}`, `${name}`)}/>
                                <Typography variant="body2" noWrap>{url}</Typography>
                            </ListItem>
                        </Fragment>
                    )
                }
            </List>
        </Paper>
    )
};

export default withSidebarStyles(Sidebar);
