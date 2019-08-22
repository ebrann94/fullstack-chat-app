import { ActionSheetIOS } from "react-native";

export interface IUserState {
    username: string,
    usernameError: boolean,
    currentViewedRoom: string,
    availableRooms: string[]
}

export const userInitialState: IUserState = {
    username: '',
    usernameError: false,
    currentViewedRoom: '',
    availableRooms: []
} 

export const userReducer = (state: IUserState, action : any):IUserState => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.username,
                usernameError: false
            }
        case 'SET_CURRENT_VIEWED_ROOM':
            return {
                ...state,
                currentViewedRoom: action.room
            }
        case 'ADD_ROOM':
            return {
                ...state,
                currentViewedRoom: action.room.name
            }
        case 'SET_AVAILABLE_ROOMS':
            return {
                ...state,
                availableRooms: action.payload
            }
        case 'USERNAME_ERROR':
            return {
                ...state,
                usernameError: true
            }
        case 'SET_USERNAME_AND_ADD_ROOM':
            return {
                ...state,
                username: action.username,
                usernameError: false
            }
        default:
            return state
    }
}