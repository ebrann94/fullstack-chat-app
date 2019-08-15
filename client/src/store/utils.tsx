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

        const thunk = (action: any) => {
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
        return Object.keys(reducers).reduce((nextState: any, key) => {
            nextState[key] = reducers[key](state[key], action)
            return nextState
        }, {})
    }
}