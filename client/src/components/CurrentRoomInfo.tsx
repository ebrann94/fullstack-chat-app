import React from 'react';
import styled from 'styled-components';
import { useAppState } from '../store/configure-store';

const RoomInfoWrapper = styled.div`
    height: 64px;
    background: rgba(89, 90, 110, 1);

    color: white;
    padding: 8px;
`

const RoomName = styled.p`
    font-size: 40px;
    font-weight: 600;
    margin: 0;

    line-height: 1;
    margin: 12px 0;
`

const CurrentRoomInfo = () => {
    const roomInfo = useAppState((state: any) => {
        return state.chat.find((room: any) => room.name === state.user.currentViewedRoom)
    })

    return (
        <RoomInfoWrapper>
            <RoomName>{roomInfo && roomInfo.name}</RoomName>
        </RoomInfoWrapper>
    )
}

export default CurrentRoomInfo;