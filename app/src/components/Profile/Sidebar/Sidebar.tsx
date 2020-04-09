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
    Link, IconButton, WithWidth, isWidthDown, isWidthUp,
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
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import LoadPhotoDialog from "../Dialogs/LoadPhotoDialog";
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from "../Dialogs/DeleteDialog";
import withWidth from '@material-ui/core/withWidth';
import {compose} from "redux";
import ProfileActions from "./ProfileActions";

type PropsType = {
    status: string,
    profile: ProfileType,
    setUserStatus: (status: string) => void,
    isOwner: boolean,
    loadPhoto: (photo: any) => void,
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

const Sidebar: FC<PropsType & WithStyles & WithWidth> = ({profile, status, classes, setUserStatus, isOwner, loadPhoto, width}) => {
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

    const openDialog = (open: boolean, type: 'edit' | 'delete') => {
        switch (type) {
            case 'edit':
                setPhotoDialogOpen(open);
                break;
            case 'delete':
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
                <DeleteDialog
                    isOpen={deleteDialogIsOpen}
                    openDialog={openDialog}
                    deleteAction={removePhoto}
                />
            </>
            }
            <Paper className={classes.paper}>
                <div className={classes.body}>
                    <div className={classes.avatar}>
                        {isOwner &&
                        <>
                            <IconButton className={classes.avatarBtn} aria-label="load-photo"
                                        onClick={() => openDialog(true, 'edit')}>
                                <AddAPhotoIcon fontSize="small" className={classes.avatarIcon}/>
                            </IconButton>
                            <IconButton className={classNames(classes.avatarBtn, classes.removeBtn)}
                                        aria-label="remove-photo"
                                        onClick={() => openDialog(true, 'delete')}>
                                <DeleteIcon fontSize="small" className={classes.avatarIcon}/>
                            </IconButton>
                        </>
                        }
                        <Avatar src={userAvatar} alt={fullName ? fullName : 'avatar'} className={classes.avatarImg}/>
                    </div>
                    <Typography variant="h6">{fullName}</Typography>
                    <ProfileStatus status={status} setUserStatus={setUserStatus} isOwner={isOwner}/>
                </div>
                {
                    isWidthDown('md', width) &&
                    <ProfileActions isOwner={isOwner}/>
                }
                <List aria-label="socials" disablePadding={true} className={classes.socials} component="div">
                    {
                        contactsArr.map(({name, url}: { name: any, url: string }) =>
                            <Fragment key={name}>
                                {
                                    isWidthUp('lg', width) &&
                                    <Divider orientation='horizontal' light={true}/>
                                }
                                <ListItem button component={Link} href={url} target="_blank" rel="noopener noreferrer" className={classes.socialsItem}>
                                    <SocialIcon name={name}
                                                className={classNames(`${classes.socialsIcon}`, `${name}`)}/>
                                    <Typography variant="body2" noWrap className={classes.socialsText}>{url}</Typography>
                                </ListItem>
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
    withWidth()
)(Sidebar) as FC<PropsType>;

