import { SendMessageData } from '../../../shared-types/types'
import { Room, Message } from './chat-reducer';
import ChatAPI from '../api/api'

export const addMessage = (roomName: string, message: Message) => {
    return {
        type: 'ADD_MESSAGE',
        payload: {
            message,
            roomName
        }
    }
}

export const addRoom = (room: any) => {
    return {
        type: 'ADD_ROOM',
        room : {
            name: room.name,
            messages: [],
            users: room.users
        }
    }
}

export const deleteRoom = (roomId: string) => {
    return {
        type: 'DELETE_ROOM',
        roomId
    }
}

export const sendMessage = (room: string, text: string) => {
    return (dispatch: any, getState: Function)=> {
        const data: SendMessageData = {
            text,
            room,
            author: getState().user.username
        }

        ChatAPI.sendMessage(data)
    }
}

export const joinRoom = (roomName: string, user: string) => {
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
            dispatch(addMessage(room, message))
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

export const subscribeToRoomUpdates = (room: string) => {
    return (dispatch: any) => {
        ChatAPI.subscribeToRoomUpdates(room, (updates: any) => {
            dispatch(addUserToRoom(room, updates.user))
        })
    }
}