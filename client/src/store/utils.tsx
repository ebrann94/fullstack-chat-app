import React, { createContext, useReducer, Reducer, Context } from 'react';

type AppContext<StateType> = Context<{ state: StateType, dispatch: any}>

export function createStoreAndProvider<StateType>(reducer: Reducer<StateType, any>, initialState: StateType): 
    [AppContext<StateType> , Function] 
{
    
    const context: AppContext<StateType> = createContext({
        state: initialState,
        dispatch: null
    });

    const Provider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
        const [ state, dispatch ] = useReducer(reducer, initialState);

        const thunk = action => {
            if (typeof action === 'function') {
                action(dispatch);
            } else {
                dispatch(action);
            }
        }

        return (
            <context.Provider value={{ state, dispatch: thunk }}>
                { children }
            </context.Provider>
        )
    }

    return [ context, Provider ];
}

export const combineReducers = (reducers: any) => {
    return (state: any, action: any) => {
        const newState: any = {};

        for (let key in state) {
            newState[key] = reducers[key](state[key], action);
        }

        return newState;
    }
}