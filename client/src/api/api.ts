import io from 'socket.io-client';

const ChatAPI = (function() {
    const socket: SocketIOClient.Socket = io();
    let dispatch = null;

    socket.on('message', (message) => {
        if (dispatch) {
            // dispatch(messageAction(message))
        }
    })

    return {
        subscribeToAll(_dispatch) {
            dispatch = _dispatch;
        },

        subscribeToMessages(callback: Function) {
            socket.on('message', message => {
                callback(message)
            })
        },

        sendMessage(text, callback) {
            socket.emit('message', {
                text
            }, callback);
        }
    }
})();

export default ChatAPI;