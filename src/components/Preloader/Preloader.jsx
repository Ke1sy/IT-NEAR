import React from 'react';
import styles from './preloader.module.scss';
import preloader from "../../assets/images/preloader.gif";

const Preloader = ({showPreloader, children}) => {
    return (
        <div className={styles.preloader}>
            {showPreloader &&
                <div className={styles.preloader__icon}>
                    <img src={preloader} alt=""/>
                </div>
            }
            {children}
        </div>
    )
};

export default Preloader;
