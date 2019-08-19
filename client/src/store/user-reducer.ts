export interface IUserState {
    username: string,
    currentViewedRoom: string
}

export const userInitialState: IUserState = {
    username: '',
    currentViewedRoom: ''
} 

export const userReducer = (state: IUserState, action : any):IUserState => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.username
            }
        case 'SET_CURRENT_VIEWED_ROOM':
            return {
                ...state,
                currentViewedRoom: action.room
            }
        default:
            return state
    }
}