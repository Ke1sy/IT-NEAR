import {ADD_MESSAGE} from "../constants";
import {reset} from "redux-form";

const initialState = {
    dialogs: [
        {
            id: 1,
            name: 'Jack',
        }, {
            id: 2,
            name: 'Kristi'
        }, {
            id: 3,
            name: 'Jane'
        }, {
            id: 4,
            name: 'Noah'
        },
    ],
    messages: [
        {
            id: 1,
            message: 'Hello bro!'
        }, {
            id: 2,
            message: 'How are you?'
        }, {
            id: 3,
            message: 'How is your learning of react?'
        }, {
            id: 4,
            message: 'Message me, please. Miss You!'
        },
    ],
};

const dialogsReducer = (state = initialState, {type, message}) => {
    switch (type) {
        case ADD_MESSAGE:
            const newMessages = [...state.messages, {
                id: 5,
                message
            }];
            return {...state, newMessageText: '', messages: newMessages};
        default:
            return state;
    }
};

export const addMessageAC = (message) => ({type: ADD_MESSAGE, message});

export const addMessage = (message) => (dispatch) => {
    dispatch(addMessageAC(message));
    dispatch(reset('message'));
};

export default dialogsReducer;