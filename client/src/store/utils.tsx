import React, { createContext, useReducer, useRef, Reducer, Context } from 'react';

// type AppContext<StateType> = Context<[{ state: StateType, dispatch: any }]>
type AppContext<StateType> = Context<[StateType, any ]>

export function createStoreAndProvider<StateType>(reducer: Reducer<StateType, any>, initialState: StateType): 
    [AppContext<StateType> , Function] 
{
    
    const context: AppContext<StateType> = createContext([ initialState, null ]);

    const Provider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
        const [ state, dispatch ] = useReducer(reducer, initialState);

        const stateRef = useRef(state)
        stateRef.current = state
        const getState = () => stateRef.current

        const thunk = (action: any) => {
            if (typeof action === 'function') {
                action(dispatch, getState);
            } else {
                dispatch(action);
            }
        }

        return (
            <context.Provider value={[ state, thunk]}>
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