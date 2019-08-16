export interface Message {
    id: string,
    author: string,
    content: string
}

export interface Room {
    id: string,
    name: string,
    messages: Message[]
}

export const chatReducer = (state: Room[], action: any): Room[] => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            const message = action.payload.message
            return state.map(room => {
                if (room.name === action.payload.roomName) {
                    return {
                        ...room,
                        messages: [...room.messages, message]
                    }
                }
                return room
            })
        case 'ADD_ROOM':
            return [...state, action.room]
        case 'DELETE_ROOM':
            return state.filter(room => room.id !== action.id)
        default:
            return state
    }
}
