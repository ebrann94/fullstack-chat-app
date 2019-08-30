import React, { useState } from 'react';
import { useAppContext } from '../store/configure-store';
import { joinRoom } from '../store/chat-actions'
import { Input, Button } from './Styled';

const JoinRoomForm = () => {
    const [ availableRooms, dispatch ] = useAppContext((state: any) => {
        return state.user.availableRooms
    })

    const [fields, setFields] = useState({
        roomName_text: '',
        roomName_select: availableRooms[0]
    })

    const handleChange = (e: any) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setFields({
            ...fields,
            [name]: value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const { roomName_text, roomName_select } = fields

        const roomName = roomName_text.length > 0 ? roomName_text : roomName_select
        dispatch(joinRoom(roomName))

        if (roomName_text.length > 0) {
            dispatch(joinRoom(roomName_text))
        } else {
            dispatch(joinRoom(roomName_select))
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <Input 
                    type="text" 
                    name="roomName_text"
                    placeholder="Create a new room"
                    value={fields.roomName_text} 
                    onChange={handleChange}
                />
                <select 
                    name="roomName_select"
                    value={fields.roomName_select}
                    onChange={handleChange}
                    disabled={fields.roomName_text.length > 0}
                >
                    {
                        availableRooms.map((room: any) => {
                            return <option value={room}>{room}</option>
                        })
                    }
                </select>
                <Button>Join</Button>
            </form>
        </div>
    )
}

export default JoinRoomForm;