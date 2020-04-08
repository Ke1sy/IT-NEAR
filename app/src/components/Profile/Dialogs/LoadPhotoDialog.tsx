import React, {useEffect, useState, FC, ChangeEvent, useRef} from 'react';
import { makeStyles, Tooltip, Typography, Button} from "@material-ui/core";
import {ProfileType} from "../../../redux/reducers/types";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import {Alert} from "@material-ui/lab";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SimpleDialogTemplate from "../Dialogs/SimpleDialogTemplate";
import {getCroppedImg} from '../../../utils/crop';

type PropsType = {
    profile: ProfileType
    loadPhoto: (photo: any) => void
    open: boolean,
    handleClose: () => void,
}

const useStyles = makeStyles(theme => ({
    photo: {
        position: 'relative',
        textAlign: 'center',

        '& .ReactCrop__image': {
            maxHeight: 250
        }
    },
    load: {
        display: 'block',
        width: '100%',
        backgroundColor: '#eee',
        border: `1px dashed ${theme.palette.primary.main}`,
        marginBottom: 20,
        borderRadius: 4
    },
    loadContent: {
        display: 'flex',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadInput: {
        display: 'none'
    },
    loadIcon: {
        marginRight: 10
    },
    message: {
        marginTop: 15
    }
}));

type Crop = {
    aspect?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    unit?: 'px' | '%';
}

const LoadPhotoDialog: FC<PropsType> = ({profile, open, handleClose, loadPhoto}) => {
    const classes = useStyles();
    const [imgSrc, setImgSrc] = useState<any>(null);
    const [imgRef, setImgRef] = useState<any>(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState<any>(null);
    const [fileLoaded, setFileLoaded] = useState(false);
    const [crop, setCrop] = useState<any>({
        aspect: 1,
    });
    let inputFile: any = useRef(null);


    useEffect(() => {
        toDefaultState();
        if (inputFile.current) {
            inputFile.current.value = null
        }
    }, [open]);

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        toDefaultState();
        const {target: {files}} = e;
        if (files) {
            setFileLoaded(true);
            const selectedFile = files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => setImgSrc(reader.result));
            reader.readAsDataURL(selectedFile);
        }
    };

    const onCropComplete = (crop: Crop) => {
        makeClientCrop(crop);
    };

    const onImageLoaded = (image: HTMLImageElement) => {
        setImgRef(image);
    };

    const onCropChange = (crop: Crop) => {
        setCrop(crop);
    };

    const toDefaultState = () => {
        URL.revokeObjectURL(croppedImageUrl);
        setImgSrc(null);
        setImgRef(null);
        setFileLoaded(false);
        setCroppedImageUrl(null);
        setCrop({
            aspect: 1,
        });
    };

    const makeClientCrop = async (crop: Crop) => {
        if (imgRef && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imgRef,
                crop,
                'newFile.jpeg'
            );
            setCroppedImageUrl(croppedImageUrl);
        }
    };

    const updateAvatar = async () => {
        if(croppedImageUrl) {
            fetch(croppedImageUrl, {mode: "cors"})
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], 'new-avatar.png', {type: 'image/png'});
                    loadPhoto(file);
                });
        } else {
            if (inputFile.current) {
                const files = inputFile.current.files;
                if (files.length) {
                    loadPhoto(files[0]);
                }
            }
        }
        handleClose();
    };

    return (
        <SimpleDialogTemplate
            open={open}
            resetAction={handleClose}
            submitAction={updateAvatar}
            submitName="Save"
            submitDisabled={!fileLoaded}
            aria-labelledby="load-photo-dialog"
            title="Load Photo"
        >
            <label className={classes.load}>
                <input type="file" name="photo" ref={inputFile} onChange={onSelectFile} accept=".jpg, .jpeg, .png"
                       className={classes.loadInput}/>
                <Tooltip title=".jpg, .jpeg, .png" aria-label="Extensions">
                    <Button component="span" className={classes.loadContent}>
                        <AddAPhotoIcon color="primary" className={classes.loadIcon}/>
                        <Typography variant="subtitle2" color="primary">Upload</Typography>
                    </Button>
                </Tooltip>
            </label>
            <div className={classes.photo}>
                {imgSrc &&
                <ReactCrop
                    src={imgSrc}
                    crop={crop}
                    ruleOfThirds
                    onImageLoaded={onImageLoaded}
                    onComplete={onCropComplete}
                    onChange={onCropChange}
                />
                }
            </div>
            {imgSrc && !croppedImageUrl &&
            <Alert severity="warning" className={classes.message}>Crop the image</Alert>
            }
        </SimpleDialogTemplate>
    )
};

export default LoadPhotoDialog;