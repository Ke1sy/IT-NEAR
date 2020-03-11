
export type PostType = {
    id: number,
    text: string,
    likesCount: number
}

export type ProfileType = {
    aboutMe: string | null,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string,
    userId: number,
    photos: PhotosType
};

export type UpdatedProfileType = {
    aboutMe: string | null,
    facebook: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    github: string | null,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string,
}
export type ContactsType = {
    facebook: string | null,
    website: string | null,
    vk: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    github: string | null,
    mainLink: string | null
}

export type PhotosType = {
    small: string | null,
    large: string | null
}

export type UserType = {
    name: string,
    id: number,
    uniqueUrlName: null | string,
    photos: {
        small: null | string,
        large: null | string,
    },
    status: null | string,
    followed: boolean
};

export type DialogsType = {
    id: number,
    userName: string,
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number,
    photos: PhotosType
}

export type MessagesType = {
    id: string,
    body: string,
    translatedBody: any,
    addedAt: string,
    senderId: number,
    senderName: string,
    recipientId: number,
    viewed: boolean
}