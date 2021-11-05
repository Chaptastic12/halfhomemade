import React from 'react';

import './Stars.css';

const Stars = props =>{

    return(
        <span className='stars'>
            <span className="fa fa-star checked"></span>
            <span className={`fa fa-star ${props.item > 1.5 && 'checked'}`}></span>
            <span className={`fa fa-star ${props.item > 2.5 && 'checked'}`}></span>
            <span className={`fa fa-star ${props.item > 3.5 && 'checked'}`}></span>
            <span className={`fa fa-star ${props.item > 4.5 && 'checked'}`}></span>
        </span>
    )
}

export default Stars;