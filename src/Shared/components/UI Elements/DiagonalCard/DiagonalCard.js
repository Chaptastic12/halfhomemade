import React from 'react';

import './DiagonalCard.css';

const DiagonalCard = (props) =>{

    let card;
    if(props.left){
        card =  <div className="contact-positionLeft">
                    <div className="left-contact" style={{backgroundImage: 'URL('+props.backgroundImage+')'}} />
                </div>
    }else{
        card =  <div className="contact-positionRight">
                    <div className="right-contact" style={{backgroundImage: 'URL('+props.backgroundImage+')'}}/>
                </div>
    }

    return(
        <>{card}</>
    )
}

export default DiagonalCard;