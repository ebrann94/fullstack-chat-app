import { useContext } from 'react';
import { createStoreAndProvider, combineReducers } from './utils';
import { chatReducer, Room } from './chat-reducer';

// Rooms state
// Array of room

interface IAppState {
    chat: Room[]
}

const combinedReducer = combineReducers({
    chat: chatReducer
})

const initialState = {
    chat: []
}

const [AppContext, AppContextProvider] = createStoreAndProvider<IAppState>(combinedReducer, initialState);

const useAppContext = () => useContext(AppContext);

const useMapState = (func: Function) => {
    const { state } = useContext(AppContext)

    return func !== undefined ? func(state) : state
}

export {
    AppContext,
    AppContextProvider,
    useAppContext
}