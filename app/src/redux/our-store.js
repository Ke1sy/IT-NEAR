import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {
                    id: 1,
                    text: 'Post 1 text',
                    likesCount: 2
                }, {
                    id: 2,
                    text: 'Post 2 text',
                    likesCount: 0
                }, {
                    id: 3,
                    text: 'Post 3 text',
                    likesCount: 7
                }
            ],
            newPostText: ''
        },
        messagesPage: {
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
        },
    },
    _callSubscriber() {
        console.log('smth changed')
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._callSubscriber(this._state);
    }
};



export default store;