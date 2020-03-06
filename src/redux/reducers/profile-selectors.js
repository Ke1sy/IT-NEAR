export const getProfile = (state) => {
    return state.profileReducer.users
};

export const getStatus = (state) => {
    return state.profileReducer.status
};