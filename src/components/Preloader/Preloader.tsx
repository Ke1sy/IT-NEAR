import React, {FC, ReactNode} from 'react';
import styles from './preloader.module.scss';
import preloader from "../../assets/images/preloader.gif";

type PropsType = {
    showPreloader: boolean,
    children?: ReactNode
}

const Preloader: FC<PropsType> = ({showPreloader, children}) => {
    return (
        <div className={styles.preloader}>
            {showPreloader &&
                <div className={styles.preloader__icon}>
                    <img src={preloader} alt=""/>
                </div>
            }

            {children && children}
        </div>
    )
};

export default Preloader;