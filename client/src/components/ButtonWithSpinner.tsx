import React from 'react';

interface Props {
    isLoading: boolean,
    text: string
}

const ButtonWithSpinner = ({ isLoading, text }: Props) => {

    return (
        <button>{isLoading ? text : 'something else'}</button>
    )
}

export default ButtonWithSpinner;