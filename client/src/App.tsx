import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppContext } from './store/configure-store';
import { addMessage, subscribeToMessages } from './store/chat-actions';
import ChatAPI from './api/api'
import { tsCallSignatureDeclaration } from '@babel/types';

function App() {
    const { dispatch } = useAppContext()
    const [text, setText] = useState('')

    useEffect(() => {
        // dispatch(subscribeToMessages())
        ChatAPI.subscribeToMessages((message: any) => {
            console.log('Message received', message)
        })

        
        ChatAPI.getRooms((rooms: string[]) => {
            console.log('Rooms Callback', rooms)
        })
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        ChatAPI.sendMessage({
            text, 
            author: 'Ethan',
            room: 'room1'
        })
        setText('')
    }

    const getRooms = () => {
        ChatAPI.getRooms((rooms: string[]) => {
            console.log('Rooms Callback', rooms)
        })
    }

    return ( 
        <div className = "App" >
            <form
                onSubmit={handleSubmit}
            >
                <input 
                    type="text" 
                    name="message" 
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button>
                    Submit
                </button>
            </form>
            <button
                onClick={getRooms}
            >Get Rooms</button>
        </div>
    );
}

export default App;