import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../store/configure-store';
import Message from './Message';

const MessagesWrapper = styled.div`
    flex-grow: 1;
`

const Messages = () => {
    const [ messages ] = useAppContext((state: any) => {
        const found = state.chat.find((room: any) => room.name === state.user.currentViewedRoom)

        if (found) {
            return found.messages
        }

        return []
    })

    return (
        <MessagesWrapper>
            {
                messages.map((message: any) => {
                    return (
                        <Message
                            text={message.text}
                            author={message.author}
                            createdAt={message.createdAt}
                        />
                    )
                })
            }
        </MessagesWrapper>
    )
}

export default Messages