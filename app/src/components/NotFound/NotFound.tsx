import React from 'react';
import styles from './not-found.module.scss';
import errorImg from '../../assets/images/404.png';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <div className={styles.notFoundImg}>
                <img src={errorImg} alt=""/>
            </div>

        </div>
    )
};

export default NotFound;
