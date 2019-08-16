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

export const addRoom = (room: string) => {
    return {
        type: 'ADD_ROOM',
        room : {
            id: '1234',
            name: room,
            messages: []
        }
    }
}

export const deleteRoom = (roomId: string) => {
    return {
        type: 'DELETE_ROOM',
        roomId
    }
}

export const sendMessage = (room: string, author: string, text: string) => {
    return (dispatch: any )=> {
        const data: SendMessageData = {
            text,
            room,
            author
        }

        ChatAPI.sendMessage(data)
    }
}

export const joinRoom = (roomName: string, user: string) => {
    return (dispatch: Function) => {
        console.log(dispatch)
        ChatAPI.joinRoom(roomName, user, (res: any) => {
            console.log(res)
            if (res === 'Success') {
                dispatch(addRoom(roomName))
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