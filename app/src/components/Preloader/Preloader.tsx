import React, {FC, ReactNode} from 'react';
import {CircularProgress, WithStyles} from "@material-ui/core";
import withPreloaderStyles from "./preloaderStyles";

type PropsType = {
    showPreloader: boolean,
    children?: ReactNode
}

const Preloader: FC<PropsType & WithStyles> = ({showPreloader, classes}) => {
    if (!showPreloader) {
        return null
    }
    return (
        <div className={classes.preloader}>
            {showPreloader &&
                <CircularProgress color="secondary"/>
            }
        </div>
    )
};

export default withPreloaderStyles(Preloader);