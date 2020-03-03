import {reset} from "redux-form";
import {dialogsAPI} from "../../api/api";

const SET_DIALOGS = 'dialogs/SET_DIALOGS';
const SET_MESSAGES = 'dialogs/SET_MESSAGES';

const initialState = {
    dialogs: [],
    messages: [],
};

const dialogsReducer = (state = initialState, {type, messages, dialogs}) => {
    switch (type) {
        case SET_DIALOGS:
            return {...state, dialogs};
        case SET_MESSAGES:
            return {...state, messages};
        default:
            return state;
    }
};

export const setDialogs = (dialogs) => ({type: SET_DIALOGS, dialogs});
export const setMessages = (messages) => ({type: SET_MESSAGES, messages});


export const getDialogs = () => async (dispatch) => {
    const response = await dialogsAPI.getDialogs();
    dispatch(setDialogs(response));
};

export const startChat = (userId, history) => async (dispatch) => {
    const {resultCode} = await dialogsAPI.startChat(userId);
    if(resultCode === 0) {
        history.push(`/dialogs/${userId}`)
    }
};

export const sendMessage = (userId, message) => async (dispatch) => {
    const response = await dialogsAPI.sendMessage(userId, message);
    if(response.resultCode === 0) {
        dispatch(getMessages(userId));
        dispatch(reset('message'));
    }
};

export const getMessages = (userId) => async (dispatch) => {
    const {error, items} = await dialogsAPI.getMessages(userId);
    if(!error) {
        dispatch(setMessages(items));
    }
};

export default dialogsReducer;