import React from 'react';

import Stars from '../../UI Elements/Stars/Stars';

import './SmallRecipeCard.css'

const SmallRecipeCard = props =>{

    return(
        <div className='SmallRecipeCard'>
            <div>
                <div className='SmallImage' style={{backgroundImage: `URL('${process.env.REACT_APP_IMAGE_ENDPOINT + props.data.recipeImage }')`}} />
                { props.data.recipeTitle} <br /><Stars item={props.data.recipeRating} />
            </div>

        </div>
    )
}

export default SmallRecipeCard;