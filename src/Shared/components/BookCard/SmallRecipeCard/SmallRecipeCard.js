import React from 'react';

import Stars from '../../UI Elements/Stars/Stars';

import './SmallRecipeCard.css'

const SmallRecipeCard = props =>{

    return(
        <div className='SmallRecipeCard'>
                <div className='SmallImage' style={{backgroundImage: `URL('${process.env.REACT_APP_IMAGE_ENDPOINT + props.data.recipeImage }')`}} />
                <div className='Text'>
                    { props.data.recipeTitle} <br /> {props.data.recipeRating !== 0 ? <Stars item={props.data.recipeRating} /> : <span>No reviews</span> }
                </div>

        </div>
    )
}

export default SmallRecipeCard;