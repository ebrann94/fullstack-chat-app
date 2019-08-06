export interface ReducerStateInterface {

}

export const reducerInitialState: ReducerStateInterface = null;

export const reducer = (state: ReducerStateInterface, action: any): ReducerStateInterface => {
    switch (action.type) {
        default:
            return state;
    }
}