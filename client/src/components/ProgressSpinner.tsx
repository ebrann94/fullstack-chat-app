import React from 'react';
import styled, { keyframes } from 'styled-components';

const Rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    from {
        transform: rotate(360deg);
    }
`

const Div = styled.div`
    animation: ${Rotate} 0.5s infinite;
`

const ProgressSpinner = () => {

    return (
        <Div>
            <svg>
                <circle></circle>
            </svg>
        </Div>
    )
}

export default ProgressSpinner;