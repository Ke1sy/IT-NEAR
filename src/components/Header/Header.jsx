import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './header.module.scss';

const Header = ({userId, login, logout, isAuth}) => {
  return (
      <header className={classes.header}>
          <div>
              <NavLink to="/">
                  <img src="https://s1.logaster.com/static/v3/img/products/logo.png" alt="" className={classes.logo}/>
              </NavLink>
          </div>
        <div className={classes.login}>
            {
                isAuth &&
                    <>
                        <NavLink to={`/profile/${userId}`} className={classes.login__link} activeClassName={classes.active}>Welcome, {login}</NavLink>
                        <button onClick={() => logout()}>Logout</button>
                    </>
            }

            {
                !isAuth &&  <NavLink to="/login" className={classes.login__link} activeClassName={classes.active}>Login</NavLink>
            }
        </div>
      </header>
      )
};

export default Header;
