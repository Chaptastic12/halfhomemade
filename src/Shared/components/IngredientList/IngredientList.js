import React from 'react';

import './IngredientList.css';

const IngredientList = props =>{

    const ingredientList = props.ingredients.map(ingredient => {
        return (<li>{ingredient.quantity} {ingredient.measurement && ingredient.measurement} {ingredient.ingredient} {ingredient.special && ingredient.special}</li>)
    });           

    return(
        <div className='IngredientList'>
            <h1>Ingredients</h1>
            <ol>{ingredientList}</ol>
        </div>
    )
}

export default IngredientList;