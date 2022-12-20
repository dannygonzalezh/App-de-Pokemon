import React from 'react';
import '../sass/Button.scss'

const Button = ({icon, handleClick}) => {

    

    return (
        <div className='button-box'>
            <button 
            onClick={handleClick} 
            className='button'>{icon}</button>
            <div className='button-box-shadow'></div>
        </div>
    );
}

export { Button }