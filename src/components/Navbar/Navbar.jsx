import React from 'react';
import styles from './navbar.module.scss';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

const LINKS = [
    {
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
        text: 'Settings',
        url: '/settings'
    },
];
const Navbar = (props) => {
    let {userId} = props;
    return (
        <nav className={styles.nav}>
            <div className={styles.nav__item}>
                <NavLink to={`/profile/${userId}`} className={styles.nav__link} activeClassName={styles.active}>
                    My Profile
                </NavLink>
            </div>

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

const mapStateToProps = ({authReducer: {userId}}) => {
    return {
        userId,
    }
};

export default connect(mapStateToProps)(Navbar);
