import { useContext } from 'react';
import { createStoreAndProvider, combineReducers } from './utils';
import { chatReducer, Room } from './chat-reducer';
import { userReducer, userInitialState, IUserState } from './user-reducer'

interface AppState {
    chat: Room[],
    user: IUserState
}

const initialState = {
    chat: [],
    user: userInitialState
}

const [AppContext, AppContextProvider] = createStoreAndProvider<AppState>(
    combineReducers({
        chat: chatReducer,
        user: userReducer
    }), 
    initialState
);

const useAppContext = (func?: Function) => {
    const context = useContext(AppContext)

    if (typeof func === 'undefined' && typeof func !== 'function') {
        return context
    }

    const [ state, dispatch ] = context
    return [func(state), dispatch]
};

export {
    AppContext,
    AppContextProvider,
    useAppContext
}