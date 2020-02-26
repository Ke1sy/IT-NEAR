import {ADD_MESSAGE, UPDATE_NEW_MESSAGE_TEXT} from "../constants";

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
    newMessageText: ''
};

const dialogsReducer = (state = initialState, {type, message}) => {
    switch (type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: message};
        case ADD_MESSAGE:
            const newMessages = [...state.messages, {
                id: 5,
                message: state.newMessageText
            }];
            return {...state, newMessageText: '', messages: newMessages};
        default:
            return state;
    }
};

export const updateNewMessageTextActionCreator = message => ({type: UPDATE_NEW_MESSAGE_TEXT, message});
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});

export default dialogsReducer;