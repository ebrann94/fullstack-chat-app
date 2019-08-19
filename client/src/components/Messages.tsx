import React from 'react';
import { useAppContext } from '../store/configure-store'

const Messages = () => {
    const [ messages ] = useAppContext((state: any) => {
        return state.chat.find((room: string) => room === state.user.currentlyViewedRoom).messages
    })

    return (
        <div>
            {
                messages.map((message: any) => {
                    return (
                        <div>
                            message.content
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Messages