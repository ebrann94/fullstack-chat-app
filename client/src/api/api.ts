import io from 'socket.io-client';
import { SendMessageData } from '../../../shared-types/types'

const ChatAPI = (function() {
    const socket: SocketIOClient.Socket = io();
    let dispatch: any = null;

    socket.on('message', (message: any) => {
        if (dispatch) {
            // dispatch(messageAction(message))
        }
    })

    return {
        subscribeToAll(_dispatch: Function) {
            dispatch = _dispatch;
        },

        subscribeToMessages(callback: Function) {
            socket.on('message', (message: any) => {
                callback(message)
            })
        },

        subscribeToRoomUpdates(room: string, callback: Function) {
            socket.on('newUser', (res: any) => {
                
            })
        },

        sendMessage(data: SendMessageData) {
            socket.emit('sendMessage', data);
        },

        getRooms(callback: Function) {
            socket.emit('getRooms', {}, callback)
        },

        joinRoom(roomName: string, user: string, callback: Function) {
            socket.emit('joinRoom', { room: roomName, user }, callback)
        },

        leaveRoom() {

        },
    }
})();

export default ChatAPI;