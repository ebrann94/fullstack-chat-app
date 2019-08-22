import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../store/configure-store';

const Wrapper = styled.section`

`

const Sidebar = () => {
    const [ rooms ] = useAppContext((state: any) => state.rooms)

    return (
        <Wrapper className="sidebar">
            {/* 
            <UserInfo />
            <RoomList /> -- List of rooms already joined
            <JoinRoom /> -- Form to join another room
            */}
        </Wrapper>
    )
}

export default Sidebar;