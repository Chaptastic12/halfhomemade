import React from 'react';

import { v4 as uuid } from 'uuid';

import './Stars.css';

const Stars = props =>{

    if(props.leaveReview && props.changeRating){
        return (
            <span className='stars'>
                <span className={`fa fa-star ${props.rating > 0.5 && 'checked'}`} onMouseOver={() => props.setRating(1)} onClick={() => props.setChangeRating(prevState => !prevState)}></span>
                <span className={`fa fa-star ${props.rating > 1.5 && 'checked'}`} onMouseOver={() => props.setRating(2)} onClick={() => props.setChangeRating(prevState => !prevState)}></span>
                <span className={`fa fa-star ${props.rating > 2.5 && 'checked'}`} onMouseOver={() => props.setRating(3)} onClick={() => props.setChangeRating(prevState => !prevState)}></span>
                <span className={`fa fa-star ${props.rating > 3.5 && 'checked'}`} onMouseOver={() => props.setRating(4)} onClick={() => props.setChangeRating(prevState => !prevState)}></span>
                <span className={`fa fa-star ${props.rating > 4.5 && 'checked'}`} onMouseOver={() => props.setRating(5)} onClick={() => props.setChangeRating(prevState => !prevState)}></span>
            </span>
        )
    } else if(props.leaveReview && !props.changeRating) {
        return (
            <span className='stars'>
                <span className={`fa fa-star ${props.rating > 0.5 && 'checked'}`} onClick={() => props.setChangeRating(prevState => !prevState)}></span>
                <span className={`fa fa-star ${props.rating > 1.5 && 'checked'}`} onClick={() => props.setChangeRating(prevState => !prevState)}></span>
                <span className={`fa fa-star ${props.rating > 2.5 && 'checked'}`} onClick={() => props.setChangeRating(prevState => !prevState)}></span>
                <span className={`fa fa-star ${props.rating > 3.5 && 'checked'}`} onClick={() => props.setChangeRating(prevState => !prevState)}></span>
                <span className={`fa fa-star ${props.rating > 4.5 && 'checked'}`} onClick={() => props.setChangeRating(prevState => !prevState)}></span>
            </span>
        )
    }

    //Allows us to show half stars if the rating is above 0.5 or not
    let stars = [];
    let fullStars = Math.floor(props.item);
    let halfOrNo = props.item - Math.floor(props.item);
    for(let i=0; i < 5; i++){
        if(i < fullStars){
            stars.push( <span key={uuid()} className='fa fa-star checked' /> )
        } else if( ( i === fullStars ) && (halfOrNo >= 0.5 ) ){
            stars.push( <span key={uuid()} className='fas fa-star-half-alt checked' /> );
        } else {
            stars.push( <span key={uuid()} className='fa fa-star' /> )
        }
    }

    return(
        <span className='stars'>
            { stars }
        </span>
    )
}

export default Stars;