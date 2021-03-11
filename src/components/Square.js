import React from 'react';


const Square = ({ value, onClick, isWinningSquare }) => {
    return (  
        <button 
            className="square" 
            style={{fontWeight: isWinningSquare ? 'bold' : 'normal'}}
            type="button"
            onClick={onClick}>
            {value}
        </button>)

}

export default Square
