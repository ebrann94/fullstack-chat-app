
interface IUser {
    name: string,
    socketId: string,
}

interface IRoom {
    name: string,
    users: IUser[]
}

interface IRooms {
    [key: string]: IRoom
}

const rooms: IRooms = {}

function joinRoom(roomName: string, user: IUser) {
    if (rooms.hasOwnProperty(roomName)) {
        rooms[roomName].users.push(user)
    } else {
        rooms[roomName] = {
            name: roomName,
            users: [ user ]
        }
    }
}

function getRooms(): string[] {
    return Object.keys(rooms)
}

function leaveRoom(roomName: string, user: any) {
    rooms[roomName].users = rooms[roomName].users.filter((x: any)=> x.id !== user.id)

    if (rooms[roomName].users.length === 0) {
        delete rooms[roomName]
    }
}

module.exports = {
    joinRoom,
    getRooms,
    leaveRoom
}