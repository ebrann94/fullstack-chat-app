import React from 'react';
import { useAppContext } from '../store/configure-store';
import { setCurrentViewedRoom } from '../store/user-actions';


interface Props {
    name: string,
    unread: boolean
}

const RoomListItem = ({ name, unread }: Props) => {
    const [, dispatch] = useAppContext();

    const handleChangeRoom = () => {
        dispatch(setCurrentViewedRoom(name))
    }

    return (
        <div
            onClick={handleChangeRoom}
        >
            <p>{name}</p>
        </div>
    )
}

export default RoomListItem;