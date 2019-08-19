import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppContext } from './store/configure-store';
import { addMessage, subscribeToMessages, joinRoom, sendMessage } from './store/chat-actions';
import * as UserActions from './store/user-actions'
import ChatAPI from './api/api'

function App() {
    const [ state, dispatch ] = useAppContext()
    const [message, setMessage] = useState('')
    const [room, setRoom] =  useState('')
    const [username, setUsername] = useState('')
    const userName:string = 'Ethan'

    console.log('State', state)

    useEffect(() => {
        // dispatch(subscribeToMessages())
        ChatAPI.subscribeToMessages((message: any) => {
            console.log('Message received', message)
            dispatch(addMessage('room1', message))
        })

        
        // ChatAPI.getRooms((rooms: string[]) => {
        //     console.log('Rooms Callback', rooms)
        // })
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        ChatAPI.sendMessage({
            text: message, 
            author: state.user.username,
            room: state.chat[0].name
        })

        // dispatch(sendMessage(message))

        setMessage('')
    }

    const handleRoomSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        dispatch(joinRoom(room, userName))
    }

    const handleUsernameSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        dispatch(UserActions.setUsername(username))
    }

    const getRooms = () => {
        ChatAPI.getRooms((rooms: string[]) => {
            console.log('Rooms Callback', rooms)
        })
    }

    return ( 
        <div className = "App" >
            <form
                onSubmit={handleUsernameSubmit}
            >
                <input 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button>Submit Username</button>
            </form>
            <form 
                onSubmit={handleRoomSubmit}
            >
                <input 
                    type="text"
                    name="room"
                    value={room}
                    onChange={e => setRoom(e.target.value)}
                />
                <button>Join Room</button>
            </form>
            <form
                onSubmit={handleSubmit}
            >
                <input 
                    type="text" 
                    name="message" 
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button>
                    Send Message
                </button>
            </form>
            <button
                onClick={getRooms}
            >
                Get Rooms
            </button>
        </div>
    );
}

export default App;