import axios from "axios";
import {DialogsType, MessagesType, PhotosType, ProfileType} from "../redux/reducers/types";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "0cd66f02-e607-46e0-aed7-5f9c57c49533",
        // "API-KEY": "307f2912-e9c0-4353-94d4-d2c9532f00e0"
    }
});


export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaRequired = 10
}

type AuthResponseType = {
    resultCode: ResultCodes
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string
    }
}
type LoginResponseType = {
    resultCode: ResultCodes | ResultCodeForCaptcha
    messages: Array<string>,
    data: {
        userId: number,
    }
}

type WithoutDataResponseType = {
    resultCode: ResultCodes
    messages: Array<string>,
    data: {}
}

export const usersAPI = {
    getUsers: (currentPage: number, pageSize: number, searchText: string) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${searchText}`)
            .then(response => response.data);
    },

    isUserFollowed: (id: number) => {
        return instance.get<string>(`follow/${id}`)
            .then(response => response.data)
    },

    followUser: (id: number) => {
        return instance.post<WithoutDataResponseType>(`follow/${id}`)
            .then(response => response.data)
    },

    unfollowUser: (id: number) => {
        return instance.delete<WithoutDataResponseType>(`follow/${id}`)
            .then(response => response.data)
    },

};


export const authAPI = {
    auth: () => {
        return instance.get<AuthResponseType>('auth/me')
            .then(response => response.data)
    },

    login: (email: string, password: string, rememberMe: boolean, captcha: null | string = null) => {
        return instance.post<LoginResponseType>('/auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },

    logout: () => {
        return instance.delete<WithoutDataResponseType>('/auth/login')
            .then(response => response.data)
    }
};

type CaptchaResponseType = {
    url: string
}

export const securityAPI = {
    getCaptcha: () => {
        return instance.get<CaptchaResponseType>('security/get-captcha-url')
            .then(response => response.data)
    }
};

type LoadPhotoResponseType = {
    data: {
        photos: PhotosType,
    }
    resultCode: ResultCodes
    messages: Array<string>,
}

export const profileAPI = {
    getProfile: (id: number) => {
        return instance.get<ProfileType>(`profile/${id}`)
            .then(response => response.data);
    },

    getStatus: (id: number) => {
        return instance.get<string>(`profile/status/${id}`)
            .then(response => response.data);
    },

    setStatus: (status: string) => {
        return instance.put<WithoutDataResponseType>(`profile/status`, {status})
            .then(response => response.data);
    },

    loadPhoto: (photoFile: any) => {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<LoadPhotoResponseType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data);
    },

    updateProfileInfo: (info: ProfileType) => {
        return instance.put<WithoutDataResponseType>(`profile`, info)
            .then(response => response.data);
    }
};

type SendMessageResponseType = {
    data: {
        message: MessagesType
    }
    messages: Array<string>
    resultCode: ResultCodes
}

type GetMessagesResponseType = {
    items: Array<MessagesType>
    totalCount: number
    error: null | string
}

export const dialogsAPI = {
    getDialogs: () => {
        return instance.get<Array<DialogsType>>('dialogs')
            .then(response => response.data)
    },

    startChat: (userId: number) => {
        return instance.put<WithoutDataResponseType>(`dialogs/${userId}`)
            .then(response => response.data)
    },

    sendMessage: (userId: number, message: string) => {
        return instance.post<SendMessageResponseType>(`dialogs/${userId}/messages`, {body: message})
            .then(response => response.data)
    },

    getMessages: (userId: number) => {
        return instance.get<GetMessagesResponseType>(`dialogs/${userId}/messages`)
            .then(response => response.data)
    },

    spamMessage: (messageId: string) => {
        return instance.post<WithoutDataResponseType>(`dialogs/messages/${messageId}/spam`)
            .then(response => response.data)
    },

    deleteMessage: (messageId: string) => {
        return instance.delete<WithoutDataResponseType>(`dialogs/messages/${messageId}`)
            .then(response => response.data)
    },

    //from deleted and spam
    restoreMessage: (messageId: string) => {
        return instance.put<WithoutDataResponseType>(`dialogs/messages/${messageId}/restore`)
            .then(response => response.data)
    },

    newMessagesCount: () => {
        return instance.get<number>('dialogs/messages/new/count')
            .then(response => response.data)
    }
};