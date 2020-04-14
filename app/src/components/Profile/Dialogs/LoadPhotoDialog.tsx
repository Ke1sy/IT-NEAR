import React, {useEffect, useState, FC, ChangeEvent, useRef} from 'react';
import {Tooltip, Typography, Button, WithStyles} from "@material-ui/core";
import {ProfileType} from "../../../redux/reducers/types";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import {Alert} from "@material-ui/lab";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SimpleDialogTemplate from "../Dialogs/SimpleDialogTemplate";
import {getCroppedImg} from '../../../utils/crop';
import withLoadPhotoStyles from "./loadPhotoDialogStyles";

type PropsType = {
    profile: ProfileType
    loadPhoto: (photo: any) => void
    open: boolean,
    handleClose: () => void,
}

type Crop = {
    aspect?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    unit?: 'px' | '%';
}

const LoadPhotoDialog: FC<PropsType & WithStyles> = ({profile, open, handleClose, loadPhoto, classes}) => {
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
            <Alert severity="warning" className={classes.message}>Crop the image or it will be done automatically</Alert>
            }
        </SimpleDialogTemplate>
    )
};

export default withLoadPhotoStyles(LoadPhotoDialog);