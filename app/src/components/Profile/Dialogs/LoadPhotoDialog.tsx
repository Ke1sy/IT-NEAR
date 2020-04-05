import React, {useEffect, useState, FC, ChangeEvent, FormEvent, useRef} from 'react';
import {Avatar, IconButton, makeStyles, Chip, Tooltip} from "@material-ui/core";
import SimpleDialogTemplate from "../Dialogs/SimpleDialogTemplate";
import {ProfileType} from "../../../redux/reducers/types";
import userPlaceholder from "../../../assets/images/user-placeholder.png";
import GetAppIcon from '@material-ui/icons/GetApp';

type PropsType = {
    profile: ProfileType
    loadPhoto: (photo: any) => void
    open: boolean,
    handleClose: () => void,
}

const useStyles = makeStyles(theme => ({
    photo: {
        width: 250,
        height: 250,
        borderRadius: '50%',
        margin: '0 auto 16px',
        position: 'relative',
    },
    photoImg: {
        height: '100%',
        width: '100%',
        border: `3px solid ${theme.palette.primary.main}`,
    },
    load: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 2,
    },
    loadBtn: {
        border: `2px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        transition: '150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&:hover': {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.primary.main,
        }
    },
    loadInput: {
        display: 'none'
    },
    chipWrapper: {
        display: 'flex',
        justifyContent: 'center',
        margin: '15px 0'
    },
    chipItem: {
        maxWidth: '100%'
    }
}));

const LoadPhotoDialog: FC<PropsType> = ({profile, open, handleClose, loadPhoto}) => {
    const [photo, setPhoto] = useState<string | null>(null);
    const [photoName, setPhotoName] = useState<string | null>(null);
    const [fileRequiredError, setFileRequiredError] = useState(true);
    const classes = useStyles();
    let inputFile: any = useRef(null);

    useEffect(() => {
        toDefaultState();
    }, [open]);

    const photoPreview = (e: ChangeEvent<HTMLInputElement>) => {
        const {target: {files}} = e;
        if (files) {
            setFileRequiredError(false);
            const selectedFile = files[0];
            setPhoto(URL.createObjectURL(selectedFile));
            setPhotoName(selectedFile.name);
        } else {
            setFileRequiredError(true);
        }
    };

    const toDefaultState = () => {
        setPhoto(profile.photos.large);
        setFileRequiredError(true);
        setPhotoName(null);
        if (inputFile.current) {
            inputFile.current.value = null
        }
    };

    const closeAndClear = () => {
        handleClose();
        toDefaultState();
    };

    const updateAvatar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputFile.current) {
            const files = inputFile.current.files;
            if (files.length) {
                loadPhoto(files[0]);
                closeAndClear();
            }
        }
    };

    return (
        <SimpleDialogTemplate
            open={open}
            resetAction={closeAndClear}
            submitAction={updateAvatar}
            submitName="Save"
            submitDisabled={fileRequiredError}
            aria-labelledby="load-photo-dialog"
            title="Load Photo"
        >
            <div className={classes.photo}>
                <Avatar src={photo || userPlaceholder} alt={profile.fullName ? profile.fullName : 'avatar'}
                        className={classes.photoImg}/>
                <label className={classes.load}>
                    <input type="file" name="photo" ref={inputFile} onChange={photoPreview} accept=".jpg, .jpeg, .png"
                           className={classes.loadInput}/>
                    <Tooltip title=".jpg, .jpeg, .png" aria-label="Extensions">
                        <IconButton component="span" className={classes.loadBtn} aria-label="load-photo">
                            <GetAppIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </label>
            </div>
            {photoName &&
            <div className={classes.chipWrapper}>
                <Chip label={photoName} onDelete={toDefaultState} color="primary" variant="outlined" className={classes.chipItem}/>
            </div>
            }
        </SimpleDialogTemplate>
    )
};

export default LoadPhotoDialog;

