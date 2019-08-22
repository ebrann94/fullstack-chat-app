import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { useAppContext } from './store/configure-store';
import { addMessage, subscribeToMessages, joinRoom, sendMessage, subscribeToRoomUpdates } from './store/chat-actions';
import * as UserActions from './store/user-actions'
import ChatAPI from './api/api'

import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import LoginModal from './components/LoginModal';

const AppWrapper = styled.div`
    display: grid;
    grid-template-columns: 256px 1fr;
    grid-template-rows: 1fr;
`

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

        dispatch(subscribeToRoomUpdates())
        dispatch(UserActions.getAvailableRooms())
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        dispatch(sendMessage(message))
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
        <AppWrapper className = "App" >
            {state.user.username.length === 0 && <LoginModal />}
            <Sidebar />
            <Chat />
        </AppWrapper>
    );
}

export default App;