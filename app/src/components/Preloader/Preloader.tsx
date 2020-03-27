import React, {FC, ReactNode} from 'react';
import styles from './preloader.module.scss';
import {CircularProgress} from "@material-ui/core";

type PropsType = {
    showPreloader: boolean,
    children?: ReactNode
}

const Preloader: FC<PropsType> = ({showPreloader, children}) => {
    return (
        <div className={styles.preloader}>
            {showPreloader &&
                <div className={styles.preloader__icon}>
                    <CircularProgress color="secondary"/>
                </div>
            }

            {children && children}
        </div>
    )
};

export default Preloader;