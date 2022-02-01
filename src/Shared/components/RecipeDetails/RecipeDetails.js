import React from 'react';

import { v4 as uuid } from 'uuid';

import FormattedSteps from './FormattedSteps/FormattedSteps';

import './RecipeDetails.css';

const RecipeDetails = props =>{

    let stepsArray = props.details.split(/\r|\n/);

    let formattedSteps = stepsArray.map(step =>{
        return <FormattedSteps key={uuid()} instructions={step} />
    });

    return (
        <div className='RecipeDetails'>
            <h1 className='Header'>
                <hr className='hr' style={{float: 'left' }}/>Instructions<hr className='hr' style={{float: 'right' }}/>
            </h1>
            <div className='Steps '> {formattedSteps} </div>
        </div>
    )
}

export default RecipeDetails;