const RM = {
    home: {
        path: '/'
    },
    profile: {
        path: '/profile/:id?',
        getPath: (id: number | null) => {
            return id ? `/profile/${id}` : '/profile'
        }
    },
    settings: {
        path: '/settings'
    },
    dialogs: {
        path: '/dialogs/:id?',
        getPath: (id: number | null) => {
            return id ? `/dialogs/${id}` : '/dialogs'
        }
    },
    login: {
        path: '/login'
    },
    users: {
        path: '/users'
    },
};
export default RM;