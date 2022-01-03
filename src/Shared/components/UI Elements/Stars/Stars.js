import React from 'react';

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