import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useAppContext } from './store/configure-store';
import { addMessage, subscribeToRoomUpdates } from './store/chat-actions';
import * as UserActions from './store/user-actions'
import ChatAPI from './api/api'

import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import LoginModal from './components/LoginModal';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');

    body {
        margin: 0;
    }
`

const AppWrapper = styled.div`
    /* font-family: 'Open Sans', sans-serif; */
    font-family: 'Quicksand', sans-serif;
    -webkit-font-smoothin: antialiased;
    -moz-font-smoothing: grayscale;

    display: grid;
    grid-template-columns: 320px 1fr;
    grid-template-rows: 1fr;

    height: 100vh;
`

function App() {
    const [ state, dispatch ] = useAppContext() 
    console.log('State', state)

    useEffect(() => {
        // dispatch(subscribeToMessages())
        ChatAPI.subscribeToMessages((message: any) => {
            console.log('Message received', message)
            dispatch(addMessage(message))
        })

        dispatch(subscribeToRoomUpdates())
        dispatch(UserActions.getAvailableRooms())
    }, [])

    return ( 
        <AppWrapper className = "App" >
            <GlobalStyle />
            {state.user.username.length === 0 && <LoginModal />}
            <Sidebar />
            <Chat />
        </AppWrapper>
    );
}

export default App;