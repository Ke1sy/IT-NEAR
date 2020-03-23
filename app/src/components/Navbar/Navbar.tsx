import React, {FC} from 'react';
import styles from './navbar.module.scss';
import {NavLink} from "react-router-dom";

const LINKS = [
     {
        id: 2,
        text: 'Dialogs',
        url: '/dialogs'
    }, {
        id: 3,
        text: 'News',
        url: '/news'
    }, {
        id: 4,
        text: 'Music',
        url: '/music'
    }, {
        id: 5,
        text: 'Users',
        url: '/users'
    }
];

type PropsType = {
    newMessagesCount: null | number
}

const Navbar: FC<PropsType> = ({newMessagesCount}) => {
    let notNull = newMessagesCount !== null && newMessagesCount > 0;
    return (
        <nav className={styles.nav}>
            {LINKS.map(({id, text, url}) => (
                <div className={styles.nav__item} key={id}>
                    <NavLink to={url} className={styles.nav__link} activeClassName={styles.active}>
                        {text}
                        {url === '/dialogs' && notNull && <span> ({newMessagesCount})</span>}
                    </NavLink>
                </div>
            ))}
        </nav>
    )
};


export default Navbar;