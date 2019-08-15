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

        sendMessage(data: SendMessageData) {
            // console.log('Message sent')
            socket.emit('sendMessage', data);
        },

        getRooms(callback: Function) {
            console.log('getRooms called')
            // socket.emit('getRooms', undefined, callback)
            socket.emit('getRooms', {}, callback)
        },

        joinRoom(roomName: string, user: string, callback: Function) {
            socket.emit('joinRoom', { room: roomName, user }, callback)
        }
    }
})();

export default ChatAPI;