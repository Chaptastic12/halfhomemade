import React from 'react';

import { v4 as uuid } from 'uuid';

import FormattedSteps from './FormattedSteps/FormattedSteps';

import './RecipeDetails.css';

const RecipeDetails = props =>{

    let stepsArray = props.details.split(/\r|\n/);

    let formattedSteps = stepsArray.map(step =>{
        return <FormattedSteps key={uuid()} instructions={step} />
    })

    return <div className='RecipeDetails'>
        <h1 className='RecipeDetails-header text-center'><hr className='hr' style={{float: 'left' }}/>Instructions<hr className='hr' style={{float: 'right' }}/></h1>
        <div className='RecipeDetails-Steps '>
            {formattedSteps}
        </div>
    </div>
    
    /*OLD CODE - No longer comes in as an array, preserving for now
    let steps = props.details;

    let formattedSteps = steps.map(step =>{
        return <FormattedSteps key={uuid()} step={step.id} instructions={step.value} />
    })

    return <div className='RecipeDetails'>
        <h1 className='RecipeDetails-header text-center'><hr className='hr' style={{float: 'left' }}/>Instructions<hr className='hr' style={{float: 'right' }}/></h1>
        <div className='RecipeDetails-Steps '>
            {formattedSteps}
        </div>
    </div>
    */
}

export default RecipeDetails;