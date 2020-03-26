import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";
import authReducer from "./reducers/auth-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./reducers/app-reducer";
import usersReducer from "./reducers/users-reducer";
import createSagaMiddleware from 'redux-saga'
import mySaga from "./sagas/saga";

const rootReducer = combineReducers({
    profileReducer,
    dialogsReducer,
    usersReducer,
    authReducer,
    app: appReducer,
    form: formReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType =  ReturnType<RootReducerType>;
const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(
        thunkMiddleware,
        sagaMiddleware
    )
));

sagaMiddleware.run(mySaga);

export default store;