import React from 'react';

import useProgressiveImage from '../../../hooks/lazyLoad-hook';
import Stars from '../../UI Elements/Stars/Stars';

import './SmallRecipeCard.css'

const SmallRecipeCard = props =>{

    const recipe = props.data;

    const loadedRecipeImage = useProgressiveImage(process.env.REACT_APP_IMAGE_ENDPOINT + recipe.recipeImage.replace(/\\/g, '/') );

    return(
        <div className='SmallRecipeCard'>
            <div>
                <div className='SmallImage' style={{backgroundImage: `URL('${loadedRecipeImage}')`}} />
                { recipe.recipeTitle} <br /><Stars item={recipe.recipeRating} />
            </div>

        </div>
    )
}

export default SmallRecipeCard;