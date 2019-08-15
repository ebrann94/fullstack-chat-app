import { SendMessageData } from '../../../shared-types/types'
import { Room, Message } from './chat-reducer';
import ChatAPI from '../api/api'

export const addMessage = (roomId: string, message: Message) => {
    return {
        type: 'ADD_MESSAGE',
        payload: {
            message,
            roomId
        }
    }
}

export const addRoom = (room: Room) => {
    return {
        type: 'ADD_ROOM',
        room
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

export const subscribeToMessages = () => 
    (dispatch: any) => {
        ChatAPI.subscribeToMessages((message: Message) => {

            dispatch(addMessage('', message))
        })
    }