import React from 'react'
import { useAppContext } from '../store/configure-store'
import { addMessage, sendMessage } from '../store/chat-actions'
import ChatAPI from '../api/api'
import { Message } from '../store/chat-reducer'

const SendMessage = () => {
    const [, dispatch ] = useAppContext()

    // const handleSendMessage = (text: any) => {
    //     ChatAPI.sendMessage(text, (message: Message) => {
    //         dispatch(addMessage('', message))
    //     })
    // }

    // const handleSendMessage2 = (text: any) => {
    //     dispatch(sendMessage('', '', text))
    // }

    return (
        <div>

        </div>
    )
}

export default SendMessage