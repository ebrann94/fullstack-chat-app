import React from 'react';
import { useAppContext } from '../store/configure-store'

const Messages = () => {
    const [ messages ] = useAppContext((state: any) => {
        const found = state.chat.find((room: string) => room === state.user.currentlyViewedRoom)

        if (found) {
            return found
        }

        return []
    })

    return (
        <div>
            {
                messages.map((message: any) => {
                    return (
                        <div>
                            {message.text}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Messages