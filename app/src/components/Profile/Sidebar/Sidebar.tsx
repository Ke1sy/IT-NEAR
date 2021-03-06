import React, {FC, useState, useEffect, Fragment} from 'react';
import {ProfileType} from "../../../redux/reducers/types";
import withSidebarStyles from './sidebarStyles'
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import ProfileStatus from "../Status/ProfileStatus";
import VkIcon from '../../Icons/VkIcon';
import classNames from "classnames";
import LoadPhotoDialog from "../Dialogs/LoadPhotoDialog";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import {compose} from "redux";
import ProfileActions from "./ProfileActions";
import {Skeleton} from "@material-ui/lab";
import {
    WithStyles,
    Paper,
    Avatar,
    Typography,
    List,
    ListItem,
    Divider,
    Link, IconButton,
    Hidden,
} from '@material-ui/core';
import {
    FacebookIcon,
    LanguageIcon,
    TwitterIcon,
    InstagramIcon,
    YouTubeIcon,
    GitHubIcon,
    AddAPhotoIcon,
    DeleteIcon
} from "../../Icons/MeterialIcons";

type PropsType = {
    status: string
    profile: ProfileType
    setUserStatus: (status: string) => void
    isOwner: boolean
    loadPhoto: (photo: any) => void
    profileIsLoading: boolean
    followed: boolean
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

const Sidebar: FC<PropsType & WithStyles> = ({profile, status, classes, setUserStatus, isOwner, loadPhoto, profileIsLoading, followed}) => {
    const {photos, fullName, contacts} = profile;
    const userAvatar = photos.large !== null ? photos.large : userPlaceholder;
    const [contactsArr, setContactsArr] = useState<Array<ContactsArrType>>([]);
    const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);

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

    const openDialog = (open: boolean, type: 'edit' | 'confirm') => {
        switch (type) {
            case 'edit':
                setPhotoDialogOpen(open);
                break;
            case 'confirm':
                setDeleteDialogIsOpen(open);
                break;
        }
    };

    const removePhoto = () => {
        fetch(userPlaceholder)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'new-avatar.png', {type: 'image/png'});
                loadPhoto(file);
            });
    };

    return (
        <>
            {isOwner &&
            <>
                <LoadPhotoDialog profile={profile} open={photoDialogOpen} handleClose={() => openDialog(false, 'edit')}
                                 loadPhoto={loadPhoto}/>
                <ConfirmDialog
                    isOpen={deleteDialogIsOpen}
                    openDialog={openDialog}
                    confirmAction={removePhoto}
                />
            </>
            }
            <Paper className={classes.paper}>
                <div className={classes.body}>
                    <div className={classes.avatar}>
                        {isOwner && !profileIsLoading &&
                        <>
                            <IconButton className={classes.avatarBtn} aria-label="load-photo"
                                        onClick={() => openDialog(true, 'edit')}>
                                <AddAPhotoIcon fontSize="small" className={classes.avatarIcon}/>
                            </IconButton>
                            <IconButton className={classNames(classes.avatarBtn, classes.removeBtn)}
                                        aria-label="remove-photo"
                                        onClick={() => openDialog(true, 'confirm')}>
                                <DeleteIcon fontSize="small" className={classes.avatarIcon}/>
                            </IconButton>
                        </>
                        }
                        {profileIsLoading ?
                            <Skeleton animation="wave" variant="circle" className={classes.avatarImg}/>
                            : <Avatar src={userAvatar} alt={fullName ? fullName : 'avatar'}
                                      className={classes.avatarImg}/>
                        }

                    </div>
                    {
                        profileIsLoading ?
                            <>
                                <Skeleton animation="wave" width="85%"
                                          className={classNames(classes.autoMargin, "MuiTypography-h6")}/>
                                <Skeleton animation="wave" width="60%"
                                          className={classNames(classes.autoMargin, "MuiTypography-body1")}/>
                            </>
                            :
                            <>
                                <Typography variant="h6">{fullName}</Typography>
                                <ProfileStatus status={status} setUserStatus={setUserStatus} isOwner={isOwner}/>
                            </>
                    }

                </div>

                <Hidden lgUp>
                    <ProfileActions
                        isOwner={isOwner}
                        profileIsLoading={profileIsLoading}
                        userId={profile.userId}
                        followed={followed}
                    />
                </Hidden>

                <List aria-label="socials" disablePadding={true} className={classes.socials} component="div">
                    {
                        contactsArr.map(({name, url}: { name: any, url: string }) =>
                            <Fragment key={name}>
                                <Hidden mdDown>
                                    <Divider orientation='horizontal' light={true}/>
                                </Hidden>
                                {profileIsLoading ?
                                    <div className={classNames(classes.socialsItem, 'MuiListItem-gutters')}>
                                        <Skeleton animation="wave" height={41} style={{minWidth: 25}}/>
                                    </div> :
                                    <ListItem button component={Link} href={url} target="_blank"
                                              rel="noopener noreferrer"
                                              className={classes.socialsItem}>
                                        <SocialIcon name={name}
                                                    className={classNames(`${classes.socialsIcon}`, `${name}`)}/>
                                        <Typography variant="body2" noWrap
                                                    className={classes.socialsText}>{url}</Typography>
                                    </ListItem>
                                }
                            </Fragment>
                        )
                    }
                </List>
            </Paper>
        </>
    )
};

export default compose(
    withSidebarStyles,
)(Sidebar) as FC<PropsType>;

