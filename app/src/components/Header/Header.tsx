import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import classes from './header.module.scss';

type PropsType = {
    userId: number | null,
    login: string | null,
    isAuth: boolean,
    logout: (history: any) => void
    history: any
}

const Header: FC<PropsType> = ({userId, login, logout, isAuth, history}) => {
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
                        <button onClick={() => logout(history)}>Logout</button>
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