import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../store/configure-store'
import CurrentRoomInfo from './CurrentRoomInfo';
import SendMessage from './SendMessage'
import Messages from './Messages'

const ChatWrapper = styled.section`
    background: rgba(196, 196, 196, 1);

    display: flex;
    flex-direction: column;
`

const Chat = () => {

    return (
        <ChatWrapper className="chat">
            <CurrentRoomInfo />
            <Messages />
            <SendMessage />
        </ChatWrapper>
    )
}

export default Chat