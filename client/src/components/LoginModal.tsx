import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../store/configure-store';
import { checkUserName, joinFirstRoom } from '../store/user-actions';

const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    background: rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: center;
    align-items: flex-start;
`

const FormCard = styled.div`
    background: white;
    margin: 96px 0 0 0;
    padding: 16px;
    border-radius: 3px;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    width: 200px;
    margin: 0 0 16px 0;
    padding: 8px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.2);
`

const LoginModal = () => {
    const [ availableRooms, dispatch ] = useAppContext((state: any) => state.user.availableRooms)
    const [fields, setFields] = useState({
        username: '',
        room: '',
        room_select: ''
    })

    useEffect(() => {
        setFields({
            ...fields,
            room_select: availableRooms[0]
        })
    }, [availableRooms])

    const handleChange = (e: any) => {
        e.preventDefault();

        const target: any = e.target
        const name: string = target.name;
        const value: string = target.value

        setFields({
            ...fields,
            [name]: value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { username, room } = fields

        if (username.length > 0 && room.length > 0) {
            dispatch(joinFirstRoom(username, room))
        }
    }

    // console.log(fields)

    return (
        <ModalWrapper>
            <FormCard>
                <p>Join a Chat!</p>
                <StyledForm
                    onSubmit={handleSubmit}
                >
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={fields.username}
                        onChange={handleChange}
                    />
                    <select 
                        name="room_select" 
                        value={fields.room_select}
                        onChange={handleChange}
                    >
                        {
                            availableRooms.map((room: string) => (
                                <option 
                                    value={room} 
                                    key={room}
                                >
                                    {room}
                                </option>
                            ))
                        }
                    </select>
                    <Input 
                        type="text"
                        name="room"
                        placeholder="Room"
                        value={fields.room}
                        onChange={handleChange}
                    />
                    <button>Join</button>
                </StyledForm>
            </FormCard>
        </ModalWrapper>
    )
}

export default LoginModal;