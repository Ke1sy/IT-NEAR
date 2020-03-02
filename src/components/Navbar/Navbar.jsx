import React from 'react';
import styles from './navbar.module.scss';
import {NavLink} from "react-router-dom";

const LINKS = [
    {
        id: 1,
        text: 'My Profile',
        url: '/profile'
    }, {
        id: 2,
        text: 'Messages',
        url: '/messages'
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
    }, {
        id: 6,
        text: 'Profile Settings',
        url: '/settings'
    },
];

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            {LINKS.map(({id, text, url}) => (
                <div className={styles.nav__item} key={id}>
                    <NavLink to={url} className={styles.nav__link} activeClassName={styles.active}>
                        {text}
                    </NavLink>
                </div>
            ))}
        </nav>
    )
};


export default Navbar;