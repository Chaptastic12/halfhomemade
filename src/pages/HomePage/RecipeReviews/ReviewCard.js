import React from 'react';

import { NavLink } from 'react-router-dom';

import Stars from '../../../Shared/components/UI Elements/Stars/Stars';

import './ReviewCard.css';

const ReviewCard = props =>{

    const { review, recipe } = props.data;

    return (
        <div className='ReviewCard cust-shadow-sm'>
            <NavLink to={`/recipes/view/${recipe.id}`}>
                <i className="far fa-user"/> <br/>
                { recipe.title } <br/>
                <Stars item={review.rating} /> <br />
                <div style={{width: '250px'}}>{ review.text }</div>
            </NavLink>
        </div>
    )
}

export default ReviewCard;