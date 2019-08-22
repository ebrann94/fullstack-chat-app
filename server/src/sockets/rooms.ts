
interface IUser {
    username: string,
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
    console.log(rooms[roomName].users)
    return rooms[roomName]
}

function getRooms(): string[] {
    return Object.keys(rooms)
}

function leaveRoom(roomName: string, id: string)  {
    const users: IUser[] = rooms[roomName].users
    rooms[roomName].users = users.filter((x: IUser)=> x.socketId !== id)

    if (rooms[roomName].users.length === 0) {
        delete rooms[roomName]
    }
}

function removeUserById(idToDelete: string) {
    const keys = Object.keys(rooms);

    keys.forEach((key: string) => {
        const room = rooms[key];
        const users = room.users;

        rooms[key] = {
            ...room,
            users: users.filter((user: IUser) => user.socketId !== idToDelete)
        }
    })
}

function doesUserExist(username: string) {
    const keys: string[] = Object.keys(rooms);

    for (let i = 0, len = keys.length; i < len; i++) {
        const key: string = keys[i];
        const users: IUser[] = rooms[key].users;

        const index: number = users.findIndex((user: IUser) => user.username === username);

        if (index > -1) {
            return true;
        }
    }

    return false;
}

module.exports = {
    joinRoom,
    getRooms,
    leaveRoom,
    removeUserById,
    doesUserExist
}