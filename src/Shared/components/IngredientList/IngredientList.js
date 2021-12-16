import React from 'react';

import './IngredientList.css';

const IngredientList = props =>{

    //IN THE FUTURE WE WANT TO EXPAND TO HOLD THIS LEVEL OF DETAIL
    //
    // const ingredientList = props.ingredients.map(ingredient => {
    //     let key = ingredient.quantity+ingredient.measurement+ingredient.ingredient;
    //     return (<li key={key}>
    //                 {ingredient.quantity} {ingredient.measurement && ingredient.measurement} {ingredient.ingredient} {ingredient.special && ingredient.special}
    //             </li>)
    // });           

    const ingredientList = props.ingredients.map(ingredient => {
        let key = ingredient.id+ingredient.value;
        return (<li key={key}>
                    {ingredient.value}
                </li>)
    })

    return(
        <div className='IngredientList'>
            <h1>Ingredients</h1>
            <ol>{ingredientList}</ol>
        </div>
    )
}

export default IngredientList;