
export interface Message {
    id: string,
    author: string,
    content: string
}

export interface Room {
    name: string,
    messages: Message[],
    users: string[]
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
            console.log("Add room action", action.room)
            return [...state, action.room]
        case 'DELETE_ROOM':
            return state.filter(room => room.name !== action.roomName)
        case 'ADD_USER':
            return state.map(room => {
                if (room.name === action.payload.room) {
                    return {
                        ...room,
                        users: [...room.users, action.payload.user]
                    }
                } 

                return room
            })
        case 'SET_USERNAME_AND_ADD_ROOM':
            return [...state, action.room]
        default:
            return state
    }
}
