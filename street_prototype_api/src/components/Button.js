import React from 'react';
import '../styles/button.css';
import { Link } from 'react-router-dom';

export const Button = ({
    children, 
    type,
    onClick, 
    buttonStyle,
    buttonSize, 
}) => {
    const checkButtonStyle = buttonStyle;
    const checkButtonSize = buttonSize;

    if (checkButtonStyle == 'btn') {
        return (
            <Link to='/Data' className='btn-web'>
                <Button
                    className={'btn ${checkButtonStyle} ${checkButtonSize}'}
                    onClick={onClick}
                    type={type}
                    >
                        {children}
                    </Button>
            </Link>
        )
    }
     else if (checkButtonStyle === 'creatAccount') {
        return (
            <Button
                className={'btn ${checkButtonStyle} ${checkButtonSize}'}
                onClick={onClick}
                type={type}
                >
                    {children}
            </Button>
        )
    }
}