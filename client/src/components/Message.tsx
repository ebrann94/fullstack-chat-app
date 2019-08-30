import React from 'react';
import styled from 'styled-components';

const MessageWrapper = styled.div`

`

interface MessageProps {
    text: string,
    author: string,
    createdAt: string
}

const Message = ({ text, author, createdAt }: MessageProps) => {

    return (
        <MessageWrapper>
            <p>{text}</p>
        </MessageWrapper>
    )
}

export default Message;