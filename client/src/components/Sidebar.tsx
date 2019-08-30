import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../store/configure-store';
import RoomList from './RoomList';
import JoinRoomForm from './JoinRoomForm';
import UserInfo from './UserInfo';

const Wrapper = styled.section`
    background: rgba(50, 52, 64, 1);

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    color: white;
`

const Sidebar = () => {

    return (
        <Wrapper className="sidebar">
            <UserInfo />
            <RoomList />
            <JoinRoomForm />
        </Wrapper>
    )
}

export default Sidebar;