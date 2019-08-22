import React, { useState } from 'react'
import { useAppContext } from '../store/configure-store'
import { sendMessage } from '../store/chat-actions'

const SendMessage = () => {
    const [ , dispatch ] = useAppContext()
    const [messageText, setMessageText] = useState('')

    const handleSubmit= (e: React.FormEvent) => {
        e.preventDefault()

        dispatch(sendMessage(messageText))
        setMessageText('')
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <input 
                    type="text"
                    placeholder="Send Message"
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                />
                <button>Send</button>
            </form>
        </div>
    )
}

export default SendMessage