import styled from 'styled-components';

interface InputProps {
    readonly width?: string,
    readonly padding?: string
}

export const Input = styled.input<InputProps>`
    width: ${props => props.width};

    margin: 0 0 16px 0;
    padding: ${(props: any) => props.padding || '8px'};

    border-radius: 3px;
    border: none;

    font-family: 'Quicksand', sans-serif;
    font-size: 16px;
`

interface ButtonTypes {
    readonly width?: string
} 

export const Button = styled.button<ButtonTypes>`
    width: ${props => props.width};
    display: inline-block;

    font-family: 'Quicksand', sans-serif;
    font-size: 16px;

    background: white;
    
    border: none;
    border-radius: 3px;
    cursor: pointer;
`