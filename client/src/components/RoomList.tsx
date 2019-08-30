import React from 'react';
import { useAppContext } from '../store/configure-store';
import RoomListItem from './RoomListItem';

const RoomList = () => {
    const [ rooms ] = useAppContext((state: any) => {
        return state.chat
    })

    console.log(rooms);

    return (
        <div>
            {
                rooms.map((room: any) => {
                    return (
                        <RoomListItem 
                            key={room.name}
                            name={room.name}
                            unread={false}
                        />
                    )
                })
            }
        </div>
    )
}

export default RoomList;