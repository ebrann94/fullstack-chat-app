import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../store/configure-store'
import SendMessage from './SendMessage'
import Messages from './Messages'

const ChatWrapper = styled.section`

`

const Chat = () => {

    return (
        <ChatWrapper className="chat">
            <Messages />
            <SendMessage />
        </ChatWrapper>
    )
}

export default Chat