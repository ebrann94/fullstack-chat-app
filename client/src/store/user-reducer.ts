interface IUserState {
    username: string,
    currentViewedRoom: string
}

export const initialState: IUserState = {
    username: '',
    currentViewedRoom: ''
} 

export const UserReducer = (state: IUserState, action : any):IUserState => {
    switch (action.type) {
        default:
            return state
    }
}