import React, { useState } from 'react'
import styled from 'styled-components';
import { useAppContext, useDispatch } from '../store/configure-store'
import { sendMessage } from '../store/chat-actions'
import { Button, Input } from './Styled';

const Wrapper = styled.div`
    width: 100%;
`

const Form = styled.form`
    display: flex;
    padding: 16px;
`

const MessageInput = styled(Input)`
    flex-grow: 1;

    padding: 16px;
    margin: 0 16px 0 0;
`

const SendMessage = () => {
    const dispatch = useDispatch()
    const [messageText, setMessageText] = useState('')

    const handleSubmit= (e: React.FormEvent) => {
        e.preventDefault()

        dispatch(sendMessage(messageText))
        setMessageText('')
    }

    return (
        <Wrapper>
            <Form
                onSubmit={handleSubmit}
            >
                <MessageInput 
                    type="text"
                    placeholder="Type a message"
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                />
                <Button
                    width="80px"
                >
                    Send
                </Button>
            </Form>
        </Wrapper>
    )
}

export default SendMessage