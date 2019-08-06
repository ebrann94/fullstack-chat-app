import { createStoreAndProvider } from './utils';
import { reducer, reducerInitialState, ReducerStateInterface } from './reducer';

interface AppState {

}

const [AppContext, AppContextProvider] = createStoreAndProvider<any>(reducer, reducerInitialState);

export {
    AppContext,
    AppContextProvider
}