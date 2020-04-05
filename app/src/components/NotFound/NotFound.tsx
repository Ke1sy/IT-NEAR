import React from 'react';
import styles from './not-found.module.scss';
import errorImg from '../../assets/images/404.png';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <img src={errorImg} alt=""/>
        </div>
    )
};

export default NotFound;
