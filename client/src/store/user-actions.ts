import ChatAPI from '../api/api';

export const setUsername = (username: string) => ({
    type: 'SET_USERNAME',
    username
})

export const setCurrentViewedRoom = (roomName: string) => ({
    type: 'SET_CURRENT_VIEWED_ROOM',
    room: roomName
})

export const setAvailableRooms = (rooms: string[]) => ({
    type: 'SET_AVAILABLE_ROOMS',
    payload: rooms
})

export const userNameError = () => ({
    type: 'USERNAME_ERROR'
})

export const setUsernameAddRoom = (username: string, room: any) => ({
    type: 'SET_USERNAME_AND_ADD_ROOM',
    username,
    room
})

export const getAvailableRooms = () => 
    (dispatch: any) => {
        ChatAPI.getRooms((rooms: string[]) => {
            dispatch(setAvailableRooms(rooms));
        })
    }

export const checkUserName = (username: string) => {
    return (dispatch: any) => {
        ChatAPI.checkUsername(username, (error: any) => {
            if (error) {
                return dispatch(userNameError)
            }
            dispatch(setUsername(username))
        })
    }
}

export const joinFirstRoom = (username: string, roomName: string) => {
    return (dispatch: any) => {
        ChatAPI.firstRoomJoin(username, roomName, ({ error, room }: any) => {
            console.log(error, room)
            if (error) {
                return dispatch(userNameError())
            }

            dispatch(setUsernameAddRoom(username, room))
        })
    }
}