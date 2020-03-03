import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "0cd66f02-e607-46e0-aed7-5f9c57c49533",
        // "API-KEY": "eaba6ef0-ee77-455f-be6e-bf5d2c5dc4d6"
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
    },

    login: (email, password, rememberMe, captcha) => {
        return instance.post('/auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },

    logout: () => {
        return instance.delete('/auth/login')
            .then(response => response.data)
    }
};

export const profileAPI = {
    getProfile: (id) => {
        return instance.get(`profile/${id}`)
            .then(response => response.data);
    },

    getStatus: (id) => {
        return instance.get(`profile/status/${id}`)
            .then(response => response.data);
    },

    setStatus: (status) => {
        return instance.put(`profile/status`, {status})
            .then(response => response.data);
    },

    loadPhoto: (photoFile) => {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data);
    },

    setProfileInfo: (info) => {
        const  {aboutMe, facebook, github, instagram, twitter, vk, lookingForAJob, lookingForAJobDescription, fullName} = info;
        return instance.put(`profile`, {
            "aboutMe": aboutMe,
            "contacts": {
                facebook: facebook,
                github: github,
                instagram: instagram,
                mainLink: null,
                twitter: twitter,
                vk: vk,
                website: null,
                youtube: null
            },
            "lookingForAJob": lookingForAJob,
            "lookingForAJobDescription": lookingForAJobDescription,
            "fullName": fullName
        })
            .then(response => response.data);
    }
};