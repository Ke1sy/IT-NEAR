import React, {ComponentType} from "react";
const ProfileContainer = React.lazy(() => import(/* webpackChunkName: "ProfileContainer" */"./components/Profile/ProfileContainer"));
const MessagesContainer = React.lazy(() => import(/* webpackChunkName: "MessagesContainer" */"./components/Messages/MessagesContainer"));
const LoginContainer = React.lazy(() => import(/* webpackChunkName: "LoginContainer" */"./components/Login/LoginContainer"));
const UsersContainer = React.lazy(() => import(/* webpackChunkName: "UsersContainer" */"./components/Users/UsersContainer"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "Music" */"./components/NotFound/NotFound"));

type RouteValueType = {
    path: string,
    redirect?:  (isAuth?: boolean) => string,
    component?: ComponentType,
    getPath?: any
    exact?: boolean
}

type RouteType = {
    [key: string]: RouteValueType
};

const RM:RouteType = {
    home: {
        path: '/',
        exact: true,
        redirect: (isAuth?: boolean) => {
            return isAuth ? `/profile` : '/login'
        },
    },
    profile: {
        path: '/profile/:id?',
        component: ProfileContainer,
        exact: false,
        getPath: (id: number | null) => {
            return id ? `/profile/${id}` : '/profile'
        },
    },
    settings: {
        path: '/settings',
        exact: true,
        component: ProfileContainer,
    },
    dialogs: {
        path: '/dialogs/:id?',
        component: MessagesContainer,
        getPath: (id: number | null) => {
            return id ? `/dialogs/${id}` : '/dialogs'
        }
    },
    login: {
        path: '/login',
        exact: true,
        component: LoginContainer,
    },
    users: {
        path: '/users',
        exact: true,
        component: UsersContainer,
    },
    notFound: {
        path: '*',
        exact: false,
        component: NotFound,
    },
};

export default RM;