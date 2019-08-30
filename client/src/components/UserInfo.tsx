import React from 'react';
import { useAppState } from '../store/configure-store'

const UserInfo = () => {
    const username = useAppState((state: any) => state.user.username)


    return (
        <div>
            <p>{username}</p>
        </div>
    )
}

export default UserInfo;