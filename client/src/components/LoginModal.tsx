import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../store/configure-store';
import { checkUserName, joinFirstRoom } from '../store/user-actions';
import { Input, Button } from './Styled';

const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    background: rgba(0, 0, 0, 0.7);

    display: flex;
    justify-content: center;
    align-items: flex-start;
`

const FormCard = styled.div`
    background: white;
    margin: 96px 0 0 0;
    padding: 16px;
    border-radius: 3px;

    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Select = styled.select`
    margin: 0 0 16px 0;
    padding: 8px;

    -webkit-appearance: none;

    font-family: 'Quicksand', sans-serif;
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
                <Form
                    onSubmit={handleSubmit}
                >
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={fields.username}
                        onChange={handleChange}
                    />
                    {/* <Select 
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
                    </Select> */}
                    <Input 
                        type="text"
                        name="room"
                        placeholder="Create a new room"
                        value={fields.room}
                        onChange={handleChange}
                    />
                    <Button>Join</Button>
                </Form>
            </FormCard>
        </ModalWrapper>
    )
}

export default LoginModal;