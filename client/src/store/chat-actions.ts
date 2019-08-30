import { SendMessageData } from '../../../shared-types/types'
import { Room, Message } from './chat-reducer';
import ChatAPI from '../api/api'

export const addMessage = (message: any) => {
    return {
        type: 'ADD_MESSAGE',
        payload: {
            message,
            roomName: message.room
        }
    }
}

export const addRoom = ({ name, users }: any) => {
    return {
        type: 'ADD_ROOM',
        room : {
            name,
            users,
            messages: new Array(0),
        }
    }
}

export const deleteRoom = (roomId: string) => {
    return {
        type: 'DELETE_ROOM',
        roomId
    }
}

export const sendMessage = (text: string) => {
    return (dispatch: any, getState: Function)=> {
        const state = getState()
        const data: SendMessageData = {
            text,
            room: state.user.currentViewedRoom,
            author: state.user.username
        }

        ChatAPI.sendMessage(data)
    }
}

export const joinRoom = (roomName: string) => {
    return (dispatch: Function, getState: Function) => {
        const { username } = getState().user

        ChatAPI.joinRoom(roomName, username, (res: any) => {
            if (!res.error) {
                dispatch(addRoom(res.room))
            }
        })
    }
}

export const subscribeToMessages = (room: string) => 
    (dispatch: any) => {
        ChatAPI.subscribeToMessages((message: Message) => {
            dispatch(addMessage(message))
        })
    }

const addUserToRoom = (room: string, user: string) => {
    return {
        type: 'ADD_USER',
        payload: {
            room, 
            user
        }
    }
}

export const subscribeToRoomUpdates = () => {
    return (dispatch: any) => {
        ChatAPI.subscribeToRoomUpdates((res: any) => {
            dispatch(addUserToRoom(res.room, res.user))
        })
    }
}