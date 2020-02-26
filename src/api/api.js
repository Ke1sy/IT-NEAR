import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
       "API-KEY": "0cd66f02-e607-46e0-aed7-5f9c57c49533"
    }
});

export const usersAPI = {
    getUsers: (currentPage, pageSize) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },

    followUser: (id) => {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },

    unfollowUser: (id) => {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },

};

export const authAPI = {
    auth: () => {
        return instance.get('auth/me')
            .then(response => response.data)
    }
};

export const profileAPI = {
    getProfile: (id) => {
        return instance.get(`profile/${id}`)
            .then(response => response.data);
    }
};
